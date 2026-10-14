(() => {
  'use strict';
  const $=s=>document.querySelector(s), key='interaction-atlas-personal-v1';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL=s=>{try{const u=new URL(s);return /^https?:$/.test(u.protocol)?u.href:'';}catch{return '';}};
  const templates=window.ATLAS_TEMPLATES.map(t=>({...t,type:'template',id:'t-'+t.id,file:t.id}));
  const references=window.CASES.map(c=>({...c,id:'c-'+c.id,type:'case',title:c.name,cat:({config:'配置选型',compare:'差异比较',detail:'细节讲解',ar:'虚拟试用',creative:'创意探索'})[c.cat],tags:[c.kind],description:c.mechanism,url:c.links[0][1]}));
  const spatial=window.ATLAS_THREE||[];
  const resources=[...window.ATLAS_RESOURCES,...(window.ATLAS_3D_RESOURCES||[])];
  const runnable=e=>e.type==='template'||e.type==='three';
  const portableCache=new Map();
  async function portable(e){
    if(e.type!=='three')return source(e);
    if(portableCache.has(e.id))return portableCache.get(e.id);
    const urls=[e.file,'three-lab.css','three-engine.js','vendor/three-0.160.0.min.js','vendor/THREE-LICENSE.txt'];
    const [html,css,engine,vendor,license]=await Promise.all(urls.map(async url=>{const r=await fetch(url);if(!r.ok)throw Error('模板文件加载失败');return r.text();}));
    const safe=s=>s.replace(/<\/script/gi,'<\\/script');
    const full=html.replace('<link rel="stylesheet" href="../three-lab.css">',()=>'<style>'+css+'</style>').replace('<script src="../vendor/three-0.160.0.min.js"></script>',()=>'<script>/* Three.js MIT license:\n'+license.replace(/\*\//g,'* /')+'*/\n'+safe(vendor)+'</script>').replace('<script src="../three-engine.js"></script>',()=>'<script>'+safe(engine)+'</script>');
    portableCache.set(e.id,full);return full;
  }
  let state={version:1,saved:[],notes:{},custom:[],name:'我的交互素材库',accent:'#d8e866'},type='narrative',category='全部',active=null,toastTimer;
  function normalize(raw){
    if(!raw||raw.version!==1||!Array.isArray(raw.saved)||!Array.isArray(raw.custom)||!raw.notes||typeof raw.notes!=='object'||Array.isArray(raw.notes))throw Error('备份格式不正确');
    const custom=raw.custom.slice(0,500).filter(x=>x&&typeof x.id==='string'&&/^u-[\w-]{1,100}$/.test(x.id)&&typeof x.title==='string'&&safeURL(x.url)).map(x=>({id:x.id,title:x.title.slice(0,100),url:safeURL(x.url),tags:[String(x.tags||'').slice(0,120)],type:'custom',cat:'我的收集',brief:'自己的设计发现',date:String(x.date||'').slice(0,30)}));
    const known=new Set([...templates,...spatial,...resources,...references,...custom].map(x=>x.id));
    const notes={};Object.entries(raw.notes).slice(0,2000).forEach(([id,value])=>{if(known.has(id)&&typeof value==='string')notes[id]=value.slice(0,5000);});
    return {version:1,saved:[...new Set(raw.saved.filter(x=>typeof x==='string'&&known.has(x)))],notes,custom,name:typeof raw.name==='string'&&raw.name.trim()?raw.name.slice(0,60):'我的交互素材库',accent:/^#[0-9a-f]{6}$/i.test(raw.accent)?raw.accent:'#d8e866'};
  }
  try{const raw=localStorage.getItem(key);if(raw)state=normalize(JSON.parse(raw));else{const legacy=JSON.parse(localStorage.getItem('sg-atlas-saved')||'[]');if(Array.isArray(legacy))state.saved=[...new Set(legacy.map(id=>'c-'+id).filter(id=>references.some(c=>c.id===id)))];}}catch{ /* Usable in memory if browser storage is unavailable. */ }
  const entries=()=>[...spatial.filter(e=>e.film),...templates.filter(e=>e.cat==='动效叙事'),...spatial.filter(e=>!e.film),...templates.filter(e=>e.cat!=='动效叙事'),...resources,...references,...state.custom];
  const labels={three:'三维模板',template:'交互模板',resource:'官方资源',case:'参考案例',custom:'我的收集'};
  function toast(text){$('#library-toast').textContent=text;$('#library-toast').classList.add('on');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#library-toast').classList.remove('on'),3000);}
  function persist(){try{localStorage.setItem(key,JSON.stringify(state));return true;}catch{toast('浏览器保存失败，请导出备份；本次内容仍可使用。');return false;}}
  function theme(){document.documentElement.style.setProperty('--accent',state.accent);$('#library-name').textContent=state.name;document.title=state.name+' · Interaction Atlas';}
  function source(t){return '<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(t.title)+' · Interaction Atlas</title><style>:root{--accent:'+state.accent+'}'+window.ATLAS_BASE+t.css+'</style></head><body>'+t.body+'<script>\n'+t.js+'\n</script></body></html>';}
  function download(name,content,mime){const url=URL.createObjectURL(new Blob([content],{type:mime})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
  function matchesType(e){return type==='all'||(type==='narrative'?runnable(e)&&e.cat==='动效叙事':type==='saved'?state.saved.includes(e.id):e.type===type);}
  function tint(e){const n=entries().findIndex(x=>x.id===e.id);return ['#3c5143','#3f485c','#554d37','#453b55'][Math.abs(n)%4];}
  function resourceArt(e){return '<div class="resource-art" style="--tint:'+tint(e)+'"><span>'+esc(e.stack||'PERSONAL COLLECTION')+'</span><strong>'+esc(e.title)+'</strong><span>'+esc(e.type==='custom'?'自己的发现':'官方资源入口')+'</span><b aria-hidden="true">'+(e.cat==='动效三维'?'◈':e.cat==='设计规范'?'⊞':'↗')+'</b></div>';}
  function thumb(e){if(e.type==='three')return '<img loading="lazy" src="'+esc(e.image)+'" alt="'+esc(e.title)+' · 本模板实拍预览"><span class="badge">WebGL 实景 · '+esc(e.level)+'</span>';if(e.type==='template')return '<iframe title="'+esc(e.title)+'缩略预览" tabindex="-1" aria-hidden="true" sandbox="allow-scripts" loading="lazy" srcdoc="'+esc(source(e))+'"></iframe><span class="badge">真实模板预览 · 点击操作</span>';if(e.type==='case')return '<img loading="lazy" src="'+esc(e.image)+'" alt="'+esc(e.title)+' · '+esc(e.imageLabel)+'"><span class="badge">'+esc(e.imageLabel)+'</span>';return resourceArt(e);}
  function categories(){const cats=['全部',...new Set(entries().filter(matchesType).map(e=>e.cat))];if(!cats.includes(category))category='全部';$('#category-filters').innerHTML=cats.map(c=>'<button data-category="'+esc(c)+'" aria-pressed="'+(category===c)+'">'+esc(c)+'</button>').join('');}
  function render(){
    categories();const q=$('#search-library').value.trim().toLowerCase();
    const found=entries().filter(e=>matchesType(e)&&(category==='全部'||e.cat===category)&&[e.title,e.brief,e.description,e.cat,...(e.tags||[]),state.notes[e.id]||''].join(' ').toLowerCase().includes(q));
    $('#library-grid').innerHTML=found.map(e=>'<article class="entry"><button class="card-open" data-open="'+e.id+'" aria-label="打开 '+esc(e.title)+'"><div class="thumb">'+thumb(e)+'</div><div class="card-body"><span class="card-kind">'+labels[e.type]+' / '+esc(e.cat)+'</span><h3>'+esc(e.title)+'</h3><p>'+esc(e.brief)+'</p><div class="card-bottom"><span>'+(e.type==='three'?'WebGL · 可离线下载':e.type==='template'?'独立 HTML · 无依赖':e.type==='case'?'带图案例 · 有来源':e.type==='custom'?'本地收集':'官方入口 · 2026.10.14')+'</span><span>'+(state.notes[e.id]?'有笔记 ↗':'探索 ↗')+'</span></div></div></button><button class="favorite" data-save="'+e.id+'" aria-pressed="'+state.saved.includes(e.id)+'" aria-label="收藏 '+esc(e.title)+'">'+(state.saved.includes(e.id)?'★':'☆')+'</button></article>').join('');
    $('#result-count').textContent=found.length+' 个素材';$('#empty-library').hidden=found.length>0;
    $('#custom-count').textContent=state.custom.length;$('#favorite-count').textContent=state.saved.length;$('#type-filters [data-type=all] span').textContent=entries().length;
    document.querySelectorAll('[data-type]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.type===type)));
  }
  function toggleSave(id){const i=state.saved.indexOf(id);i<0?state.saved.push(id):state.saved.splice(i,1);persist();render();if(active&&active.id===id)saveState();}
  function saveState(){const saved=state.saved.includes(active.id);$('#save-item').setAttribute('aria-pressed',String(saved));$('#save-item').textContent=saved?'★ 已收藏':'☆ 收藏素材';}
  function showCode(code){$('#code-area').hidden=!code;$('#preview-area').hidden=code;$('#preview-tab').setAttribute('aria-pressed',String(!code));$('#code-tab').setAttribute('aria-pressed',String(code));}
  function mountPreview(){const frame=document.createElement('iframe');frame.id='live-preview';frame.title='交互模板预览';frame.setAttribute('sandbox','allow-scripts allow-forms');if(active.type==='three')frame.src=active.file;else frame.srcdoc=source(active);$('#preview-area').replaceChildren(frame);}
  function stopPreview(){const f=$('#live-preview');f.removeAttribute('src');f.srcdoc='';}
  function detail(id){
    active=entries().find(e=>e.id===id);if(!active)return;
    const e=active,isTemplate=runnable(e);$('#open-demo-page').hidden=e.type!=='three';if(e.type==='three')$('#open-demo-page').href=e.file;$('#detail-type').textContent=labels[e.type]+' / '+e.id.toUpperCase();$('#detail-title').textContent=e.title;$('#detail-category').textContent=e.cat;$('#detail-brief').textContent=e.brief;
    $('#demo-tools').hidden=!isTemplate;$('#code-actions').hidden=!isTemplate;$('#reference-area').hidden=isTemplate;$('#preview-area').classList.remove('narrow');$('#width-toggle').setAttribute('aria-pressed','false');
    if(isTemplate){$('#code-area code').textContent=e.type==='three'?'正在准备完整离线源码…':source(e);showCode(false);$('#detail-instructions').innerHTML='<h3>试着这样操作</h3><p>'+esc(e.steps)+'</p><h3>如何换成自己的项目</h3><p>'+esc(e.adapt)+'</p><h3>可复用范围</h3><p>本项目编写的独立演示代码。无公司 logo、无品牌图片、无外部运行依赖。上线前按实际业务测试。</p>';}
    else {stopPreview();$('#preview-area').hidden=true;$('#code-area').hidden=true;$('#reference-area').innerHTML=(e.type==='case'?'<img src="'+esc(e.image)+'" alt="'+esc(e.title)+'"><p>'+esc(e.imageLabel)+' · '+esc(e.imageDate)+'</p>':resourceArt(e))+'<a class="primary" href="'+esc(safeURL(e.url))+'" target="_blank" rel="noopener noreferrer">打开'+(e.type==='custom'?'原始链接':'官方来源')+' ↗</a>'+(e.type==='case'?'<p>'+esc(e.imageNote||'配图与核对范围见原项目详情。')+'</p>':'');$('#detail-instructions').innerHTML='<h3>'+(e.type==='case'?'交互机制':'适合怎么用')+'</h3><p>'+esc(e.description||'记录让你产生灵感的设计，再把链接与笔记一起收藏。')+'</p><h3>使用范围</h3><p>'+(e.type==='custom'?'自己添加的链接，不代表已核对可用性。':e.type==='case'?esc(e.status)+'；品牌图片用于参考，不能作为自己的通用素材。':'官方资料入口已于 2026.10.14 核对，并非逐项功能实测；具体资源可能包含付费内容，授权以原站为准。')+'</p>';}
    if(e.type==='three'){ $('#detail-instructions').innerHTML='<h3>亲手体验</h3><p>'+esc(e.steps)+'</p><h3>适合这些项目</h3><p>'+esc(e.tags.join(' · '))+' · '+esc(e.level)+'</p><h3>如何复用</h3><p>'+esc(e.adapt)+'</p><h3>实现边界</h3><p>'+esc(e.limit)+'</p><h3>运行方式</h3><p>真实 WebGL 三维。单个下载内嵌引擎，可离线打开；整包保留共享依赖。Three.js MIT 许可证随源码保留。</p>'; portable(e).then(code=>{if(active?.id===e.id)$('#code-area code').textContent=code;}).catch(()=>{if(active?.id===e.id)$('#code-area code').textContent='源码加载失败，请重新打开模板或下载整包。';}); }
    $('#item-note').value=state.notes[e.id]||'';saveState();$('#detail').showModal();$('#detail').scrollTop=0;if(isTemplate)mountPreview();
  }
  document.addEventListener('click',e=>{const save=e.target.closest('[data-save]');if(save){toggleSave(save.dataset.save);return;}const open=e.target.closest('[data-open]');if(open)detail(open.dataset.open);const f=e.target.closest('[data-type]');if(f){type=f.dataset.type;category='全部';render();}const c=e.target.closest('[data-category]');if(c){category=c.dataset.category;render();}});
  $('#search-library').oninput=render;$('#reset-search').onclick=()=>{type='all';category='全部';$('#search-library').value='';render();};
  $('#close-detail').onclick=()=>$('#detail').close();$('#detail').addEventListener('close',()=>{if(!$('#detail').open)stopPreview();});
  $('#preview-tab').onclick=()=>showCode(false);$('#code-tab').onclick=()=>showCode(true);$('#width-toggle').onclick=()=>{const on=$('#preview-area').classList.toggle('narrow');$('#width-toggle').setAttribute('aria-pressed',String(on));showCode(false);};$('#restart').onclick=()=>{if(active&&runnable(active))mountPreview();};
  $('#save-item').onclick=()=>toggleSave(active.id);$('#save-note').onclick=()=>{state.notes[active.id]=$('#item-note').value;if(persist())toast('设计笔记已保存');render();};
  $('#download-template').onclick=async()=>{const item=active;try{const code=await portable(item);download(item.type==='three'?item.file.split('/').pop():item.file+'.html',code,'text/html;charset=utf-8');toast('已下载独立 HTML，可离线用浏览器打开。');}catch{toast('下载失败，请重试或使用整包下载。');}};
  $('#copy-code').onclick=async()=>{try{await navigator.clipboard.writeText(await portable(active));toast('完整源码已复制');}catch{showCode(true);const range=document.createRange();range.selectNodeContents($('#code-area code'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);toast('请按 Ctrl+C 或使用“下载独立 HTML”。');}};
  $('#random').onclick=()=>{const pool=[...spatial,...templates];detail(pool[Math.floor(Math.random()*pool.length)].id);};
  function openAdd(){if(state.custom.length>=500){toast('最多保存 500 个自建条目，请先导出备份。');return;}$('#add-dialog').showModal();}
  $('#add-open').onclick=openAdd;$('#add-bottom').onclick=openAdd;$('#close-add').onclick=()=>$('#add-dialog').close();
  $('#add-form').onsubmit=e=>{e.preventDefault();const data=new FormData(e.currentTarget),url=safeURL(data.get('url'));if(!url){toast('请输入 http 或 https 网页链接');return;}const title=String(data.get('title')).trim();if(!title){toast('请输入素材名称');return;}const item={id:'u-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8),title,url,tags:[String(data.get('tags'))],brief:'自己的设计发现',cat:'我的收集',type:'custom',date:new Date().toISOString().slice(0,10)};state.custom.unshift(item);state.notes[item.id]=String(data.get('note'));state.saved.push(item.id);persist();e.currentTarget.reset();$('#add-dialog').close();type='custom';category='全部';$('#search-library').value='';render();$('#collection').scrollIntoView({behavior:'smooth'});toast('已加入我的收集与收藏');};
  $('#settings-open').onclick=()=>{const f=$('#settings-form');f.elements.name.value=state.name;f.elements.accent.value=state.accent;$('#settings').showModal();};$('#close-settings').onclick=()=>$('#settings').close();
  $('#settings-form').onsubmit=e=>{e.preventDefault();state.name=e.currentTarget.elements.name.value.trim()||'我的交互素材库';state.accent=e.currentTarget.elements.accent.value;persist();theme();render();$('#settings').close();toast('名称与模板强调色已更新');};
  $('#export').onclick=()=>{download('interaction-atlas-backup.json',JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2),'application/json');toast('已导出收藏、笔记、自建条目和设置。');};
  $('#import').onclick=()=>$('#import-file').click();$('#import-file').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>2*1024*1024)throw Error('备份文件不能超过 2 MB');const incoming=normalize(JSON.parse(await f.text()));const custom=[...new Map([...state.custom,...incoming.custom].map(x=>[x.id,x])).values()];if(custom.length>500)throw Error('合并后超过 500 个自建条目');state={...incoming,custom,saved:[...new Set([...state.saved,...incoming.saved])],notes:{...state.notes,...incoming.notes}};persist();theme();render();toast('备份已合并；同一条目的笔记以导入内容为准。');}catch(err){toast('导入失败：'+(err instanceof SyntaxError?'不是有效的 JSON 文件':err.message));}finally{e.target.value='';}};
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!document.querySelector('dialog[open]')&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();$('#search-library').focus();}});
  theme();render();
})();
