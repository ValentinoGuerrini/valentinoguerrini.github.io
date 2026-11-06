import * as THREE from 'three';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';

export function createScene(host: HTMLElement, invalidate: () => void) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', { antialias: true, alpha: true });
  const gpu = Boolean(context);
  const renderer = context
    ? new THREE.WebGLRenderer({ canvas, context, antialias: true, alpha: true, powerPreference: 'low-power' })
    : new SVGRenderer();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0xf5f3ed, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  if (renderer instanceof THREE.WebGLRenderer) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
  } else {
    renderer.setQuality('high');
    renderer.setPrecision(2);
  }
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-8, 8, 3, -3, .1, 150);
  scene.add(gpu ? new THREE.HemisphereLight(0xffffff, 0xc8c4ad, 2.5) : new THREE.AmbientLight(0xffffff, .8));
  const light = new THREE.DirectionalLight(0xfff6e3, gpu ? 3.5 : 1.2);
  light.position.set(-3, 9, 7); light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  light.shadow.camera.left = -9; light.shadow.camera.right = 9;
  light.shadow.camera.top = 9; light.shadow.camera.bottom = -9;
  light.shadow.normalBias = .025;
  light.shadow.bias = -.0001;
  scene.add(light); scene.add(light.target);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(180, 80), new THREE.ShadowMaterial({ color: 0x31483c, opacity: .12 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -.035; ground.receiveShadow = true; if(gpu)scene.add(ground);

  const colors = { green: 0x3c6d60, deep: 0x224b42, pale: 0xc2cbb7, ivory: 0xe1dfce, brass: 0xb89856, ink: 0x29443c };
  function material(color: number) { return new THREE.MeshStandardMaterial({ color, roughness: .65, metalness: color === colors.brass ? .4 : .06, transparent: true }); }
  function box(g: THREE.Group, x: number, y: number, z: number, w: number, h: number, d: number, color: number) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material(color));
    m.position.set(x,y,z); m.castShadow = true; m.receiveShadow = true; g.add(m); return m;
  }
  function sphere(g: THREE.Group, x: number, y: number, z: number, r: number, color: number) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r,24,16), material(color));
    m.position.set(x,y,z); m.castShadow = true; g.add(m); return m;
  }
  function line(g: THREE.Group, points: THREE.Vector3[], color: number, radius = .017) {
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 32, radius, 6, false), material(color)); g.add(m); return m;
  }
  const groups: THREE.Group[] = [];
  const parts: THREE.Mesh[][] = [];
  function model() { const g = new THREE.Group(); g.rotation.y = -.48; scene.add(g); groups.push(g); return g; }

  // Introduction: a single machined cube, opened into three quiet layers.
  const start = model();
  box(start,0,.13,0,1.9,.16,1.9,colors.pale);
  box(start,0,.42,0,1.36,.42,1.36,colors.green);
  box(start,0,.72,0,1.12,.14,1.12,colors.brass);
  box(start,0,.94,0,.95,.24,.95,colors.ivory);
  for(let i=0;i<5;i++) { box(start,-.78+i*.39,.235,.91,.12,.025,.18,colors.brass); box(start,-.78+i*.39,.235,-.91,.12,.025,.18,colors.brass); }

  // Piacenza: a compact sculptural landscape, one object rather than a skyline.
  const roots = model();
  function hill(x:number,z:number,r:number,sx:number,sy:number,color:number) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r,40,20,0,Math.PI*2,0,Math.PI/2), material(color));
    m.position.set(x,0,z); m.scale.set(sx,sy,1); m.castShadow=true; m.receiveShadow=true; roots.add(m);
  }
  hill(-.55,0,1,1.25,.55,colors.pale); hill(.55,-.35,.85,1,.8,0x94aa8d);
  box(roots,.1,.43,.46,.47,.62,.41,colors.ivory);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(.42,.28,4),material(colors.brass)); roof.position.set(.1,.88,.46);roof.rotation.y=Math.PI/4;roof.castShadow=true;roots.add(roof);
  for(const [x,z,h] of [[-.9,.65,1.15],[-1.15,.25,.95],[1.05,.15,1.3]]) {
    box(roots,x,.27,z,.045,.45,.045,colors.brass);
    const c = new THREE.Mesh(new THREE.CapsuleGeometry(.13,h*.55,6,12),material(colors.green));c.position.set(x,h*.55,z);c.castShadow=true;roots.add(c);
  }

  // Milan: an FPGA-like package, with a configurable tile fabric.
  const chip = model();
  box(chip,0,.12,0,2.55,.19,2.15,colors.green);
  for(let i=0;i<10;i++) {
    const x=-1.08+i*.24;
    box(chip,x,.12,1.2,.09,.07,.31,colors.brass);box(chip,x,.12,-1.2,.09,.07,.31,colors.brass);
  }
  box(chip,0,.29,0,1.7,.16,1.5,colors.deep);
  box(chip,0,.39,0,1.52,.07,1.32,colors.brass);
  for(let row=0;row<3;row++)for(let col=0;col<3;col++)box(chip,-.44+col*.44,.51,-.39+row*.39,.38,.18,.33,colors.ivory);

  // Chicago: three machines, one communication path.
  const cluster=model();
  const towers = [[-.95,.2,1.3],[0,-.55,1.8],[.95,.2,1.15]];
  towers.forEach(([x,z,h],i)=>{
    box(cluster,x,h/2,z,.6,h,.62,i===1?colors.green:colors.pale);
    box(cluster,x,h+.03,z,.64,.06,.66,colors.ivory);
    for(let row=0;row<4;row++) {
      box(cluster,x,h*.26+row*.22,z+.316,.38,.035,.02,colors.deep);
      box(cluster,x+.19,h*.26+row*.22,z+.33,.025,.025,.02,colors.brass);
    }
  });
  line(cluster,[new THREE.Vector3(-.95,.035,.65),new THREE.Vector3(-.95,.035,1),new THREE.Vector3(0,.035,1.25),new THREE.Vector3(.95,.035,1),new THREE.Vector3(.95,.035,.65)],colors.brass,.025);
  line(cluster,[new THREE.Vector3(0,.035,-.22),new THREE.Vector3(0,.035,1.25)],colors.brass,.025);
  const packet=sphere(cluster,0,.08,1.25,.065,colors.brass);

  // Zürich: layers of a server accelerator, separated enough to inspect.
  const accelerator=model();
  box(accelerator,0,.11,0,2.2,.16,1.8,colors.deep);
  box(accelerator,0,.37,0,1.8,.13,1.5,colors.pale);
  box(accelerator,0,.65,0,1.5,.17,1.25,colors.green);
  box(accelerator,0,.86,0,1.08,.12,.9,colors.brass);
  for(let i=0;i<7;i++)box(accelerator,-.5+i*.17,1.09,0,.055,.32,.9,colors.ivory);
  for(const x of [-.85,.85])for(const z of [-.65,.65])box(accelerator,x,.31,z,.045,.36,.045,colors.brass);

  // An open doorway marks the next chapter.
  const next=model();
  box(next,-.65,.85,0,.13,1.7,.18,colors.green);box(next,.65,.85,0,.13,1.7,.18,colors.green);
  box(next,0,1.7,0,1.43,.13,.18,colors.green);
  box(next,0,.04,0,1.6,.08,1.35,colors.pale);
  const door=box(next,.2,.88,-.3,1.15,1.6,.06,colors.ivory);door.rotation.y=-.52;
  sphere(next,-.12,.82,.05,.035,colors.brass);

  groups.forEach(g=>{ const meshes:THREE.Mesh[]=[];g.traverse(o=>{if(o instanceof THREE.Mesh)meshes.push(o);});parts.push(meshes); });
  const routePoints = Array.from({length:70},(_,i)=>{const x=-14+i*.75;return new THREE.Vector3(x,.018,1.8+Math.sin(x*.43)*.4);});
  const routeCurve = new THREE.CatmullRomCurve3(routePoints);
  const route = new THREE.Line(new THREE.BufferGeometry().setFromPoints(routeCurve.getPoints(180)),new THREE.LineBasicMaterial({color:0xc9cfc2}));scene.add(route);
  // A small articulated traveller, walking only when the visitor scrolls.
  const person=new THREE.Group();scene.add(person);
  sphere(person,0,.61,0,.10,colors.brass);
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(.075,.2,4,10),material(colors.deep));body.position.y=.37;body.castShadow=true;person.add(body);
  box(person,0,.39,-.1,.15,.2,.09,colors.green);
  const limbs:THREE.Group[]=[];
  function limb(x:number,y:number,length:number,radius:number) {
    const pivot=new THREE.Group();pivot.position.set(x,y,0);person.add(pivot);
    const mesh=new THREE.Mesh(new THREE.CapsuleGeometry(radius,length,4,8),material(colors.deep));mesh.position.y=-length/2;mesh.castShadow=true;pivot.add(mesh);limbs.push(pivot);
  }
  limb(-.055,.25,.19,.028);limb(.055,.25,.19,.028);limb(-.105,.45,.19,.023);limb(.105,.45,.19,.023);
  person.rotation.y=Math.PI/2;

  let yaw=0;let last=0;let dragX:number|null=null;let dragStart=0;
  function resize() {
    const w=host.clientWidth,h=host.clientHeight;
    if(!w||!h)return;
    renderer.setSize(w,h,false);
    const half = w<700?2.75:2.65;
    camera.left=-half*w/h;camera.right=half*w/h;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();
    invalidate();
  }
  function render(q:number, moving:boolean) {
    const index=Math.min(5,Math.max(0,Math.round(q)));
    const distance=Math.abs(q-index);
    const opacity=THREE.MathUtils.smoothstep(.5-distance,0,.22);
    const cx=q*5;
    camera.position.set(cx,6.5,10);camera.lookAt(cx,.52,0);
    light.position.x=cx-3;light.target.position.x=cx;ground.position.x=cx;
    groups.forEach((g,i)=>{
      g.visible=i===index;
      if(i!==index)return;
      g.position.set(cx,(1-opacity)*-.12,-.35);
      g.rotation.y=-.48+yaw;
      const scale=.9+.1*opacity;g.scale.setScalar(scale);
      parts[i].forEach(mesh=>{(mesh.material as THREE.MeshStandardMaterial).opacity=opacity;});
    });
    const px=cx-1.55, pz=1.8+Math.sin(px*.43)*.4;
    person.position.set(px,0,pz);
    const stride=moving?Math.sin(q*46)*.42:0;
    limbs.forEach((l,i)=>l.rotation.x=stride*(i%2===0?1:-1));
    if(Math.abs(q-last)>.0001)person.rotation.y=q>=last?Math.PI/2:-Math.PI/2;
    last=q;
    if(index===3){packet.position.x=Math.sin(q*9)*.8;packet.position.z=1.15;}
    renderer.render(scene,camera);
  }
  const onDown=(e:PointerEvent)=>{if(e.pointerType!=='mouse')return;dragX=e.clientX;dragStart=yaw;host.setPointerCapture(e.pointerId);host.classList.add('dragging');};
  const onMove=(e:PointerEvent)=>{if(dragX===null)return;yaw=dragStart+(e.clientX-dragX)*.008;invalidate();};
  const onUp=()=>{dragX=null;host.classList.remove('dragging');};
  host.addEventListener('pointerdown',onDown);host.addEventListener('pointermove',onMove);host.addEventListener('pointerup',onUp);host.addEventListener('pointercancel',onUp);
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const contextLost=(e:Event)=>{e.preventDefault();host.classList.remove('is-ready');};
  renderer.domElement.addEventListener('webglcontextlost',contextLost);
  renderer.domElement.addEventListener('webglcontextrestored',()=>{host.classList.add('is-ready');invalidate();});
  resize();host.classList.add('is-ready');
  return { render, resetRotation(){yaw=0;}, dispose(){resizeObserver.disconnect();host.removeEventListener('pointerdown',onDown);host.removeEventListener('pointermove',onMove);host.removeEventListener('pointerup',onUp);host.removeEventListener('pointercancel',onUp);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});if(renderer instanceof THREE.WebGLRenderer)renderer.dispose();route.geometry.dispose();route.material.dispose();renderer.domElement.remove();host.classList.remove('is-ready');} };
}
