/* Interaction Atlas original demos. Three.js is distributed under MIT; see vendor/THREE-LICENSE.txt. */
window.startAtlas3D=function(config){
 'use strict';
 const T=window.THREE,$=s=>document.querySelector(s),mode=config.mode;
 const stage=$('#stage'),canvas=$('#scene'),status=$('#status'),slider=$('#parameter');
 const say=s=>status.textContent=s;
 let renderer;
 try{if(!T)throw Error('Engine unavailable');renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true,preserveDrawingBuffer:true});}
 catch(e){$('#fallback').hidden=false;$('#runtime').textContent='WEBGL UNAVAILABLE';say('当前设备未能启用 WebGL。可继续查看模板说明与源码。');return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;renderer.localClippingEnabled=true;
 const scene=new T.Scene();scene.fog=new T.Fog('#101713',17,35);
 const camera=new T.PerspectiveCamera(38,1,.1,80),orth=new T.OrthographicCamera(-4,4,3,-3,.1,80);let activeCamera=camera;
 let az=.65,el=.28,distance=8,target=new T.Vector3(0,.1,0),playing=false,clock=0,last=0,dirty=true,disposed=false,visible=true,parameter=Number(slider.value)/100;
 const root=new T.Group();scene.add(root);
 const ambient=new T.HemisphereLight('#dcebea','#26372a',2);scene.add(ambient);
 const key=new T.DirectionalLight('#fff0cd',4);key.position.set(3,6,5);scene.add(key);
 const rim=new T.DirectionalLight('#8bb6ff',3);rim.position.set(-4,2,-3);scene.add(rim);
 // A procedural light studio supplies reflections without external HDR textures.
 const studio=new T.Scene();studio.background=new T.Color('#38453d');
 for(let i=0;i<5;i++){const panel=new T.Mesh(new T.PlaneGeometry(4,6),new T.MeshBasicMaterial({color:i%2?'#dfedff':'#fff1dc',side:T.DoubleSide}));panel.position.set(Math.sin(i*1.256)*5,2,Math.cos(i*1.256)*5);panel.lookAt(0,0,0);studio.add(panel);}
 const pm=new T.PMREMGenerator(renderer),environment=pm.fromScene(studio,.08);scene.environment=environment.texture;pm.dispose();studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
 const mats=[],parts=[],pickables=[];let special={},selected=null;
 function material(color='#d8e866',metal=.35,rough=.28){const m=new T.MeshStandardMaterial({color,metalness:metal,roughness:rough});mats.push(m);return m;}
 const lime=material(config.color||'#d8e866',.55,.24),dark=material('#263a32',.8,.3),silver=material('#c4d0ce',.9,.2),coral=material('#e9977d',.35,.3);
 function mesh(geo,mat,pos=[0,0,0],parent=root,name='部件'){const m=new T.Mesh(geo,mat);m.position.set(...pos);m.name=name;parent.add(m);pickables.push(m);return m;}
 function box(w,h,d,mat,pos,parent=root,name){return mesh(new T.BoxGeometry(w,h,d),mat,pos,parent,name);}
 function ring(radius,tube,mat,pos=[0,0,0],parent=root){const m=mesh(new T.TorusGeometry(radius,tube,16,64),mat,pos,parent,'环形结构');m.rotation.x=Math.PI/2;return m;}
 function product(parent=root){const group=new T.Group();parent.add(group);const layers=[[-.95,1.05,.22,dark,'底座'],[-.62,.88,.36,silver,'支撑框'],[0,.98,.85,lime,'主体外壳'],[.58,.92,.22,dark,'密封环'],[.85,1.1,.27,silver,'顶盖']];layers.forEach(([y,r,h,m,n],i)=>{const p=mesh(new T.CylinderGeometry(r,r,h,64),m,[0,y,0],group,n);parts.push({mesh:p,base:p.position.clone(),offset:new T.Vector3(0,(i-2)*.75,0)});});for(let j=0;j<32;j++){const a=j*Math.PI/16;box(.035,.66,.06,dark,[Math.sin(a)*.985,0,Math.cos(a)*.985],group,'散热纹理').rotation.y=a;}const crown=new T.Group();group.add(crown);ring(.72,.05,lime,[0,1,0],crown);mesh(new T.CylinderGeometry(.42,.42,.04,48),dark,[0,1,0],crown,'中心盖');parts.push({mesh:crown,base:crown.position.clone(),offset:new T.Vector3(0,1.5,0)});return group;}
 function chair(parent=root){const g=new T.Group();parent.add(g);box(2,.32,1.7,lime,[0,-.25,0],g,'座垫');box(2,1.7,.3,lime,[0,.72,-.7],g,'靠背');for(const x of[-.8,.8])for(const z of[-.58,.58])box(.13,1.2,.13,silver,[x,-.95,z],g,'椅腿');special.arms=new T.Group();g.add(special.arms);for(const x of[-1.1,1.1]){box(.2,.16,1.6,dark,[x,.35,0],special.arms,'扶手');box(.12,.6,.12,silver,[x,.04,.5],special.arms);}return g;}
 const floor=mesh(new T.CircleGeometry(4,72),material('#21372b',0,1),[0,-1.7,0],scene,'展台');floor.rotation.x=-Math.PI/2;
 const grid=new T.GridHelper(8,24,'#49614e','#293f31');grid.position.y=-1.69;scene.add(grid);
 if(['orbit','material','explode','clipping','hotspots','lighting','turntable','measure','scroll','projection'].includes(mode)){special.product=product();}
 if(mode==='configurator'){chair();}
 if(mode==='morph'){const geo=new T.SphereGeometry(1.45,48,32);special.original=Float32Array.from(geo.attributes.position.array);special.shape=mesh(geo,lime);}
 if(mode==='particles'){const n=2400,a=new Float32Array(n*3),b=new Float32Array(n*3);for(let i=0;i<n;i++){const u=(i+.5)/n,v=i*2.39996,r=Math.sqrt(1-(2*u-1)**2);a.set([r*Math.cos(v)*1.8,(2*u-1)*1.8,r*Math.sin(v)*1.8],i*3);const p=i/n*Math.PI*24,q=i*2.39996;b.set([(1.3+.43*Math.cos(q))*Math.cos(p),.43*Math.sin(q),(1.3+.43*Math.cos(q))*Math.sin(p)],i*3);}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(a.slice(),3));special={a,b,points:new T.Points(geo,new T.PointsMaterial({color:'#d8e866',size:.035,transparent:true,opacity:.9}))};root.add(special.points);}
 if(mode==='instancing'){const n=225,inst=new T.InstancedMesh(new T.BoxGeometry(.24,1,.24),lime,n);root.add(inst);special.inst=inst;special.dummy=new T.Object3D();root.position.y=-.7;}
 if(mode==='path'){special.curve=new T.CatmullRomCurve3([new T.Vector3(-2,-.8,0),new T.Vector3(-1,1.2,-1),new T.Vector3(1,.1,-.6),new T.Vector3(2,1,1),new T.Vector3(.2,-1,1.4)],true);mesh(new T.TubeGeometry(special.curve,160,.045,10,true),silver);special.cart=mesh(new T.IcosahedronGeometry(.3,1),lime);}
 if(mode==='room'){floor.scale.setScalar(1.4);grid.scale.setScalar(1.4);for(let i=0;i<5;i++){const x=(i-2)*1.7;box(1.25,.3,1.25,dark,[x,-1.5,-1]);const g=i%2?new T.TorusKnotGeometry(.35,.11,64,12):new T.IcosahedronGeometry(.45,i%3);mesh(g,i%2?coral:lime,[x,-.65,-1],root,'展品 '+(i+1));}box(9,4,.15,material('#304137',.1,.8),[0,.2,-2.2]);distance=12;}
 if(mode==='drag'){for(let i=0;i<3;i++){const g=i===0?new T.BoxGeometry(.9,.9,.9):i===1?new T.SphereGeometry(.55,32,24):new T.TorusKnotGeometry(.4,.12,64,12);mesh(g,[lime,coral,silver][i],[(i-1)*1.7,0,0],root,['方块','球体','环结'][i]);}selected=pickables.find(x=>x.name==='方块');}
 if(mode==='wave'){const geo=new T.PlaneGeometry(4.4,3,80,55);geo.rotateX(-Math.PI/2);special.wave=mesh(geo,new T.MeshStandardMaterial({color:'#82b9bd',metalness:.75,roughness:.25,side:T.DoubleSide}));special.original=Float32Array.from(geo.attributes.position.array);}
 if(mode==='clipping'){special.plane=new T.Plane(new T.Vector3(-1,0,0),.3);mats.forEach(m=>{m.clippingPlanes=[special.plane];m.clipShadows=true;m.side=T.DoubleSide;});special.inner=mesh(new T.SphereGeometry(.65,32,24),coral,[0,0,0]);say('移动剖切面观察内核；剖面不做实体封口。');}
 if(mode==='measure'){special.bounds=new T.Box3Helper(new T.Box3(new T.Vector3(-1.1,-1.08,-1.1),new T.Vector3(1.1,1.02,1.1)),'#e9977d');root.add(special.bounds);}
 function cam(){activeCamera.position.set(target.x+Math.sin(az)*Math.cos(el)*distance,target.y+Math.sin(el)*distance,target.z+Math.cos(az)*Math.cos(el)*distance);activeCamera.lookAt(target);}
 function update(v){if(config.film){applyFilm(v);return;}parameter=v;const value=Math.round(v*100);$('#value').textContent=value+'%';
 switch(mode){
 case 'orbit': distance=11-v*6;break;
 case 'material':mats.forEach(m=>m.roughness=.05+.9*v);break;
 case 'explode':floor.position.y=-1.7-v*1.4;grid.position.y=floor.position.y+.01;parts.forEach(p=>p.mesh.position.copy(p.base).addScaledVector(p.offset,v));special.product.children.filter(o=>o.name==='散热纹理').forEach(o=>o.visible=v<.02);break;
 case 'clipping':special.plane.constant=-1.3+2.6*v;break;
 case 'hotspots':{const p=parts[Math.min(4,Math.floor(v*5))].mesh;selectPart(p);break;}
 case 'configurator':root.scale.set( .7+.6*v,1,.8+.4*v);break;
 case 'morph':{const arr=special.shape.geometry.attributes.position,a=special.original;for(let i=0;i<arr.count;i++){const x=a[i*3],y=a[i*3+1],z=a[i*3+2],len=Math.max(Math.abs(x),Math.abs(y),Math.abs(z));arr.setXYZ(i,T.MathUtils.lerp(x,x/len*1.15,v),T.MathUtils.lerp(y,y/len*1.15,v),T.MathUtils.lerp(z,z/len*1.15,v));}arr.needsUpdate=true;special.shape.geometry.computeVertexNormals();break;}
 case 'particles':{const a=special.points.geometry.attributes.position;for(let i=0;i<a.array.length;i++)a.array[i]=T.MathUtils.lerp(special.a[i],special.b[i],v);a.needsUpdate=true;break;}
 case 'instancing':{for(let i=0;i<225;i++){const x=i%15-7,z=Math.floor(i/15)-7,h=.25+1.1*(Math.sin(x*.5+v*Math.PI*4)*Math.cos(z*.5+v*Math.PI*2)+1)/2;special.dummy.position.set(x*.28,h/2-.5,z*.28);special.dummy.scale.set(1,h,1);special.dummy.updateMatrix();special.inst.setMatrixAt(i,special.dummy.matrix);}special.inst.instanceMatrix.needsUpdate=true;break;}
 case 'path':special.cart.position.copy(special.curve.getPointAt(v===1?0:v));break;
 case 'room':target.x=(v-.5)*6;az=.1;el=.12;distance=6;break;
 case 'scroll':az=.4+v*Math.PI*2;el=.15+v*.4;distance=8-v*2;parts.forEach(p=>p.mesh.position.copy(p.base).addScaledVector(p.offset,Math.max(0,v-.45)*1.2));break;
 case 'projection':distance=7.5;orth.zoom=.65+v*.7;orth.updateProjectionMatrix();camera.fov=22+v*38;camera.updateProjectionMatrix();break;
 case 'lighting':key.position.set(Math.sin(v*Math.PI*2)*6,4,Math.cos(v*Math.PI*2)*6);break;
 case 'turntable':root.rotation.y=v*Math.PI*2;break;
 case 'measure':root.scale.setScalar(.6+v*.8);$('#metric').textContent='示例宽度 '+(2.2*(.6+v*.8)).toFixed(2)+' u · 非真实尺寸';break;
 case 'drag':if(selected)selected.position.x=(v-.5)*4;break;
 case 'wave':{const a=special.wave.geometry.attributes.position,o=special.original;for(let i=0;i<a.count;i++)a.setY(i,Math.sin(o[i*3]*2+v*Math.PI*4)*Math.cos(o[i*3+2]*2+v*Math.PI*2)*.4);a.needsUpdate=true;special.wave.geometry.computeVertexNormals();break;}
 }dirty=true;
 }
 function selectPart(p){if(selected?.material?.emissive)selected.material.emissive.set('#000000');selected=p;if(!p.userData.unique){p.material=p.material.clone();p.userData.unique=true;}p.material.emissive.set('#52651b');say('已选中：'+p.name);dirty=true;}
 function pick(ev){const rect=canvas.getBoundingClientRect(),pos=new T.Vector2((ev.clientX-rect.left)/rect.width*2-1,-(ev.clientY-rect.top)/rect.height*2+1),ray=new T.Raycaster();ray.setFromCamera(pos,activeCamera);return ray.intersectObjects(root.children,true).find(i=>i.object.isMesh)?.object;}
 let start=null,dragged=null;
 canvas.addEventListener('pointerdown',e=>{start={x:e.clientX,y:e.clientY,az,el,moved:false};if(mode==='drag'){dragged=pick(e);if(dragged){selectPart(dragged);say('拖动 '+dragged.name+'；也可用滑块水平移动');}}canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start.moved ||= Math.abs(dx)+Math.abs(dy)>4;if(mode==='drag'&&dragged){const rect=canvas.getBoundingClientRect(),v=new T.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),ray=new T.Raycaster();ray.setFromCamera(v,activeCamera);const point=new T.Vector3();if(ray.ray.intersectPlane(new T.Plane(new T.Vector3(0,1,0),0),point)){dragged.position.x=T.MathUtils.clamp(point.x,-2.6,2.6);dragged.position.z=T.MathUtils.clamp(point.z,-2,2);}}else{az=start.az-dx*.008;el=T.MathUtils.clamp(start.el+dy*.006,-.5,1.25);}dirty=true;});
 canvas.addEventListener('pointerup',e=>{if(start&&!start.moved&&mode==='hotspots'){const p=pick(e);if(p)selectPart(p);}start=null;dragged=null;});canvas.addEventListener('pointercancel',()=>{start=null;dragged=null;});
 canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')az-=.15;if(e.key==='ArrowRight')az+=.15;if(e.key==='ArrowUp')el=Math.min(1.25,el+.1);if(e.key==='ArrowDown')el=Math.max(-.5,el-.1);if(e.key==='+')distance=Math.max(3,distance-.4);if(e.key==='-')distance=Math.min(15,distance+.4);dirty=true;});
 slider.oninput=e=>{playing=false;$('#play').setAttribute('aria-pressed','false');$('#play').textContent='播放变化';update(Number(e.target.value)/100);if(mode!=='hotspots')say(config.label+'：'+e.target.value+'%');};
 $('#play').onclick=()=>{playing=!playing;$('#play').setAttribute('aria-pressed',String(playing));$('#play').textContent=playing?'暂停变化':'播放变化';say(playing?'正在播放，可随时暂停':'已暂停');};
 $('#reset').onclick=()=>{az=.65;el=.28;distance=8;target.set(0,.1,0);root.rotation.set(0,0,0);playing=false;$('#play').setAttribute('aria-pressed','false');$('#play').textContent='播放变化';slider.value=config.initial||'35';update(Number(slider.value)/100);say('已恢复初始视图与主参数');};
 document.querySelectorAll('[data-camera]').forEach(b=>b.onclick=()=>{const preset=b.dataset.camera;az=preset==='front'?0:preset==='side'?Math.PI/2:.65;el=preset==='top'?1.25:.15;dirty=true;say('视角：'+b.textContent);});
 document.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>{lime.color.set(b.dataset.color);if(special.points)special.points.material.color.set(b.dataset.color);if(special.wave)special.wave.material.color.set(b.dataset.color);document.querySelectorAll('[data-color]').forEach(x=>x.setAttribute('aria-pressed',String(b===x)));dirty=true;say('主体颜色：'+b.textContent);});
 $('#option').onclick=()=>{const b=$('#option'),on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(on));if(mode==='configurator')special.arms.visible=!on;else if(mode==='projection')activeCamera=on?orth:camera;else if(mode==='material'){mats.forEach(m=>m.metalness=on?.95:.1);}else if(mode==='lighting'){key.color.set(on?'#a4caff':'#ffe7bf');}else if(special.points){special.points.material.size=on?.07:.035;}else{root.traverse(o=>{if(o.isMesh)o.material.wireframe=on;});}dirty=true;say(on?'已启用：'+b.textContent:'已关闭：'+b.textContent);};
 if(mode==='particles')$('#option').textContent='放大粒子';if(mode==='scroll'){$('#story').hidden=false;$('#story').onscroll=e=>{const el=e.currentTarget,v=el.scrollTop/(el.scrollHeight-el.clientHeight);slider.value=Math.round(v*100);update(v);say(['01 整体','02 转向','03 拆解'][Math.min(2,Math.floor(v*3))]);};}

 // A shot is a semantic checkpoint: camera, object state, explanation and outcome stay together.
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let transition=null,shotIndex=0;
 function applyFilm(v){
   parameter=T.MathUtils.clamp(v,0,1);const shots=config.film.shots,q=parameter*(shots.length-1),i=Math.min(shots.length-2,Math.floor(q)),a=shots[i],b=shots[i+1],raw=q-i,u=raw*raw*(3-2*raw);
   const mix=(k,def)=>T.MathUtils.lerp(a[k]??def,b[k]??def,u);
   az=mix('az',.65);el=mix('el',.28);distance=mix('distance',8);target.set(mix('x',0),mix('y',.1),mix('z',0));camera.fov=mix('fov',38);camera.updateProjectionMatrix();
   const explode=mix('explode',0);floor.position.y=-1.7-explode*1.4;grid.position.y=floor.position.y+.01;parts.forEach(p=>p.mesh.position.copy(p.base).addScaledVector(p.offset,explode));special.product?.children.filter(o=>o.name==='散热纹理').forEach(o=>o.visible=explode<.02);
   mats.forEach(m=>m.roughness=mix('rough',.28));key.position.set(Math.sin(mix('light',.6))*6,4,Math.cos(mix('light',.6))*6);
   root.scale.set(mix('scaleX',1),1,1);if(special.arms)special.arms.visible=mix('arms',1)>.5;if(special.curve)special.cart.position.copy(special.curve.getPointAt(mix('route',0)));
   shotIndex=Math.min(shots.length-1,Math.floor(q+0.00001));const s=shots[shotIndex];$('#shot-count').textContent=String(shotIndex+1).padStart(2,'0')+' / '+shots.length;$('#shot-name').textContent=s.name;$('#shot-copy').textContent=s.copy;$('#shot-language').textContent=s.language;
   document.querySelectorAll('[data-shot]').forEach((el,j)=>el.setAttribute('aria-current',String(j===shotIndex)));$('#shot-prev').disabled=parameter<=0;$('#shot-next').disabled=parameter>=1;$('#value').textContent=Math.round(parameter*100)+'%';slider.value=Math.round(parameter*100);$('#film-result').hidden=parameter<.999;dirty=true;
 }
 function pauseFilm(){playing=false;transition=null;$('#play').textContent='播放叙事';$('#play').setAttribute('aria-pressed','false');}
 function goShot(index){pauseFilm();const end=T.MathUtils.clamp(index,0,config.film.shots.length-1)/(config.film.shots.length-1);if(reduced.matches)applyFilm(end);else transition={from:parameter,to:end,t:0};say('镜头正在交代：'+config.film.shots[Math.round(end*(config.film.shots.length-1))].name);}
 if(config.film){
   $('#film-panel').hidden=false;$('#generic-tools').hidden=true;$('#story').hidden=true;$('#metric').textContent='导演视角 · 按章节推进，或拖动进度';
   $('#shot-nav').innerHTML=config.film.shots.map((s,i)=>'<button data-shot="'+i+'" aria-current="false">'+String(i+1).padStart(2,'0')+' '+s.name+'</button>').join('');
   document.querySelectorAll('[data-shot]').forEach(b=>b.onclick=()=>goShot(Number(b.dataset.shot)));
   $('#shot-prev').onclick=()=>goShot(Math.ceil(parameter*(config.film.shots.length-1)) -1);$('#shot-next').onclick=()=>goShot(Math.floor(parameter*(config.film.shots.length-1))+1);
   $('#film-result').textContent='结果 / '+config.film.result;
   slider.oninput=e=>{pauseFilm();applyFilm(Number(e.target.value)/100);};
   $('#play').textContent='播放叙事';$('#play').onclick=()=>{transition=null;playing=!playing;if(playing&&parameter>=1)applyFilm(0);$('#play').setAttribute('aria-pressed',String(playing));$('#play').textContent=playing?'暂停叙事':'播放叙事';};
   $('#reset').textContent='从头回看';$('#reset').onclick=()=>{pauseFilm();applyFilm(0);};
   canvas.addEventListener('pointerdown',()=>pauseFilm());canvas.addEventListener('keydown',()=>pauseFilm());
 }

 function size(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();orth.left=-3*w/h;orth.right=3*w/h;orth.top=3;orth.bottom=-3;orth.updateProjectionMatrix();dirty=true;}
 const ro=new ResizeObserver(size);ro.observe(stage);document.addEventListener('visibilitychange',()=>{visible=!document.hidden;last=0;dirty=true;});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();playing=false;$('#fallback').hidden=false;$('#runtime').textContent='CONTEXT LOST';say('图形上下文已中断，请重置预览。');});
 function frame(t){if(disposed)return;requestAnimationFrame(frame);const dt=last?Math.min((t-last)/1000,.05):0;last=t;if(!visible)return;if(transition){transition.t=Math.min(1,transition.t+dt/1.25);const u=transition.t*transition.t*(3-2*transition.t);applyFilm(T.MathUtils.lerp(transition.from,transition.to,u));if(transition.t===1)transition=null;}if(playing){if(config.film){const v=Math.min(1,parameter+dt/(config.film.shots.length*6));applyFilm(reduced.matches?Math.floor(v*(config.film.shots.length-1))/(config.film.shots.length-1):v);if(reduced.matches){playing=false;say('已启用减少动态，请用章节按钮逐镜查看。');$('#play').textContent='播放叙事';$('#play').setAttribute('aria-pressed','false');}if(v>=1)pauseFilm();}else{clock+=dt;const v=(parameter+dt*.12)%1;slider.value=Math.round(v*100);update(v);}}if(dirty){cam();renderer.render(scene,activeCamera);canvas.dataset.ready='true';dirty=false;}}
 window.addEventListener('pagehide',()=>{disposed=true;ro.disconnect();scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of(Array.isArray(o.material)?o.material:[o.material]))m.dispose();}});environment.dispose();renderer.dispose();});
 size();update(parameter);$('#runtime').textContent='WEBGL · THREE r160';say(config.hint);requestAnimationFrame(frame);
};
