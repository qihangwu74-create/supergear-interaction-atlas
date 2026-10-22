(function(){
'use strict';
const C=window.ATLAS_MOTION_CONFIG,$=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,Number.isFinite(+x)?+x:a)),mix=(a,b,t)=>a+(b-a)*t,smooth=t=>t*t*(3-2*t);
let state={progress:0,started:!C.gated,material:0,x:.25,y:.25,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,follow:false};
let raf=0,three=null,chapter=-1,lastTrigger=null,savedScroll=0,destroyed=false;
function emit(){window.dispatchEvent(new CustomEvent('atlas:change',{detail:{...state,chapter,template:C.slug}}));}
function progressFromScroll(){return clamp(-$('#track').getBoundingClientRect().top/Math.max(1,$('#track').offsetHeight-innerHeight));}
function scrollToProgress(p){const top=scrollY+$('#track').getBoundingClientRect().top;window.scrollTo({top:top+p*Math.max(1,$('#track').offsetHeight-innerHeight),behavior:'instant'});}
function setState(next={},sync=false){
 for(const k of ['progress','x','y'])if(k in next&&Number.isFinite(+next[k]))state[k]=clamp(+next[k],k==='progress'?0:-1,1);
 if('material'in next)state.material=Math.round(clamp(next.material,0,2));
 for(const k of ['started','reduced','follow'])if(typeof next[k]==='boolean')state[k]=next[k];
 if(!state.started)state.progress=0;
 if(sync)scrollToProgress(state.progress);render();emit();return {...state};
}
function render(){
 if(destroyed)return;
 const p=state.progress,ch=Math.min(3,Math.floor(p*4));chapter=ch;const q=state.reduced?[0,.34,.67,1][ch]:p;
 $('#headline').textContent=C.chapters[ch];$('#explanation').textContent=C.notes[ch];$('#progress').value=String(Math.round(p*1000));$('#percent').textContent=Math.round(p*100)+'%';$('#chapter-count').textContent='0'+(ch+1)+' / 04';
 $('#enter').hidden=state.started;$('#leave').hidden=!C.gated||!state.started;$('#reduced').checked=state.reduced;
 all('[data-chapter]').forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===ch));b.disabled=!state.started;});$('#progress').disabled=!state.started;
 all('[data-material]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===state.material)));
 if($('#light-x')){$('#light-x').value=state.x;$('#light-y').value=state.y;}if($('#follow'))$('#follow').checked=state.follow;
 $('#stage').classList.toggle('reduced',state.reduced);if(three)three.draw(q);
 if(C.slug==='gaze'){
  const x=state.follow?state.x*20:[0,-19,19,0][ch],y=state.follow?state.y*13:(ch===1||ch===2?9:0);
  all('.pupil').forEach(e=>e.setAttribute('transform','translate('+x+' '+y+')'));all('[data-feature]').forEach((e,i)=>e.classList.toggle('active',ch===i+1));$('#signal').setAttribute('opacity',ch===3?'1':'.2');
 }
 if(C.slug==='portraits'){
  const width=$('#portraits').clientWidth,narrow=width<540,cols=narrow?2:3,gap=14,w=Math.min(narrow?118:155,(width-40-gap*(cols-1))/cols),h=w*1.18,areaH=$('#portraits').clientHeight,rows=Math.ceil(6/cols);
  all('.portrait').forEach((e,i)=>{const endX=(i%cols-(cols-1)/2)*(w+gap),endY=(Math.floor(i/cols)-(rows-1)/2)*(h+gap),t=smooth(clamp(q*1.6));const startX=Math.cos(i*1.1)*width*.23,startY=Math.sin(i*1.1)*Math.min(areaH*.23,110);e.style.width=w+'px';e.style.height=h+'px';e.style.transform='translate(-50%,-50%) translate('+mix(startX,endX,t)+'px,'+mix(startY,endY,t)+'px) rotate('+mix((i-2.5)*9,0,t)+'deg)';e.style.zIndex=String(i+1);});
 }
}
function schedule(){if(!destroyed&&!raf)raf=requestAnimationFrame(()=>{raf=0;if(state.started)state.progress=progressFromScroll();render();emit();});}
$('#enter').onclick=()=>{setState({started:true,progress:0},true);$('#progress').focus();};$('#leave').onclick=()=>{setState({started:false,progress:0},true);$('#enter').focus();};$('#reset').onclick=()=>reset();
$('#progress').oninput=e=>setState({progress:+e.target.value/1000},true);all('[data-chapter]').forEach(b=>b.onclick=()=>setState({progress:[0,.34,.67,1][+b.dataset.chapter]},true));$('#reduced').onchange=e=>setState({reduced:e.target.checked});
all('[data-material]').forEach(b=>b.onclick=()=>setState({material:+b.dataset.material}));for(const axis of ['x','y'])if($('#light-'+axis))$('#light-'+axis).oninput=e=>setState({[axis]:+e.target.value});if($('#follow'))$('#follow').onchange=e=>setState({follow:e.target.checked});
$('#stage').addEventListener('pointermove',e=>{if(e.target.closest('.controls,button,a,input')||!state.started||state.reduced||e.pointerType==='touch'||(C.slug!=='material'&&!(C.slug==='gaze'&&state.follow)))return;const r=$('#stage').getBoundingClientRect();state.x=clamp((e.clientX-r.left)/r.width*2-1,-1,1);state.y=clamp((e.clientY-r.top)/r.height*2-1,-1,1);render();});
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',()=>{three?.resize();schedule();});matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>setState({reduced:e.matches}));
function reset(){setState({progress:0,started:!C.gated,material:0,x:.25,y:.25,follow:false},true);}
window.AtlasTemplate={getState:()=>({...state,chapter}),setState:n=>setState(n,true),reset,destroy:()=>{destroyed=true;cancelAnimationFrame(raf);window.removeEventListener('scroll',schedule);three?.dispose();}};
if(C.three){try{three=buildScene();$('#fallback').hidden=true;}catch(e){$('#fallback').hidden=false;$('#fallback-message').textContent='此设备无法显示 WebGL，已展示静态结构图。章节与文字仍可操作。';}}
function buildScene(){
 const T=window.THREE;if(!T)throw Error('Three.js missing');const host=$('#scene'),renderer=new T.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));host.appendChild(renderer.domElement);renderer.setClearColor(0x000000,0);renderer.toneMapping=T.ACESFilmicToneMapping;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(40,1,.1,100),group=new T.Group();scene.add(group);scene.add(new T.HemisphereLight(0xe2f4ff,0x252126,2));const key=new T.PointLight(0xffffff,65);key.position.set(3,3,4);scene.add(key);const rim=new T.DirectionalLight(C.color,3);rim.position.set(-3,2,-1);scene.add(rim);
 const metal=new T.MeshPhysicalMaterial({color:0xa5b4a3,metalness:.75,roughness:.3,clearcoat:1}),dark=new T.MeshStandardMaterial({color:0x252b32,metalness:.5,roughness:.4}),glow=new T.MeshStandardMaterial({color:C.color,emissive:C.color,emissiveIntensity:.45,metalness:.25,roughness:.25}),parts=[];
 function mesh(geo,mat,x=0,y=0,z=0,parent=group){const o=new T.Mesh(geo,mat);o.position.set(x,y,z);parent.add(o);return o;}
 if(C.slug==='material'){
  mesh(new T.TorusGeometry(1.45,.38,48,128),metal).rotation.x=.25;mesh(new T.CylinderGeometry(1.08,1.08,.22,80),dark).rotation.x=Math.PI/2;
  for(let i=0;i<64;i++){const a=i/64*Math.PI*2,m=mesh(new T.BoxGeometry(.018,.14,.03),glow,Math.cos(a)*1.08,Math.sin(a)*1.08,.15);m.rotation.z=a-Math.PI/2;}mesh(new T.TorusGeometry(.78,.013,8,80),glow,0,0,.15);
 }else if(C.slug==='passage'){
  mesh(new T.IcosahedronGeometry(.45,1),metal);for(let i=0;i<7;i++){const gate=new T.Group();scene.add(gate);gate.position.z=-i*4;mesh(new T.TorusGeometry(2.6,.025,8,80),glow,0,0,0,gate);mesh(new T.BoxGeometry(5.2,.03,4),dark,0,-2.65,-2,gate);}scene.fog=new T.FogExp2(0x111c25,.028);
 }else{
  parts.push(mesh(new T.CylinderGeometry(1.25,1.25,.5,80),dark));parts.push(mesh(new T.TorusGeometry(1,.18,24,96),metal,0,0,.4));parts.push(mesh(new T.CylinderGeometry(.83,.83,.13,80),new T.MeshPhysicalMaterial({color:0x75b6cc,metalness:.8,roughness:.13,clearcoat:1}),0,0,.65));parts.push(mesh(new T.TorusGeometry(.9,.075,16,96),glow,0,0,.85));parts[0].rotation.x=parts[2].rotation.x=Math.PI/2;for(let i=0;i<8;i++){const a=i/8*Math.PI*2;mesh(new T.SphereGeometry(.035,8,8),metal,Math.cos(a)*1.12,Math.sin(a)*1.12,.27);}
 }
 const resize=()=>{const r=host.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/Math.max(r.height,1);camera.updateProjectionMatrix();};resize();
 return {resize,draw(p){const base=camera.aspect<.8?9:6.7;
  if(C.slug==='material'){metal.roughness=[.65,.3,.08][state.material];metal.metalness=[.25,.7,.95][state.material];const a=p*Math.PI*1.6;key.position.set(Math.sin(a)*3+state.x*3,2-state.y*3,3+Math.cos(a));group.rotation.set(.12,.3,0);camera.position.set(0,0,base);}
  else if(C.slug==='passage'){camera.position.set(Math.sin(p*Math.PI)*.5,.25,6-p*20+(camera.aspect<.8?3:0));group.position.set(Math.sin(p*Math.PI*2)*.7,Math.cos(p*Math.PI)*.3,1-p*20);group.rotation.set(p*2,p*5,p);key.position.set(1,2,camera.position.z+1);camera.lookAt(group.position);renderer.render(scene,camera);return;}
  else{const explode=smooth(clamp((p-.35)/.3))*(1-smooth(clamp((p-.8)/.2)));parts.forEach((o,i)=>o.position.z=[0,.4,.65,.85][i]+i*explode*.55);group.rotation.set(.18,-Math.sin(p*Math.PI)*.4,0);camera.position.set(4*Math.sin(p*Math.PI),1,base-1.2*Math.sin(p*Math.PI));$('#shutter').style.opacity=state.reduced?'0':String(Math.max(0,1-Math.abs(p-.32)/.025)*.88);}
  camera.lookAt(0,0,C.slug==='anatomy'?.5:0);renderer.render(scene,camera);
 },dispose(){scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});renderer.dispose();}};
}
if(C.slug==='portraits'){all('.portrait').forEach(b=>b.onclick=()=>{lastTrigger=b;savedScroll=scrollY;$('#person-title').textContent=b.dataset.name;$('#person-description').textContent=b.dataset.bio;$('#person').showModal();});$('#close-person').onclick=()=>$('#person').close();$('#person').addEventListener('close',()=>{window.scrollTo({top:savedScroll,behavior:'instant'});lastTrigger?.focus({preventScroll:true});});}
render();
})();
