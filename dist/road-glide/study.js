const tasks=[
 ['定位','请找到边箱，并说明它相对于座椅和后轮的位置。','观察：能独立定位，并用自己的话描述位置关系。'],
 ['理解展开','把尾部展开，再恢复原位；说明虚线表达什么。','观察：知道虚线联系原位与现位，不把演示方向理解成真实维修步骤。'],
 ['比较轮廓','在相同视角下比较保留与隐藏边箱，说出哪里发生变化。','观察：识别变化来自边箱显示，知道其他配置未变化。'],
 ['恢复观察','自由旋转到一个角度，保存当前位置；改变视角，再恢复。','观察：恢复了镜头与章节，并能找到保存的观察记录。']
];
const key='atlas-study-luggage-v1',$=s=>document.querySelector(s),blank=()=>({format:key,createdAt:new Date().toISOString(),participant:'',device:'',prototype:'industrial-narrative-v2',tasks:tasks.map(([name])=>({name,result:'unrecorded',startedAt:null,elapsedSeconds:null,note:''}))});
let data=blank();try{const old=JSON.parse(localStorage.getItem(key)||'null');if(old?.format===key&&old.tasks?.length===4)data=old;}catch{}
function persist(){try{localStorage.setItem(key,JSON.stringify(data));$('#save-status').textContent='已保存到此浏览器 · 记录不会上传到服务器';}catch{$('#save-status').textContent='本地存储不可用，请及时导出 JSON。';}summary();}
function summary(){const recorded=data.tasks.filter(t=>t.result!=='unrecorded');$('#summary').textContent=`已记录 ${recorded.length} / 4 项；独立完成 ${recorded.filter(t=>t.result==='independent').length}；需要帮助 ${recorded.filter(t=>t.result==='assisted').length}；未完成 ${recorded.filter(t=>t.result==='failed').length}。\n这是观察记录，不是自动理解评分。`;}
function draw(){
 $('#participant').value=data.participant;$('#device').value=data.device;$('#tasks').replaceChildren();
 tasks.forEach(([name,prompt,basis],i)=>{const t=data.tasks[i],section=document.createElement('section');section.className='task';section.innerHTML=`<p class="eyebrow">TASK 0${i+1} / ${name}</p><h2>${prompt}</h2><p>${basis}</p><div class="row"><button class="start">开始计时</button><button class="finish">结束计时</button><output class="time"></output><label>任务结果 <select class="result"><option value="unrecorded">未记录</option><option value="independent">独立完成</option><option value="assisted">需要帮助</option><option value="failed">未完成</option></select></label></div><label>观察与原话<textarea maxlength="5000" placeholder="哪里停住了？是否误解？记录实际发生的行为，不替参与者解释。"></textarea></label>`;
 section.querySelector('.result').value=t.result;section.querySelector('textarea').value=t.note;
 const time=()=>{section.querySelector('.time').textContent=t.startedAt?'计时中…':t.elapsedSeconds===null?'尚未计时':t.elapsedSeconds+' 秒';section.querySelector('.start').disabled=!!t.startedAt;section.querySelector('.finish').disabled=!t.startedAt;};time();
 section.querySelector('.start').onclick=()=>{t.startedAt=Date.now();t.elapsedSeconds=null;time();persist();};section.querySelector('.finish').onclick=()=>{if(!t.startedAt)return;t.elapsedSeconds=Math.round((Date.now()-t.startedAt)/1000);t.startedAt=null;time();persist();};
 section.querySelector('.result').onchange=e=>{t.result=e.target.value;persist();};section.querySelector('textarea').oninput=e=>{t.note=e.target.value;persist();};$('#tasks').appendChild(section);
 });summary();listArchives();
}
for(const k of ['participant','device'])$('#'+k).oninput=e=>{data[k]=e.target.value;persist();};
$('#export-study').onclick=()=>{const u=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download='atlas-observation-'+data.createdAt.slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
$('#new-study').onclick=()=>{const oldKey=key+'-archive-'+Date.now();try{localStorage.setItem(oldKey,JSON.stringify(data));data=blank();persist();draw();$('#save-status').textContent='已建立空白记录。上一份保留在浏览器存储中；建议另开前先导出。';}catch{$('#save-status').textContent='无法归档上一份，请先导出后再继续。';}};
function listArchives(){const menu=$('#archives');menu.replaceChildren(new Option('选择一份记录',''));try{Object.keys(localStorage).filter(k=>k.startsWith(key+'-archive-')).sort().reverse().forEach(k=>{const saved=JSON.parse(localStorage.getItem(k));menu.appendChild(new Option((saved.participant||'未填写代号')+' · '+saved.createdAt,k));});}catch{}}
$('#restore-study').onclick=()=>{try{const selected=$('#archives').value;if(!selected)return;const old=JSON.parse(localStorage.getItem(selected));if(old?.format!==key||old.tasks?.length!==4)throw Error('记录格式不正确');localStorage.setItem(key+'-archive-'+Date.now(),JSON.stringify(data));data=old;persist();draw();}catch(e){$('#save-status').textContent=e.message;}};
draw();
