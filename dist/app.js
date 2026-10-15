(() => {
  'use strict';
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const cases = window.CASES, names = {config:'配置选型',compare:'差异比较',detail:'细节讲解',ar:'虚拟试用',creative:'创意探索'};
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let saved = new Set(), category = 'all', savedOnly = false, currentId = 1, visible = cases, toastTimer;
  try { const data=JSON.parse(localStorage.getItem('sg-atlas-saved') || '[]'); if(Array.isArray(data)) saved=new Set(data.filter(id=>cases.some(c=>c.id===id))); } catch (_) {}
  function toast(message) { $('#toast').textContent=message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2600); }
  function art(c) {
    return '<div class="card-art" data-cat="'+esc(c.cat)+'"><img class="real-shot" src="'+esc(c.image)+'" alt="'+esc(c.name)+' · '+esc(c.imageLabel)+'" loading="lazy" decoding="async"><span class="art-label">'+esc(c.imageLabel)+'</span></div>';
  }
  function imageCredit(c) { return '<div class="image-credit"><span>'+esc(c.imageLabel)+' · '+esc(c.imageDate)+'</span><a href="'+esc(c.image)+'" target="_blank" rel="noopener">查看大图 ↗</a><a href="'+esc(c.imageSource)+'" target="_blank" rel="noopener noreferrer">图片来源 ↗</a></div>'+(c.imageNote?'<p class="image-note">'+esc(c.imageNote)+'</p>':''); }
  function saveButton(c,detail=false) { return `<button class="${detail?'secondary':'save-card'}" data-save="${c.id}" aria-pressed="${saved.has(c.id)}" aria-label="${saved.has(c.id)?'取消收藏':'收藏'} ${esc(c.name)}">${saved.has(c.id)?'★':'☆'}${detail?' '+(saved.has(c.id)?'已收藏':'收藏案例'):''}</button>`; }
  function render() {
    const query=$('#search').value.trim().toLowerCase();
    visible=cases.filter(c=>(category==='all'||c.cat===category)&&(!savedOnly||saved.has(c.id))&&(!$('#picks').checked||c.pick)&&`${c.name} ${c.kind} ${c.brief} ${c.mechanism}`.toLowerCase().includes(query));
    $('#case-grid').innerHTML=visible.map(c=>`<article class="case-card"><button class="card-open" data-case="${c.id}" aria-label="查看 ${esc(c.name)}"><div>${art(c)}</div><div class="card-info"><div class="card-meta"><span>${names[c.cat]}</span>${c.pick?'<span class="recommended">优先参考 ↗</span>':''}</div><h3>${esc(c.name)}</h3><p>${esc(c.brief)}</p><div class="card-foot"><span>${c.status.startsWith('A')?'局部操作实测':c.status.startsWith('C')?'历史案例':'官方资料核对'}</span><span>探索 →</span></div></div></button>${saveButton(c)}</article>`).join('');
    $('#results-count').textContent=`${savedOnly?'收藏夹 · ':''}${visible.length} 个案例`;
    $('#empty').hidden=visible.length>0; $('#saved-count').textContent=saved.size;
    $('#saved-toggle').setAttribute('aria-pressed',String(savedOnly));
  }
  function toggleSave(id) {
    saved.has(id)?saved.delete(id):saved.add(id);
    try { localStorage.setItem('sg-atlas-saved',JSON.stringify([...saved])); } catch (_) { toast('当前浏览器无法持久保存，收藏仍可导出。'); }
    render(); if($('#case-dialog').open) detail(currentId);
  }
  function detail(id) {
    const c=cases.find(c=>c.id===id); currentId=id;
    $('#detail-index').textContent=`CASE ${String(id).padStart(2,'0')} / ${cases.length} · ${names[c.cat]}`;
    const demo={config:'rules',compare:'compare',detail:'material',ar:'assembly',creative:'assembly'}[c.cat];
    $('#detail-content').innerHTML=`<div class="detail-hero">${art(c)}</div><div class="detail-body">${imageCredit(c)}<p class="eyebrow">${esc(c.kind)}</p><h2 id="detail-title">${esc(c.name)}</h2><p class="lead">${esc(c.brief)}</p><div class="detail-actions"><a class="primary" href="${esc(c.links[0][1])}" target="_blank" rel="noopener noreferrer">打开官方案例 ↗</a>${saveButton(c,true)}<button class="secondary" data-jump="${demo}">体验相关机制 ↓</button></div><h3>怎么交互</h3><p>${esc(c.mechanism)}</p><h3>SUPERGEAR 可以借鉴什么</h3><p>${esc(c.value)}</p><details><summary>实现前提与核对范围</summary><p>${esc(c.cost)}</p><p><strong>${esc(c.status)}</strong> · ${esc(c.imageDate||'2026.10.14')}</p><p>A 表示仅完成文中列明的局部操作；B 依据官方页面或制作方说明；C 为历史参考，不代表当前仍能使用完整体验。</p></details><div class="detail-sources"><span>来源</span>${c.links.map(([label,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`).join('')}</div></div>`;
    $('#case-dialog').scrollTop=0;
  }
  document.addEventListener('click',e=>{
    const save=e.target.closest('[data-save]'); if(save) { toggleSave(Number(save.dataset.save)); return; }
    const card=e.target.closest('[data-case]'); if(card) { detail(Number(card.dataset.case)); $('#case-dialog').showModal(); return; }
    const jump=e.target.closest('[data-jump]'); if(jump) { $('#case-dialog').close(); setDemo(jump.dataset.jump); $('#lab').scrollIntoView({behavior:'smooth'}); $(`#tab-${jump.dataset.jump}`).focus({preventScroll:true}); }
  });
  $('#close-dialog').onclick=()=>$('#case-dialog').close();
  $('#case-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget && (e.clientX<e.currentTarget.getBoundingClientRect().left||e.clientX>e.currentTarget.getBoundingClientRect().right||e.clientY<e.currentTarget.getBoundingClientRect().top||e.clientY>e.currentTarget.getBoundingClientRect().bottom))e.currentTarget.close();});
  function nextCase(delta) { const list=visible.some(c=>c.id===currentId)?visible:cases; detail(list[(list.findIndex(c=>c.id===currentId)+delta+list.length)%list.length].id); }
  $('#prev-case').onclick=()=>nextCase(-1); $('#next-case').onclick=()=>nextCase(1);
  $$('[data-filter]').forEach(b=>b.onclick=()=>{category=b.dataset.filter; $$('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render();});
  $('#search').addEventListener('input',render); $('#picks').onchange=render;
  $('#saved-toggle').onclick=()=>{savedOnly=!savedOnly;render();$('#explore').scrollIntoView({behavior:'smooth'});};
  $('#clear-filters').onclick=()=>{category='all'; savedOnly=false; $('#search').value='';$('#picks').checked=false;$$('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter==='all');b.setAttribute('aria-pressed',String(b.dataset.filter==='all'));});render();};
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!$('#case-dialog').open&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();$('#search').focus();}});
  $('#export-saved').onclick=()=>{
    if(!saved.size){toast('先点击案例卡片上的 ☆ 收藏感兴趣的案例。');return;}
    const text='SUPERGEAR 交互灵感收藏\n调研日期：2026.10.14\n\n'+cases.filter(c=>saved.has(c.id)).map(c=>`${c.name}\n${c.brief}\n${c.status}\n${c.links.map(([l,u])=>`${l}：${u}`).join('\n')}`).join('\n\n');
    const url=URL.createObjectURL(new Blob(['\ufeff'+text],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='SUPERGEAR-我的交互收藏.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('已导出收藏清单。');
  };
  ['hero','lab'].forEach(prefix=>{const input=$(`#${prefix}-range`);input.oninput=()=>input.closest('.compare-canvas').style.setProperty('--split',input.value+'%');});
  let view='side', previousA='CVO', previousB='DB';
  function updateComparison(changed) {
    const a=$('#model-a'),b=$('#model-b');if(a.value===b.value){if(changed==='a')b.value=previousA;else a.value=previousB;}
    previousA=a.value;previousB=b.value;
    ['a','b'].forEach(key=>{const model=$(`#model-${key}`).value;const img=$(`#compare-${key}`);img.src=`assets/${model}${view==='front'?'-front':''}.webp`;img.alt=`${model} ${view==='front'?'正':'侧'}视图`;$(`#tag-${key}`).textContent=model;});
  }
  $('#model-a').onchange=()=>updateComparison('a');$('#model-b').onchange=()=>updateComparison('b');
  $$('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;$$('[data-view]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});updateComparison();});
  let playTimer, playing=false;
  function stopPlay() { clearTimeout(playTimer);playing=false;$('#assembly-play').textContent='播放三个步骤 ↗'; }
  function setDemo(name) { stopPlay();$$('[data-demo]').forEach(b=>{const active=b.dataset.demo===name;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});$$('.demo-panel').forEach(p=>p.hidden=p.id!==`panel-${name}`); }
  $$('[data-demo]').forEach((b,i,arr)=>{b.onclick=()=>setDemo(b.dataset.demo);b.onkeydown=e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?arr.length-1:(i+(e.key==='ArrowRight'?1:-1)+arr.length)%arr.length;setDemo(arr[j].dataset.demo);arr[j].focus();}};});
  $('#light-range').oninput=e=>$('#carbon-sample').style.setProperty('--light',e.target.value+'%');
  $$('[data-finish]').forEach(b=>b.onclick=()=>{$('#carbon-sample').className='carbon-sample '+b.dataset.finish;$$('[data-finish]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});});
  function setStep(step) { $$('[data-step]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.step)===step);b.setAttribute('aria-pressed',String(Number(b.dataset.step)===step));});$('#assembly-svg .fender-part').style.transform=`translateY(${step===0?-60:0}px)`;$('#assembly-svg .bolt-part').style.transform=`translate(${step===2?0:65}px,${step===0?-55:0}px)`;$('#step-copy').textContent=['先看各部件之间的关系。','把挡泥板移至安装位置，观察部件关系。','紧固件归位，查看整体装配关系。'][step]; }
  $$('[data-step]').forEach(b=>b.onclick=()=>{stopPlay();setStep(Number(b.dataset.step));});
  $('#assembly-play').onclick=()=>{if(playing){stopPlay();return;}playing=true;$('#assembly-play').textContent='停止播放 ■';setStep(0);playTimer=setTimeout(()=>{setStep(1);playTimer=setTimeout(()=>{setStep(2);stopPlay();},1700);},1700);};
  function rules() { const frame=$('#rule-frame').value,mount=$('#rule-mount').value;const required=[['a','standard'],['a','special'],['b','standard'],['b','special']];$('#rules-result').innerHTML=required.map(([f,m],i)=>{const yes=frame===f&&mount===m;return `<div class="rule-card ${yes?'':'off'}"><strong>示例方案 0${i+1}</strong><span>${yes?'✓ 条件匹配':frame!==f?'车架不匹配':'接口不匹配'}</span></div>`;}).join(''); }
  $('#rule-frame').onchange=rules;$('#rule-mount').onchange=rules;
  const ideas=[
    [1,'同位切换','在固定构图中切换 ST、CB、CVO、DB，让眼睛直接捕捉轮廓变化。前提：同一视角与统一比例。'],
    [1,'侧视 / 正视联动','切换观察方向时保留当前款式和对比对象。直接使用现有 8 张图。'],
    [1,'双款并排比较','沿用已确认的最多两款规则；选一款看单图，选两款进入同尺度并排视图。'],
    [1,'拖动分割线','将两张图按同一坐标叠放，拖动显露不同区域。先用轮轴位置检查图像是否对齐。'],
    [1,'局部放大','聚焦边缘、碳纤维纹理与安装位置。保留统一缩放倍率，避免制造大小差异。'],
    [1,'对比时保留状态','切换视角或款式后保留缩放和观察区域，减少反复操作。'],
    [1,'轻量过渡','在同位图片间使用短暂淡入，支持减少动态效果的系统偏好。用预加载避免闪白。'],
    [1,'收藏候选方案','保存一至两款候选，下次继续比较。先从本地保存做起，再接账号。'],
    [1,'移动端手势比较','保持足够大的触控范围，避免拖动控件与页面滚动互相抢操作；提供按钮替代。'],
    [1,'统一差异摘要','将已确认的造型特点按统一维度展示。真实尺寸与重量需产品资料支持。'],
    [2,'我的车型','先选择车型、年份、轮径和安装条件，再显示适配产品。需经确认的适配数据库。'],
    [2,'可恢复的配置编号','让客户与客服能继续查看同一套选择。正式方案需服务端保存及版本管理。'],
    [2,'配件组合方案','以真实可售组合为起点，再允许微调。需确认各配件之间的兼容关系。'],
    [2,'选型接入商品购买','把最终选择映射到真实商品和变体。比较两个款式与购买两件商品要明确区分。'],
    [3,'连续 360° 观察','允许围绕产品拖动观察。需多角度序列或优化后的 3D 模型，现有双视图不足以覆盖。'],
    [3,'真实材质观察','改变观察角度和灯光，比较真实表面处理。需纹理、法线、粗糙度贴图与材质校验。'],
    [3,'分件与装配演示','将结构拆开，再由用户逐步归位。需分件模型、安装关系与工程确认。'],
    [3,'车辆照片试装','把产品预览叠加到用户车辆照片。需处理透视、遮挡和尺度；外观预览不代表适配。'],
    [2,'售后与升级入口','保存已购型号，后续展示兼容配件、安装资料和升级选项。需产品版本和订单映射。'],
    [3,'交互式品牌车库','用三维场景承载产品故事、工艺与组合展示。保留直接选型入口，允许跳过场景。']
  ];
  function renderIdeas(phase) { $('#ideas').innerHTML=ideas.map((item,i)=>({item,i})).filter(x=>x.item[0]===phase).map(({item,i})=>`<details><summary><span>${String(i+1).padStart(2,'0')}</span>${item[1]}<b>+</b></summary><p>${item[2]}</p></details>`).join(''); }
  $$('[data-phase]').forEach(b=>b.onclick=()=>{$$('[data-phase]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});renderIdeas(Number(b.dataset.phase));});
  render();rules();setStep(0);renderIdeas(1);
})();
