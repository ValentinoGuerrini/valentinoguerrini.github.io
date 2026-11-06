import * as THREE from 'three';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';
import { landmarks,phoneX } from '../map-layout';

type Position={x:number;y:number};
export function createScene(host:HTMLElement,invalidate:()=>void){
 const canvas=document.createElement('canvas');
 const context=canvas.getContext('webgl2',{antialias:true,alpha:true});
 const renderer=context?new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:true,powerPreference:'low-power'}):new SVGRenderer();
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setClearColor(0xf5f3ed,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const gpu=renderer instanceof THREE.WebGLRenderer;
 if(gpu){renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;}else{renderer.setQuality('high');renderer.setPrecision(2);}
 renderer.domElement.setAttribute('aria-hidden','true');host.prepend(renderer.domElement);
 const scene=new THREE.Scene();
 const camera=new THREE.OrthographicCamera(-5,5,7,-7,.1,100);camera.position.set(0,0,25);
 scene.add(gpu?new THREE.HemisphereLight(0xffffff,0xbfc6b2,2.5):new THREE.AmbientLight(0xffffff,.66));
 const light=new THREE.DirectionalLight(0xfff6e3,gpu?3:.85);light.position.set(-5,9,12);scene.add(light);
 const colors={green:0x3c6d60,deep:0x244b42,pale:0xb6c4a6,ivory:0xe0deca,brass:0xb89856,stone:0xb9b5a0};
 const material=(color:number)=>new THREE.MeshStandardMaterial({color,roughness:.7,metalness:color===colors.brass?.25:.04,transparent:true});
 function box(g:THREE.Group,x:number,y:number,z:number,w:number,h:number,d:number,color:number){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material(color));m.position.set(x,y,z);g.add(m);return m;}
 function ball(g:THREE.Group,x:number,y:number,z:number,r:number,color:number){const m=new THREE.Mesh(new THREE.SphereGeometry(r,12,8),material(color));m.position.set(x,y,z);g.add(m);return m;}
 function cone(g:THREE.Group,x:number,y:number,z:number,r:number,h:number,color:number,sides=4){const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,sides),material(color));m.position.set(x,y,z);m.rotation.y=Math.PI/4;g.add(m);return m;}
 const models:THREE.Group[]=[];const parts:THREE.Mesh[][]=[];
 function model(){const g=new THREE.Group();g.rotation.set(.52,-.42,0);scene.add(g);models.push(g);return g;}
 // Piacenza: a farmhouse and cypress trees nestled in the hills.
 const roots=model();
 for(const [x,z,r,sx,sy,color] of [[-.45,0,.9,1.3,.4,colors.pale],[.55,-.35,.8,1,.65,0x93aa87]]){
  const m=new THREE.Mesh(new THREE.SphereGeometry(r,20,10,0,Math.PI*2,0,Math.PI/2),material(color));m.position.set(x,0,z);m.scale.set(sx,sy,1);roots.add(m);
 }
 box(roots,.05,.39,.3,.53,.61,.48,colors.ivory);cone(roots,.05,.82,.3,.45,.3,colors.brass);
 box(roots,.05,.25,.548,.12,.25,.015,colors.deep);
 for(const x of [-.11,.21])box(roots,x,.53,.55,.075,.09,.02,colors.green);
 for(const [x,z,h] of [[-.9,.35,.95],[-1.12,-.1,.8],[.9,.05,1.1]]){
  box(roots,x,.23,z,.04,.4,.04,colors.brass);
  const c=new THREE.Mesh(new THREE.CapsuleGeometry(.11,h*.55,3,8),material(colors.green));c.position.set(x,h*.56,z);roots.add(c);
 }
 // Milan: the spires and pale stone of the Duomo.
 const milan=model();
 box(milan,0,.04,0,2.3,.08,1.5,colors.pale);
 box(milan,0,.43,-.12,1.8,.8,1.05,colors.ivory);
 box(milan,0,.58,.46,1.95,1.1,.15,colors.ivory);
 for(let i=0;i<7;i++){
  const x=-.9+i*.3;const h=1.13+(3-Math.abs(3-i))*.13;
  box(milan,x,h/2,.56,.055,h,.055,colors.stone);
  cone(milan,x,h+.15,.56,.07,.3,colors.ivory);
 }
 for(const x of [-.6,0,.6]){
  box(milan,x,.32,.55,.24,.49,.035,colors.deep);
  cone(milan,x,.66,.55,.16,.2,colors.deep,3);
 }
 for(const x of [-.75,-.3,.3,.75])box(milan,x,.88,.55,.11,.2,.03,colors.brass);
 cone(milan,0,1.75,-.26,.12,.65,colors.ivory);
 ball(milan,0,2.1,-.26,.035,colors.brass);
 // Chicago: a stepped skyline with the twin antennas of Willis Tower.
 const chicago=model();
 box(chicago,0,.035,0,2.4,.07,1.4,colors.pale);
 const towers=[[-.82,.2,.6,.45],[-.25,-.12,1.85,.5],[.26,.1,1.3,.4],[.8,.05,.93,.45]];
 towers.forEach(([x,z,h,w],i)=>{
  box(chicago,x,h/2,z,w,h,.5,i===1?colors.deep:colors.green);
  box(chicago,x,h+.025,z,w+.035,.05,.535,colors.ivory);
  for(let j=0;j<Math.floor(h/.21);j++)box(chicago,x,.15+j*.21,z+.254,w*.66,.035,.015,colors.pale);
 });
 box(chicago,-.41,1.88,-.12,.19,.45,.43,colors.deep);
 for(const x of [-.43,-.18])box(chicago,x,2.25,-.12,.018,.5,.018,colors.brass);
 // Zürich: alpine peaks behind the Grossmünster's twin towers.
 const zurich=model();
 cone(zurich,.25,.48,-.65,1.15,1.35,colors.pale,5);
 cone(zurich,.25,1.02,-.65,.4,.48,colors.ivory,5);
 cone(zurich,-.75,.24,-.55,.7,.85,0x94aa87,5);
 box(zurich,0,.04,.1,2.4,.08,1.35,colors.pale);
 box(zurich,.05,.31,.2,.9,.55,.65,colors.ivory);
 for(const x of [-.48,.48]){
  box(zurich,x,.62,.55,.31,1.16,.34,colors.ivory);
  box(zurich,x,1.2,.55,.35,.08,.38,colors.brass);
  cone(zurich,x,1.35,.55,.23,.24,colors.deep,8);
  box(zurich,x,.88,.724,.11,.24,.015,colors.deep);
 }
 box(zurich,0,.24,.535,.2,.36,.03,colors.deep);
 // Small architectural details give each miniature a distinct silhouette up close.
 box(roots,.28,.87,.19,.08,.28,.1,colors.stone);
 for(const x of [-.11,.21])for(const side of [-1,1])box(roots,x+side*.055,.53,.565,.025,.11,.025,colors.green);
 for(let row=0;row<3;row++){
  const z=.5+row*.18;
  box(roots,-.53,.17,z,.65,.025,.018,colors.brass);
  for(let n=0;n<5;n++)ball(roots,-.84+n*.15,.2,z,.047,colors.green);
  for(const x of [-.87,-.19])box(roots,x,.14,z,.025,.28,.025,colors.stone);
 }
 for(let step=0;step<3;step++)box(milan,0,.02+step*.035,.85-step*.13,2.12-step*.13,.035,.22,colors.stone);
 for(const x of [-.76,-.46,.46,.76]){
  box(milan,x,.79,.56,.085,.22,.024,colors.deep);
  box(milan,x,.79,.577,.015,.24,.014,colors.brass);
 }
 const rose=new THREE.Mesh(new THREE.TorusGeometry(.135,.025,5,16),material(colors.brass));rose.position.set(0,.95,.562);milan.add(rose);
 for(let i=0;i<8;i++){const ray=box(milan,0,.95,.562,.012,.24,.012,colors.stone);ray.rotation.z=i*Math.PI/4;}
 for(const x of [-.94,.94])for(const z of [-.54,-.12,.28]){box(milan,x,.65,z,.06,1.25,.065,colors.stone);cone(milan,x,1.37,z,.055,.18,colors.ivory);}
 box(chicago,0,.055,.9,2.6,.025,.32,0x7da5a0);
 for(const x of [-.82,-.25,.26,.8])for(const offset of [-.1,.1])box(chicago,x+offset,.5,.31,.014,.8,.012,colors.deep);
 for(const x of [-1.07,1.07]){box(chicago,x,.15,.55,.025,.3,.025,colors.stone);ball(chicago,x,.39,.55,.15,colors.green);}
 box(chicago,.9,.24,.87,.035,.45,.035,colors.deep);ball(chicago,.9,.49,.87,.055,colors.brass);
 box(zurich,0,.045,.91,2.7,.025,.44,0x7da5a0);
 box(zurich,-.45,.22,.89,1.1,.065,.25,colors.ivory);
 for(const x of [-.9,-.48,-.05])box(zurich,x,.13,.89,.08,.22,.22,colors.stone);
 for(const x of [-.48,.48]){
  const clock=new THREE.Mesh(new THREE.CircleGeometry(.07,12),material(colors.brass));clock.position.set(x,1.05,.726);zurich.add(clock);
  box(zurich,x,1.05,.735,.012,.08,.009,colors.deep);box(zurich,x+.02,1.05,.735,.05,.012,.009,colors.deep);
  for(const y of [.32,.52])box(zurich,x,y,.726,.07,.12,.016,colors.deep);
 }
 for(const x of [-1.02,1.02]){box(zurich,x,.2,.27,.025,.3,.025,colors.brass);cone(zurich,x,.5,.27,.17,.6,colors.green,7);}
 models.forEach(g=>{const m:THREE.Mesh[]=[];g.traverse(o=>{if(o instanceof THREE.Mesh){m.push(o);o.userData.color=(o.material as THREE.MeshStandardMaterial).color.clone();}});parts.push(m);});
 const person=new THREE.Group();scene.add(person);
 const head=ball(person,0,.65,0,.105,colors.brass);
 const hair=ball(person,0,.705,-.015,.095,0x514b38);hair.scale.y=.55;
 for(const x of [-.036,.036])ball(person,x,.66,.095,.012,colors.deep);
 box(person,0,.61,.097,.04,.01,.015,colors.ivory);
 const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.085,.2,4,8),material(colors.deep));torso.position.y=.4;person.add(torso);
 box(person,0,.42,-.12,.17,.22,.09,colors.green);
 for(const x of [-.055,.055])box(person,x,.41,.08,.018,.22,.015,colors.brass);
 const limbs:THREE.Group[]=[];
 function limb(x:number,y:number,len:number,r:number){const pivot=new THREE.Group();pivot.position.set(x,y,0);person.add(pivot);const mesh=new THREE.Mesh(new THREE.CapsuleGeometry(r,len,3,6),material(colors.deep));mesh.position.y=-len/2;pivot.add(mesh);limbs.push(pivot);}
 limb(-.06,.26,.21,.03);limb(.06,.26,.21,.03);limb(-.12,.49,.22,.024);limb(.12,.49,.22,.024);
 const shadow=new THREE.Mesh(new THREE.CircleGeometry(.16,16),new THREE.MeshBasicMaterial({color:0x445a43,transparent:true,opacity:.12}));shadow.scale.y=.3;shadow.position.z=-.2;person.add(shadow);
 const book=new THREE.Group();person.add(book);book.position.set(0,.4,.24);book.rotation.x=-.23;
 box(book,0,0,0,.29,.19,.025,colors.brass);box(book,0,.01,.019,.255,.16,.015,colors.ivory);
 box(book,0,.01,.03,.012,.16,.008,colors.stone);
 for(const y of [-.03,.01,.05])for(const x of [-.07,.07])box(book,x,y,.03,.075,.006,.006,colors.green);
 const tablet=new THREE.Group();person.add(tablet);tablet.position.set(0,.42,.23);tablet.rotation.x=-.3;
 box(tablet,0,0,0,.25,.19,.025,colors.deep);box(tablet,0,.012,.02,.205,.135,.012,colors.pale);
 for(let i=0;i<3;i++)box(tablet,-.02,.045-i*.035,.03,.11,.008,.005,colors.green);
 let width=0,height=0,unit=1,small=false;
 function world(p:Position){return {x:(p.x/420-.5)*width/unit,y:(.5-p.y/760)*height/unit};}
 function resize(){
  width=host.clientWidth;height=host.clientHeight;if(!width||!height)return;unit=height/760*55;
  renderer.setSize(width,height,false);camera.left=-width/unit/2;camera.right=width/unit/2;camera.top=height/unit/2;camera.bottom=-height/unit/2;camera.updateProjectionMatrix();
  small=matchMedia('(max-width:700px)').matches;
  models.forEach((g,i)=>{const p=world({x:small?phoneX.landmark:landmarks[i].x,y:landmarks[i].y});g.position.set(p.x,p.y,0);g.scale.setScalar(small?.4:.9);});
  person.scale.setScalar(small?1.08:1.3);invalidate();
 }
 const paper=new THREE.Color(0xf5f3ed);let lastActive=-1,previousFraction=0,facing=1;
 type Action={icon:string;nextIcon?:string;blend:number;phase:number;travel:boolean};
 function pose(icon:string,phase:number){
  const wave=Math.sin(phase*Math.PI*4);
  if(icon==='compass'||icon==='envelope'||icon==='skyline')return {lx:-.25,rx:-.2,lz:-.18,rz:2.05+wave*.23,book:0,tablet:0,nod:wave*.025};
  if(icon==='book')return {lx:-1.25,rx:-1.25,lz:-.45,rz:.45,book:1,tablet:0,nod:-.1+wave*.035};
  if(icon==='chip'||icon==='nodes'||icon==='lock'||icon==='eye')return {lx:-1.15,rx:-1.15+wave*.18,lz:-.35,rz:.4,book:0,tablet:1,nod:-.1};
  if(icon==='teaching'||icon==='atom')return {lx:-.25,rx:-.45,lz:-.15,rz:1.25+wave*.13,book:0,tablet:0,nod:wave*.04};
  if(icon==='mountain')return {lx:.08,rx:.08,lz:-2.3-wave*.1,rz:2.3+wave*.1,book:0,tablet:0,nod:.04};
  return {lx:0,rx:-1.65,lz:-.18,rz:.3+wave*.07,book:0,tablet:0,nod:wave*.04};
 }
 function render(position:Position,tangent:Position,pathFraction:number,active:number,moving:boolean,action:Action){
  const p=world(position);person.position.set(p.x,p.y,5);
  limbs.forEach(l=>l.rotation.set(0,0,0));book.visible=false;tablet.visible=false;
  if(action.travel){
   if(Math.abs(pathFraction-previousFraction)>.00001)facing=pathFraction>=previousFraction?1:-1;
   person.rotation.y=Math.atan2(tangent.x*facing,tangent.y*facing);
   const stride=moving?Math.sin(pathFraction*190)*.65:0;
   limbs.forEach((l,i)=>l.rotation.x=stride*(i%2===0?1:-1));head.rotation.z=0;
  }else{
   const a=pose(action.icon,action.phase),b=pose(action.nextIcon||action.icon,action.phase),blend=action.blend;
   const mix=(key:keyof typeof a)=>a[key]+(b[key]-a[key])*blend;
   person.rotation.y=active===2||active===4?-.25:.25;
   limbs[2].rotation.set(mix('lx'),0,mix('lz'));limbs[3].rotation.set(mix('rx'),0,mix('rz'));
   book.visible=mix('book')>.5;tablet.visible=mix('tablet')>.5;head.rotation.z=mix('nod');
  }
  previousFraction=pathFraction;
  if(active!==lastActive){parts.forEach((meshes,i)=>{const fade=i+1===active?0:i+1<active?.08:.22;meshes.forEach(m=>(m.material as THREE.MeshStandardMaterial).color.copy(m.userData.color).lerp(paper,fade));});lastActive=active;}
  renderer.render(scene,camera);
 }
 const observer=new ResizeObserver(resize);observer.observe(host);resize();host.parentElement!.classList.add('scene-ready');
 const lost=(event:Event)=>{event.preventDefault();host.parentElement!.classList.remove('scene-ready');};
 const restored=()=>{host.parentElement!.classList.add('scene-ready');invalidate();};
 renderer.domElement.addEventListener('webglcontextlost',lost);renderer.domElement.addEventListener('webglcontextrestored',restored);
 return {render,dispose(){observer.disconnect();renderer.domElement.removeEventListener('webglcontextlost',lost);renderer.domElement.removeEventListener('webglcontextrestored',restored);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});if(renderer instanceof THREE.WebGLRenderer)renderer.dispose();renderer.domElement.remove();host.parentElement!.classList.remove('scene-ready');}};
}
