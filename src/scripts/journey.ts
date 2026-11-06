import { story } from '../chapters';
import { createTimeline } from './timeline.mjs';

const root=document.documentElement;
const main=document.querySelector<HTMLElement>('#journey')!;
const experience=document.querySelector<HTMLElement>('.experience')!;
const chapters=[...document.querySelectorAll<HTMLElement>('[data-chapter]')];
const cards=chapters.map(ch=>[...ch.querySelectorAll<HTMLElement>('[data-card]')]);
const sceneHost=document.querySelector<HTMLElement>('#scene')!;
const route=document.querySelector<SVGPathElement>('#route')!;
const travelled=document.querySelector<SVGPathElement>('#route-travelled')!;
const fallback=document.querySelector<HTMLElement>('#fallback-traveller')!;
const mapLinks=[...document.querySelectorAll<HTMLElement>('[data-map-stop]')];
const nodes=[...document.querySelectorAll<SVGGElement>('[data-node]')];
const heading=document.querySelector<HTMLElement>('.deck-heading')!;
const stopName=document.querySelector<HTMLElement>('#stop-name')!;
const stopDate=document.querySelector<HTMLElement>('#stop-date')!;
const counter=document.querySelector<HTMLElement>('#card-counter')!;
const guide=document.querySelector<HTMLElement>('#scroll-guide')!;
const status=document.querySelector<HTMLElement>('#route-status')!;
const prev=document.querySelector<HTMLButtonElement>('#previous-card')!;
const next=document.querySelector<HTMLButtonElement>('#next-card')!;
const progress=document.querySelector<HTMLElement>('.progress span')!;
const indexDialog=document.querySelector<HTMLDialogElement>('#index')!;
const details=document.querySelector<HTMLDialogElement>('#details')!;
const motion=document.querySelector<HTMLButtonElement>('#motion-toggle')!;
const media=matchMedia('(prefers-reduced-motion: reduce)');
const timeline=createTimeline(story.map(s=>s.cards.length));
const allCards=timeline.anchors.flatMap((times,stop)=>times.map((time,card)=>({time,stop,card})));
const pathLength=route.getTotalLength();
const routeSamples=Array.from({length:401},(_,i)=>route.getPointAtLength(pathLength*i/400));
const routeStops=[0,...[{x:130,y:112},{x:282,y:257},{x:135,y:421},{x:270,y:589}].map(target=>{
 let best=0,distance=Infinity;
 for(let i=0;i<=2000;i++){const p=route.getPointAtLength(pathLength*i/2000);const d=(p.x-target.x)**2+(p.y-target.y)**2;if(d<distance){distance=d;best=i/2000;}}
 return best;
}),1];
const ease=(x:number)=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
const detailTitles=['Valentino Guerrini','Piacenza','Research in Milan','Supercomputing in Chicago','Zürich','Contact','Other explorations'];
let reading=media.matches,current=0,target=0,frame=0,lastTime=0;
let activeStop=0,activeCard=0,lastKey='',lastRoute=0;
let sceneDirty=true,lastSceneStop=-1,wasWalking=false;
let scene:ReturnType<typeof import('./scene')['createScene']>|null=null,sceneRequest=0;
let returnFocus:HTMLElement|null=null,indexReturnFocus:HTMLElement|null=null;
root.style.setProperty('--journey-height',`${(1+timeline.duration*.78)*100}svh`);

function closeDialog(dialog:HTMLDialogElement){if(dialog.open)dialog.close();if(!indexDialog.open&&!details.open)document.body.classList.remove('dialog-open');}
function openIndex(){indexReturnFocus=document.activeElement as HTMLElement;closeDialog(details);indexDialog.showModal();document.body.classList.add('dialog-open');}
function openDetails(id:number){
 returnFocus=indexDialog.open?indexReturnFocus:document.activeElement as HTMLElement;closeDialog(indexDialog);
 document.querySelectorAll<HTMLElement>('[data-detail-panel]').forEach(panel=>panel.hidden=Number(panel.dataset.detailPanel)!==id);
 document.querySelector('#details-title')!.textContent=detailTitles[id];document.querySelector('#details-label')!.textContent=id===6?'Selected work':story[id]?.label||'About';
 details.showModal();details.scrollTop=0;document.body.classList.add('dialog-open');
}
function queue(){if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
function measure(){if(reading)return;target=Math.max(0,Math.min(timeline.duration,(scrollY-main.offsetTop)/Math.max(1,main.offsetHeight-experience.offsetHeight)*timeline.duration));queue();}
function updateNavigation(stop:number,card:number){
 const key=`${stop}:${card}`;if(key===lastKey)return;lastKey=key;activeStop=stop;activeCard=card;
 stopName.textContent=story[stop].label;stopDate.textContent=story[stop].date;
 counter.textContent=`${String(card+1).padStart(2,'0')} / ${String(cards[stop].length).padStart(2,'0')}`;
 document.querySelectorAll<HTMLElement>('[data-dots]').forEach(el=>el.hidden=Number(el.dataset.dots)!==stop);
 document.querySelectorAll<HTMLElement>('[data-card-go]').forEach(el=>{if(el.dataset.cardGo===key)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
 chapters.forEach((ch,i)=>{ch.classList.toggle('is-active',i===stop);ch.inert=i!==stop;ch.setAttribute('aria-hidden',String(i!==stop));});
 cards.forEach((list,i)=>list.forEach((el,j)=>{const visible=i===stop&&j===card;el.inert=!visible;el.setAttribute('aria-hidden',String(!visible));el.classList.toggle('is-front',visible);}));
 mapLinks.forEach((el,i)=>{el.classList.toggle('is-active',i+1===stop);if(i+1===stop)el.setAttribute('aria-current','location');else el.removeAttribute('aria-current');});
 nodes.forEach((el,i)=>{el.classList.toggle('is-active',i+1===stop);el.classList.toggle('is-visited',i+1<stop);});
 const position=allCards.findIndex(x=>x.stop===stop&&x.card===card);prev.disabled=position===0;next.disabled=position===allCards.length-1;
 prev.setAttribute('aria-label',card>0?'Previous card':`Back to ${story[Math.max(0,stop-1)].label}`);
 next.setAttribute('aria-label',card<cards[stop].length-1?'Next card':stop===5?'Journey complete':`Continue to ${story[stop+1].label}`);
}
function drawDeck(stop:number,card:number,flip:number,opacity:number){
 chapters[stop].style.opacity=String(opacity);heading.style.opacity=String(opacity);
 cards[stop].forEach((el,j)=>{
  const depth=j-card;
  if(depth<0||depth>3){el.style.visibility='hidden';return;}
  el.style.visibility='visible';el.style.zIndex=String(30-depth);
  const outgoing=depth===0&&flip>0;
  const level=Math.max(0,depth-flip);
  const y=outgoing?-58*flip:level*11;
  const scale=outgoing?1+.015*flip:1-level*.027;
  el.style.transform=`translateY(${y}px) scale(${scale})${outgoing?` rotate(${-1.5*flip}deg)`:''}`;
  el.style.opacity=String(outgoing?1-ease((flip-.08)/.8):depth===3?flip:1);
  el.classList.toggle('is-back',depth>0&&!(depth===1&&flip>.12));
 });
}
function tick(time:number){
 frame=0;if(reading)return;
 const dt=Math.min(64,lastTime?time-lastTime:16);lastTime=time;const difference=target-current;
 current+=difference*(1-Math.exp(-dt/75));if(Math.abs(target-current)<.0003)current=target;
 const s=timeline.sample(current);
 let stop=s.stop,card=s.card,flip=0,opacity=1,path=routeStops[stop];
 if(s.kind==='flip'){flip=ease(s.progress);}
 if(s.kind==='travel'){
  const p=ease(s.progress);path=routeStops[stop]+(routeStops[stop+1]-routeStops[stop])*p;
  if(p<.5){opacity=1-ease(p/.48);}else{stop++;card=0;opacity=ease((p-.52)/.48);}
 }
 updateNavigation(stop,card+(flip>=.5?1:0));drawDeck(stop,card,flip,opacity);
 guide.textContent=s.kind==='travel'?`On the way to ${story[s.stop+1].label}`:stop===0?'Scroll to start the journey':stop===5?'The next chapter is still unwritten':card<cards[stop].length-1?'Scroll to turn the cards':`Scroll to continue to ${story[stop+1].label}`;
 status.textContent=s.kind==='travel'?`${story[s.stop].label} → ${story[s.stop+1].label}`:stop===0?'An engineer’s journey':`${story[stop].label} · ${String(activeCard+1).padStart(2,'0')} / ${String(cards[stop].length).padStart(2,'0')}`;
 const point=route.getPointAtLength(path*pathLength),before=route.getPointAtLength(Math.max(0,path*pathLength-1)),after=route.getPointAtLength(Math.min(pathLength,path*pathLength+1));
 const prefix=routeSamples.slice(0,Math.floor(path*400)+1);
 travelled.setAttribute('d',path>.00001?'M'+prefix.map(p=>`${p.x.toFixed(2)},${p.y.toFixed(2)}`).join('L')+`L${point.x.toFixed(2)},${point.y.toFixed(2)}`:'');fallback.style.left=`${point.x/420*100}%`;fallback.style.top=`${point.y/760*100}%`;
 const walking=Math.abs(path-lastRoute)>.00001;
 if(scene&&(sceneDirty||walking||wasWalking||stop!==lastSceneStop)){scene.render(point,{x:after.x-before.x,y:after.y-before.y},path,stop,walking);sceneDirty=false;lastSceneStop=stop;}
 wasWalking=walking;lastRoute=path;
 progress.style.transform=`scaleX(${current/timeline.duration})`;
 if(Math.abs(target-current)>.0001)queue();
}
async function loadScene(){const request=++sceneRequest;try{const module=await import('./scene');if(reading||scene||request!==sceneRequest)return;scene=module.createScene(sceneHost,()=>{sceneDirty=true;queue();});sceneDirty=true;queue();}catch{sceneHost.parentElement!.classList.remove('scene-ready');}}
function setMode(isReading:boolean){
 reading=isReading;sceneRequest++;root.classList.toggle('enhanced',!reading);root.classList.toggle('reading',reading);
 motion.textContent=reading?'Motion off':'Motion on';motion.setAttribute('aria-pressed',String(reading));
 if(frame){cancelAnimationFrame(frame);frame=0;}lastTime=0;lastKey='';
 chapters.forEach(ch=>{ch.inert=false;ch.removeAttribute('aria-hidden');ch.style.opacity='';});
 cards.flat().forEach(el=>{el.inert=false;el.removeAttribute('aria-hidden');el.removeAttribute('style');el.classList.remove('is-back','is-front');});
 if(reading){scene?.dispose();scene=null;}else{measure();current=target;loadScene();}
}
function go(stop:number,card=0,smooth=true){
 closeDialog(indexDialog);closeDialog(details);
 if(reading){activeStop=stop;activeCard=card;cards[stop][card].scrollIntoView({behavior:'auto',block:'center'});}
 else{
  const t=timeline.anchors[stop][card];
  const offset=main.offsetTop+(main.offsetHeight-experience.offsetHeight)*t/timeline.duration;
  window.scrollTo({top:offset,behavior:smooth?'smooth':'instant'});
  if(!smooth){target=current=t;lastKey='';queue();}
 }
 history.replaceState(null,'',`#${story[stop].id}`);
}
document.querySelectorAll<HTMLElement>('[data-go]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();go(Number(el.dataset.go));}));
document.querySelectorAll<HTMLElement>('[data-card-go]').forEach(el=>el.addEventListener('click',()=>{const [stop,card]=el.dataset.cardGo!.split(':').map(Number);go(stop,card);}));
function step(direction:number){const index=allCards.findIndex(x=>x.stop===activeStop&&x.card===activeCard);const to=allCards[index+direction];if(to)go(to.stop,to.card);}
prev.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));
document.querySelectorAll<HTMLElement>('[data-open-index]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openIndex();}));
document.querySelectorAll<HTMLElement>('[data-detail]').forEach(el=>el.addEventListener('click',()=>openDetails(Number(el.dataset.detail))));
[indexDialog,details].forEach(dialog=>{
 dialog.querySelector('[data-close]')!.addEventListener('click',()=>closeDialog(dialog));
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}});
 dialog.addEventListener('close',()=>{if(!indexDialog.open&&!details.open){document.body.classList.remove('dialog-open');const el=dialog===details?returnFocus:indexReturnFocus;if(el&&!el.closest('[inert]'))el.focus({preventScroll:true});}});
});
motion.addEventListener('click',()=>{const stop=activeStop,card=activeCard;setMode(!reading);go(stop,card,false);});
media.addEventListener('change',e=>{const stop=activeStop,card=activeCard;setMode(e.matches);go(stop,card,false);});
window.addEventListener('scroll',measure,{passive:true});window.addEventListener('resize',measure);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else{lastTime=0;queue();}});
window.addEventListener('pagehide',()=>{sceneRequest++;scene?.dispose();scene=null;});window.addEventListener('pageshow',e=>{if(e.persisted&&!reading){loadScene();measure();}});
setMode(reading);
const hashIndex=story.findIndex(s=>`#${s.id}`===location.hash);if(hashIndex>=0)requestAnimationFrame(()=>go(hashIndex,0,false));
