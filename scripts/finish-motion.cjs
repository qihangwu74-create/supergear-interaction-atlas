const fs=require('fs'),p=require('path'),root=p.resolve(__dirname,'..'),dist=p.join(root,'dist');
let s=fs.readFileSync(p.join(dist,'library.js'),'utf8');
s=s.replace("+' · 模板实拍", "+' · '+esc(e.imageLabel||'模板实拍')+'");
if(s.includes("if(e.edition==='motion-lab')$('#detail-instructions').insertAdjacentHTML")){
 s=s.replace("if(e.edition==='motion-lab')$('#detail-instructions').insertAdjacentHTML('beforeend',","if(e.edition==='motion-lab'){$('#detail-instructions a').href='motion/INTEGRATION.txt';$('#detail-instructions').insertAdjacentHTML('beforeend',");
 s=s.replace("不属于上一轮 60 套审计。</p>');","不属于上一轮 60 套审计。</p>');}");
}
fs.writeFileSync(p.join(dist,'library.js'),s);
