const root=document.documentElement;
const main=document.querySelector<HTMLElement>('#journey')!;
const experience=document.querySelector<HTMLElement>('.experience')!;
const chapters=[...document.querySelectorAll<HTMLElement>('[data-chapter]')];
const sceneHost=document.querySelector<HTMLElement>('#scene')!;
const counter=document.querySelector<HTMLElement>('.chapter-counter')!;
const nextLink=document.querySelector<HTMLAnchorElement>('[data-next]')!;
const progress=document.querySelector<HTMLElement>('.progress span')!;
const indexDialog=document.querySelector<HTMLDialogElement>('#index')!;
const details=document.querySelector<HTMLDialogElement>('#details')!;
const motion=document.querySelector<HTMLButtonElement>('#motion-toggle')!;
const media=matchMedia('(prefers-reduced-motion: reduce)');
const labels=['Introduction','Piacenza','Milan','Chicago','Zürich','Contact'];
const detailTitles=['Valentino Guerrini','Piacenza','Research in Milan','Supercomputing in Chicago','Zürich','Contact','Other explorations'];
let reading=media.matches;
let current=0,target=0,active=-1,frame=0,lastTime=0;
let scene:Awaited<ReturnType<typeof import('./scene')['createScene']>>|null=null;
let sceneRequest=0;
let returnFocus:HTMLElement|null=null;
let indexReturnFocus:HTMLElement|null=null;
function closeDialog(dialog:HTMLDialogElement){
 if(dialog.open)dialog.close();
 if(!indexDialog.open&&!details.open)document.body.classList.remove('dialog-open');
}
function openIndex(){
 indexReturnFocus=document.activeElement as HTMLElement;
 closeDialog(details);
 indexDialog.showModal();document.body.classList.add('dialog-open');
}
function openDetails(id:number){
 returnFocus=indexDialog.open?indexReturnFocus:document.activeElement as HTMLElement;
 closeDialog(indexDialog);
 document.querySelectorAll<HTMLElement>('[data-detail-panel]').forEach(panel=>{panel.hidden=Number(panel.dataset.detailPanel)!==id;});
 document.querySelector('#details-title')!.textContent=detailTitles[id];
 document.querySelector('#details-label')!.textContent=id===6?'Selected work':labels[id]||'About';
 details.showModal();details.scrollTop=0;document.body.classList.add('dialog-open');
}
function queue(){if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
function measure(){
 if(reading)return;
 const distance=Math.max(1,main.offsetHeight-experience.offsetHeight);
 target=Math.max(0,Math.min(5,(window.scrollY-main.offsetTop)/distance*5));
 queue();
}
function tick(time:number){
 frame=0;
 if(reading)return;
 const dt=Math.min(64,lastTime?time-lastTime:16);lastTime=time;
 const difference=target-current;
 // Only the artwork is eased. The document always follows native scrolling.
 current+=difference*(1-Math.exp(-dt/85));
 if(Math.abs(target-current)<.0004)current=target;
 const index=Math.min(5,Math.max(0,Math.round(current)));
 const distance=Math.abs(current-index);
 const opacity=Math.min(1,Math.max(0,(.5-distance)/.18));
 if(index!==active){
  active=index;
  chapters.forEach((chapter,i)=>{chapter.classList.toggle('is-active',i===active);chapter.inert=i!==active;chapter.setAttribute('aria-hidden',String(i!==active));});
  counter.textContent=`0${active} / 05`;
  nextLink.querySelector('span')!.textContent=active===0?'Scroll to begin':active===5?'Back to the beginning':`Continue to ${labels[active+1]}`;
  nextLink.href=`#${chapters[active===5?0:active+1].id}`;
  nextLink.classList.toggle('is-last',active===5);
  scene?.resetRotation();
 }
 const chapter=chapters[active];
 chapter.style.opacity=String(opacity);
 chapter.style.transform=`translateY(${(current-active)*-24}px)`;
 progress.style.transform=`scaleX(${current/5})`;
 scene?.render(current,Math.abs(difference)>.001);
 if(Math.abs(target-current)>.0001)queue();
}
async function loadScene(){
 const request=++sceneRequest;
 try{
  const module=await import('./scene');
  if(reading||scene||request!==sceneRequest)return;
  scene=module.createScene(sceneHost,queue);
  queue();
 }catch{
  // The inline scene remains visible if both renderers are unavailable. All content and controls still work.
  sceneHost.classList.remove('is-ready');
 }
}
function setMode(isReading:boolean){
 reading=isReading;sceneRequest++;
 root.classList.toggle('enhanced',!reading);root.classList.toggle('reading',reading);
 motion.textContent=reading?'Motion off':'Motion on';motion.setAttribute('aria-pressed',String(reading));
 if(frame){cancelAnimationFrame(frame);frame=0;}
 active=-1;lastTime=0;
 chapters.forEach(c=>{c.inert=false;c.removeAttribute('aria-hidden');c.style.opacity='';c.style.transform='';});
 if(reading){scene?.dispose();scene=null;}else{measure();current=target;loadScene();}
}
function go(index:number,smooth=true){
 closeDialog(indexDialog);closeDialog(details);
 const destination=chapters[index];
 if(reading){destination.scrollIntoView({behavior:'auto',block:'start'});}
 else{
   const offset=main.offsetTop+(main.offsetHeight-experience.offsetHeight)*(index/5);
   window.scrollTo({top:offset,behavior:smooth?'smooth':'instant'});
   if(!smooth){target=current=index;active=-1;queue();}
 }
 history.replaceState(null,'',`#${destination.id}`);
}
document.querySelectorAll<HTMLElement>('[data-go]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();go(Number(el.dataset.go));}));
document.querySelectorAll<HTMLElement>('[data-open-index]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openIndex();}));
document.querySelectorAll<HTMLElement>('[data-detail]').forEach(el=>el.addEventListener('click',()=>openDetails(Number(el.dataset.detail))));
nextLink.addEventListener('click',e=>{e.preventDefault();go(active>=5?0:Math.max(0,active)+1);});
[indexDialog,details].forEach(dialog=>{
 dialog.querySelector('[data-close]')!.addEventListener('click',()=>closeDialog(dialog));
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}});
 dialog.addEventListener('close',()=>{
  if(!indexDialog.open&&!details.open){document.body.classList.remove('dialog-open');const el=dialog===details?returnFocus:indexReturnFocus;if(el&&!el.closest('[inert]'))el.focus({preventScroll:true});}
 });
});
motion.addEventListener('click',()=>{const index=Math.max(0,active);setMode(!reading);go(index,false);});
media.addEventListener('change',e=>{const index=Math.max(0,active);setMode(e.matches);go(index,false);});
window.addEventListener('scroll',measure,{passive:true});
window.addEventListener('resize',measure);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else{lastTime=0;queue();}});
window.addEventListener('pagehide',()=>{sceneRequest++;scene?.dispose();scene=null;});
window.addEventListener('pageshow',e=>{if(e.persisted&&!reading){loadScene();measure();}});
setMode(reading);
const hashIndex=chapters.findIndex(chapter=>`#${chapter.id}`===location.hash);
if(hashIndex>=0)requestAnimationFrame(()=>go(hashIndex,false));
