const fs=require('fs'),p=require('path'),root=p.resolve(__dirname,'..'),dist=p.join(root,'dist');
let h=fs.readFileSync(p.join(dist,'library.html'),'utf8');
if(!h.includes('motion-data.js'))h=h.replace('<script src="validation-data.js','<script src="motion-data.js?v=20261022"></script><script src="validation-data.js');
h=h.replace('60 套可下载模板','65 套可下载模板').replace('<b>60</b>可运行模板','<b>65</b>可运行模板').replace('STORY & EVIDENCE / 07','MOTION FIELD NOTES / 08');
if(!h.includes('data-type="motion"'))h=h.replace('<button data-type="storyplus"','<button data-type="motion" aria-pressed="false">新动效专题 <span>5</span></button><button data-type="storyplus"');
h=h.replace('案例与叙事模板 <span>12','案例与叙事模板 <span>17').replace('动效叙事 <span>28','动效叙事 <span>33');
if(!h.includes('id="motion-intro"'))h=h.replace('<section class="spatial-guide">','<section class="spatial-guide" id="motion-intro"><p class="eyebrow">NEW / 2026.10.22</p><h2>你做一个动作，画面讲清一个故事。</h2><p class="intro">新增 5 套可调用模板：材质巡光、品牌穿行、产品拆解、视线引导与人物重排。含 10 个可追溯来源、独立下载和 Vibe Coding 提示词。</p><a class="primary" href="motion-lab.html">打开新动效专题 ↗</a><p class="guide-note">3 套 WebGL + 2 套 HTML / SVG；原创示意内容。新增批次验证单独记录，上一轮审计仍为原 60 套。</p></section><section class="spatial-guide">');
h=h.replace('library.js?v=20261016','library.js?v=20261022');fs.writeFileSync(p.join(dist,'library.html'),h);
let js=fs.readFileSync(p.join(dist,'library.js'),'utf8');
js=js.replace("['discover','remake','storyplus','narrative','all']","['motion','discover','remake','storyplus','narrative','all']").replace(":'storyplus',category",":'motion',category");
js=js.replace("(type==='storyplus'?","(type==='motion'?e.edition==='motion-lab':type==='storyplus'?");
js=js.replace("esc(e.title)+' · 模板实拍'","esc(e.title)+' · '+esc(e.imageLabel||'模板实拍')");
if(!js.includes("if(e.edition==='motion-lab')"))js=js.replace('const audit=',`if(e.edition==='motion-lab')$('#detail-instructions').insertAdjacentHTML('beforeend','<h3>本套参考来源</h3><div class="case-sources">'+e.sourceLinks.map(([label,url])=>'<a href="'+esc(safeURL(url))+'" target="_blank" rel="noopener">'+esc(label)+' ↗</a>').join('')+'</div><p><a href="motion-lab.html">打开提示词、来源与整包下载 ↗</a></p><p class="small">新增于 2026-10-22；验证范围见专题记录，不属于上一轮 60 套审计。</p>');\n    const audit=`);
fs.writeFileSync(p.join(dist,'library.js'),js);
let readme=fs.readFileSync(p.join(root,'README.md'),'utf8');if(!readme.includes('2026-10-22 新动效专题'))readme+='\n\n## 2026-10-22 新动效专题\n\n入口 [dist/motion-lab.html](dist/motion-lab.html)。新增 5 套原创模板（3 套 WebGL、2 套 HTML/SVG），共 65 套可运行模板。材质巡光、点击入场的纵深穿行、运镜拆解、角色视线引导、人物画廊重排分别附触发说明、视觉变化、任务目的与可复制提示词。\n\n10 个来源均有原始链接、类型和 2026-10-22 核对范围。参考页面正文已核对，未冒充所有原站动效已实测。人物插画和示意几何为原创；未打包外站照片。新模板的 MIT 许可仅限 motion 新增原创内容，Three.js 许可保留。\n\n下载 [motion-kit.zip](dist/motion-kit.zip)；调用说明 [INTEGRATION.txt](dist/motion/INTEGRATION.txt)；验证记录 [checks.json](dist/motion/checks.json)。旧审计是 2026-10-16 的 60 套快照，本批另行记录。\n\n重建：`node scripts/build-motion-lab.cjs`，再运行 `node scripts/integrate-motion.cjs`。若重新运行旧素材库生成器，最后重新执行 integrate-motion 保留新增入口。\n';fs.writeFileSync(p.join(root,'README.md'),readme);console.log('Integrated 5 templates into existing collection.');

require('./finish-motion.cjs');
