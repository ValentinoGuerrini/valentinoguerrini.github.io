const root = document.documentElement;
const journey = document.querySelector<HTMLElement>('.journey')!;
const stage = document.querySelector<HTMLElement>('.journey-stage')!;
const landscape = document.querySelector<HTMLElement>('.landscape')!;
const world = document.querySelector<HTMLElement>('.world')!;
const traveler = document.querySelector<HTMLElement>('.traveler')!;
const progress = document.querySelector<HTMLElement>('.journey-progress span')!;
const chapters = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-go]')];
const motionToggle = document.querySelector<HTMLButtonElement>('#motion-toggle')!;
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = preference.matches;
let queued = false;
let active = -1;
let lastPosition = window.scrollY;
const positions = [0, .17, .39, .63, .87];
function setMode(staticMode:boolean) {
 reduced = staticMode;
 root.classList.toggle('has-motion', !reduced);
 root.classList.toggle('static-journey', reduced);
 motionToggle.setAttribute('aria-pressed', String(reduced));
 motionToggle.textContent = reduced ? 'Motion off' : 'Motion on';
 chapters.forEach(c => { c.inert = false; c.removeAttribute('aria-hidden'); });
 if(reduced){ world.style.transform='';traveler.style.transform=''; }
 active = -1;
 render();
}
function render() {
 queued = false;
 if(reduced) return;
 const span = Math.max(1, journey.offsetHeight - stage.offsetHeight);
 const p = Math.max(0,Math.min(1,(window.scrollY-journey.offsetTop)/span));
 const chapterIndex = p < .10 ? 0 : p < .29 ? 1 : p < .51 ? 2 : p < .75 ? 3 : 4;
 if(chapterIndex !== active) {
  active=chapterIndex;
  chapters.forEach((c,i)=>{c.classList.toggle('is-active',i===active);c.inert=i!==active;c.setAttribute('aria-hidden',String(i!==active));});
  links.forEach(link=>{if(Number(link.dataset.go)===active)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});
 }
 // A wide painting is translated under the traveller. No canvas or animation dependency.
 const worldWidth = Math.max(landscape.clientWidth * 1.15, landscape.clientHeight * 3);
 world.style.width = `${worldWidth}px`;
 const img=world.querySelector('img')!;
 img.style.width = `${worldWidth}px`;
 img.style.height = '100%';
 img.style.objectFit = 'cover';
 const travel = Math.max(0, worldWidth-landscape.clientWidth);
 world.style.transform = `translate3d(${-travel*p}px,0,0)`;
 const x = landscape.clientWidth*(.19+.59*p);
 const movement = window.scrollY-lastPosition;
 traveler.style.left = `${x}px`;
 traveler.style.setProperty('--stride',`${Math.sin(window.scrollY/31)*19}deg`);
 traveler.style.transform=`translateX(-50%) translateY(${-Math.abs(Math.sin(window.scrollY/31))*2}px)`;
 if(Math.abs(movement)>1) traveler.querySelector<SVGElement>('.traveler-art')!.style.scale=movement<0?'-1 1':'1 1';
 lastPosition=window.scrollY;
 document.querySelector<HTMLElement>('.traveler-label')!.style.opacity = p < .08 ? '1':'0';
 progress.style.transform=`scaleX(${p})`;
}
function requestRender(){if(!queued){queued=true;requestAnimationFrame(render);}}
function goToChapter(index:number, smooth=true){
 if(reduced){chapters[index].scrollIntoView({behavior:'auto',block:'start'});return;}
 const range=journey.offsetHeight-stage.offsetHeight;
 window.scrollTo({top:journey.offsetTop+range*positions[index],behavior:smooth?'smooth':'auto'});
}
links.forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const index=Number(link.dataset.go);goToChapter(index);history.replaceState(null,'',`#${chapters[index].id}`);}));
motionToggle.addEventListener('click',()=>{const index=Math.max(0,active);setMode(!reduced);goToChapter(index,false);});
preference.addEventListener('change',event=>setMode(event.matches));
window.addEventListener('scroll',requestRender,{passive:true});
window.addEventListener('resize',requestRender);
world.querySelector('img')!.addEventListener('load',requestRender);
document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelectorAll<HTMLElement>('.project').forEach(project=>{project.hidden=button.dataset.filter!=='all'&&project.dataset.category!==button.dataset.filter;});
}));
setMode(reduced);
const hashIndex=chapters.findIndex(c=>`#${c.id}`===location.hash);
if(hashIndex>=0)requestAnimationFrame(()=>goToChapter(hashIndex,false));
