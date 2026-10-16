const fs=require('fs'),p=require('path'),vm=require('vm');
const root=process.env.ATLAS_ROOT||p.resolve(__dirname,'..'),dist=p.join(root,'dist');
const w={ATLAS_TEMPLATES:[]},ctx=vm.createContext({window:w});for(const f of ['library-data.js','narrative-data.js','three-data.js','film-data.js','remake-data.js','story-plus-data.js'])vm.runInContext(fs.readFileSync(p.join(dist,f),'utf8'),ctx);
const entries=[...w.ATLAS_TEMPLATES.map(x=>({...x,id:'t-'+x.id,file:(fs.existsSync(p.join(dist,'templates',x.id+'.html'))?'templates/':'narratives/')+x.id+'.html'})),...w.ATLAS_THREE,...w.ATLAS_REMAKES];
const sources=[
 ['motion','研究指南','NN/g · The Role of Animation and Motion in UX','https://www.nngroup.com/articles/animation-purpose-ux/','动效可帮助表达状态和空间关系；需要明确用途，不能用装饰代替信息。'],
 ['compare','电商可用性研究','Baymard · Product comparison','https://baymard.com/research-articles/provide-comparison-features','规格驱动的购买需要可并排核对的信息。外观变化演示不能单独完成选型。'],
 ['apple','真实产品入口','Apple · Compare Mac models','https://www.apple.com/mac/compare/','真实比较页同时组织型号、价格、外观和规格。这支持把属性比较与图像展示分开设计。仅核对公开页面内容。'],
 ['validation','服务设计指南','GOV.UK · Recover from validation errors','https://design-system.service.gov.uk/patterns/validation/','错误需说明原因和修复方式，保留输入；服务端仍需验证。此处借鉴恢复路径，不把其全部实现规则视为通用强制要求。'],
 ['drag','可访问性标准说明 · AA','WCAG 2.2 · 2.5.7 Dragging Movements','https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html','非必要拖动应有不依赖拖动的单指针替代。仅添加键盘操作并不足以满足这一条。'],
 ['reduce','可访问性标准说明 · AAA','WCAG 2.2 · 2.3.3 Animation from Interactions','https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html','可关闭非必要交互动效属于 AAA 条款；本库将减少动态作为设计质量目标，不误称为 AA 的这一项要求。'],
 ['pause','可访问性标准说明 · A','WCAG 2.2 · 2.2.2 Pause, Stop, Hide','https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html','满足自动开始、超过五秒并与其他内容同时呈现等条件的运动内容，需要暂停、停止或隐藏机制。'],
 ['dialog','组件交互指南','WAI-ARIA APG · Modal dialog','https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/','对话框需要管理进入、退出和返回焦点。APG 是实现指南，采用模式不等于整站认证。'],
 ['camera','官方可运行示例','Google model-viewer · Staging & camera control','https://modelviewer.dev/examples/stagingandcameras/','官方示例提供观察、目标点、滚动镜头及重新居中方法；镜头操作应允许用户恢复方向。'],
 ['job','真实招聘正文','Emergent Labs · Motion Designer','https://job-boards.greenhouse.io/emergentlabsinc/jobs/4438233009','正文要求解释复杂工作流、微交互和加载状态，并与研发交付；五年以上经验、班加罗尔现场办公。代码和三维列为加分项。页面可读不等于名额仍有效。']
].map(([id,kind,title,url,note])=>({id,kind,title,url,note,checked:'2026-10-16'}));
const families=[
 ['compare','比较差异','选择更合适的方案',['compare','apple'],'需补真实属性、单位、价格和适配约束；视觉对齐只能减少外观记忆负担。','给定两个方案和一条真实约束，用户能够指出差异并解释选择。'],
 ['configure','选择配置','让选择与结果保持一致',['apple','compare'],'需补有效组合、缺货、价格变化与可恢复配置；不能冒充订单系统。','选择、修改、返回后，结果与全部输入一致；无效组合有解释。'],
 ['navigate','寻找与定位','找到内容并回到原位置',['dialog','motion'],'需补真实信息架构、空状态和返回位置测试；小样本列表不代表大数据检索性能。','从入口找到指定内容，退出详情回到原位置，键盘也能完成。'],
 ['flow','分步完成任务','让输入逐步形成可检查的结果',['validation','job'],'需补服务端校验、重复提交和中断恢复；本地成功文案不是持久化成功。','无效输入得到可修复错误；返回保留输入；结果可追溯且只提交一次。'],
 ['recovery','反馈与恢复','知道发生了什么并能纠正',['validation','dialog'],'需补真实异步错误、重试、持久化和冲突；定时器不能证明后端成功。','触发操作、取消或失败后有明确状态；恢复不丢数据、不重复副作用。'],
 ['explain','结构与因果解释','从证据理解对象如何工作',['motion','job'],'需替换虚构素材并验证理解；流程演示不构成因果或工程正确性的证明。','看完后能用自己的话解释关键关系，并在去掉动画后仍获取结论。'],
 ['story','有结果的叙事','沿线索、选择和回看理解故事',['motion','reduce','job'],'需补真实内容、阅读方式和理解测试；故事走完不代表读懂或转化提升。','完成一条路径后说出起因与后果；回看和改变选择时，状态与位置一致。'],
 ['space','空间操作与观察','理解位置、方向并恢复视角',['camera','drag'],'需补真实模型、比例、碰撞和触屏实测；几何示意不能验证装配或空间适配。','观察或移动指定对象，换一种输入方式重复操作，再回到初始状态。'],
 ['material','材质与光照理解','区分表面参数和环境变化',['camera','motion'],'需校准资产、光照与显示环境；屏幕示意不能作为实物颜色或材质承诺。','固定其他条件改变一个参数，能区分几何、材质和光照带来的变化。'],
 ['visual','视觉机制研究','探索形变、节奏与注意力',['motion','reduce'],'属于表达研究；缺少具体用户任务时，不计作独立业务问题已解决。','为效果写明用途；移除效果后比较任务是否仍成立，检查减少动态替代。']
].map(([id,title,goal,evidence,gap,acceptance])=>({id,title,goal,evidence,gap,acceptance}));
// Each template has exactly one primary task family; counts never double-count a template.
const rows=`t-compare|compare|机制|只能比较示意外观，缺少属性表|用同尺寸前后图片核对三个变化区域
t-variants|configure|机制|只有配色，没有规格与库存；已更正标题|连续选择三种颜色，核对当前标签与画面一致
t-accordion|navigate|机制|原生 details 允许多项同时展开；已改正单项宣传|展开两项再收起，确认内容不丢失
t-tabs|navigate|机制|固定三组内容，不含 URL 状态|用左右键及 Home/End 核对焦点和面板
t-pricing|compare|机制|模拟价格，无税费或真实结算|核对月费与年付总价一致，切换后仍显示计费周期
t-stepper|flow|流程|只在本地确认，未接服务端错误和重复提交|留空提交，再输入、返回、修改并检查摘要
t-filters|navigate|机制|四条静态数据，无异步和分页|搜索无结果后清空条件，结果应恢复
t-command|navigate|机制|命令只显示演示反馈，没有真实执行|快捷键打开、搜索、执行、Escape 关闭并检查返回焦点
t-undo|recovery|机制|仅本地隐藏，没有服务端撤销窗口|删除后撤销，条目及键盘焦点回到可操作位置
t-hotspots|explain|机制|示意热点，无真实部件数据|逐个选热点，确认高亮与说明相符
t-gallery|navigate|机制|示意几何，不含真实图片失败处理|前后循环与方向键操作，核对编号和内容
t-reorder|space|机制|三条本地排序，没有保存接口|首尾条目边界不可越界，移动后焦点跟随条目
t-reveal|visual|研究|只控制出现，不构成完整故事|减少动态开启后内容仍可读，反向阅读不隐藏已读内容
t-tilt|visual|研究|倾斜反馈不提供任务结果|关闭动效时信息与操作不减少
t-progress|recovery|机制|定时器模拟完成，无真实失败分支|中途取消、重启、完成，检查没有重复计时
t-drawer|configure|机制|只计数，无商品身份、金额和真实购物车|添加、移除至空，关闭后焦点回到入口
t-causal-flow|explain|流程|12 秒变 7 秒是设定算例，不是实测收益|逐步核对 4+8 与 4+3，回看时数值还原
t-branch-journey|flow|流程|两条预设规则，非真实推荐系统|不选择时不给有效建议；改变选择后结果同步
t-evidence-story|explain|流程|40/65/80 是虚构样例，非研究结论|说明差异不等于因果，并标明真实数据来源
t-reversible-action|recovery|流程|演示归档与撤销，未接持久化|归档、回看、撤销，结果始终反映实际状态
t-context-zoom|space|流程|二维变换，非真实空间检索|聚焦 A、B 后回全图，用户仍能指出相对位置
t-guided-reveal|compare|流程|变化解释为示意，无真实比较证据|滑块与章节来回切换，不出现说明和画面冲突
t-assembly-logic|explain|流程|抽象输入处理输出，非工程装配|解释连接顺序与每一部分职责
t-scroll-evidence|story|流程|原章节按 260px 推算，长文会错位；已改用实际位置|替换长文并缩窄窗口，章节按钮与阅读位置一致
s-orbit|space|机制|只有几何观察，无法证明产品适配|正侧俯视与复位均能定位同一对象
s-material|material|机制|程序化材质与环境，不是实物还原|固定光照后切换粗糙度和金属度并解释差异
s-explode|explain|机制|预设分离方向，无装配约束|展开至两端再合拢，部件回到同一位置
s-clipping|explain|机制|剖切没有实体封口，不适合准确截面测量|移动截面，说明可见内部与封口限制
s-hotspots|explain|机制|部分部件可经滑块选择，需补完整语义清单|鼠标和非拖动路径分别定位目标部件
s-configurator|configure|机制|椅子比例和扶手示意，无有效组合规则|修改比例与扶手，结果符合输入且不误称真实尺寸
s-morph|visual|研究|几何插值，没有业务结果|两端形态稳定，中断后可继续控制
s-particles|visual|研究|粒子聚合研究，非完整信息叙事|暂停和参数两端可读；减少动态时有静态替代
s-instancing|visual|研究|阵列波动，不能充当性能基准|在目标设备记录实际帧时间，不把实例数量当性能结论
s-path|space|机制|预设路径，非路线规划|起终点和循环连接可解释，不误称导航计算
s-room|space|机制|展廊示意，缺少真实内容和到达任务|定位指定展品并恢复总览
s-scroll|story|流程|镜头与结构联动，但内容仅示意|向前和反向阅读，对应结构状态应一致
s-projection|space|机制|透视与正交比较，非测量工具|解释投影差别，避免透视下比较绝对尺寸
s-lighting|material|机制|环绕灯光，没有实物校准|固定表面并改变光位，说明亮度变化来源
s-turntable|space|机制|循环展示，无具体视角任务|播放可暂停，手动角度可控，隐藏页面不继续渲染
s-measure|space|机制|示意单位 u 与预设包围盒，非实物尺寸|不得将示意数字用于装配判断；接真实模型后重算边界
s-drag|space|机制|已补物体选择、两轴按钮和完整位置复位；仍无碰撞撤销|选择三个对象各沿 X/Z 移动，越界夹紧，复位全部恢复
s-wave|visual|研究|程序化波浪，不是流体仿真|明确用途，检查暂停、静态版及低性能设备表现
s-film-anatomy|explain|流程|镜头脚本可借鉴，结构和职责仍是示意|按整体、接缝、拆解、整体解释部件关系
s-film-surface|material|流程|光照和材质都可变化，需避免归因混淆|单独固定光照或粗糙度，检查观众判断依据
s-film-gallery|story|流程|导览路径预设，不等于用户能找到目标|按展品任务进入、回看、返回总览
s-film-fit|configure|流程|配置镜头叙事不能判断真实占地与安装|用真实尺寸验证空间约束，再确认选择
s-film-route|story|流程|摄像机跟随预设路线，不含实时导航|说出路线起点、转折和终点，允许跳章回看
s-film-lens|explain|流程|展示镜头职责，无理解度实测|对每个镜头说明新增信息，删掉无信息增量镜头
m-configure|configure|流程|示意配置可调用，缺 SKU/价格/库存适配|修改配置、读取状态、重置，真实业务值另接入
m-anatomy|explain|流程|原创结构示意，不能当维修操作说明|选择部件，解释职责，再恢复整体
m-voyage|story|流程|虚构旅程，无真实业务目标|说明三段旅程的因果，返回时仍知道当前位置
m-garden|navigate|流程|空间入口可探索，缺完整文本检索路径|找到指定节点，退出详情后恢复原镜头
m-particles|visual|研究|聚合可承载品牌形态，但未证明传播效果|给出品牌信息目的及静态可读版本
m-comic|story|流程|风浪、倾斜与留白是阅读节奏，需检验正文可读性|读完复述转折，减少动态后仍能完成阅读
m-quiz|flow|流程|预设题目与反馈，不是真实能力测评|回答、改选、回看后，结果与已答记录一致
m-yearbook|story|流程|四季时间线是框架，项目内容仍需替换|打开项目再关闭，回原季节和阅读位置
m-beacon|story|流程|线索和路线虚构，不是搜救或真实决策支持|不同线索下选择分支，结局能追溯输入
m-seed|story|流程|条件生长是叙事模型，非真实生态模拟|改变条件解释结果，再重置复查初始状态
m-parallel|story|流程|双视角故事不代表真实利益相关者研究|分别读两侧，用证据说明不同立场，回看位置不丢
m-archive|story|流程|横向档案需继续验证窄屏及离屏键盘焦点|打开档案返回原章节，Tab 不进入不可见内容`;
const mapping=new Map(rows.split('\n').map(line=>{const [id,family,level,gap,test]=line.split('|');return[id,{family,level,gap,test}];}));
if(entries.length!==60||mapping.size!==60)throw Error('Inventory count drift');
let scriptCount=0;const parseErrors=[],missingRefs=[];
const items=entries.map(e=>{const m=mapping.get(e.id);if(!m)throw Error('Unmapped '+e.id);const file=p.join(dist,e.file);if(!fs.existsSync(file))throw Error('Missing template '+e.file);const html=fs.readFileSync(file,'utf8');
 for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)){if(match[1].trim()){scriptCount++;try{new vm.Script(match[1],{filename:e.file});}catch(err){parseErrors.push({file:e.file,message:err.message});}}}
 const refs=[...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(x=>x[1]).filter(x=>!/^([a-z]+:|\/\/|#)/i.test(x));for(const ref of refs){const dest=p.resolve(p.dirname(file),decodeURIComponent(ref.split(/[?#]/)[0]));if(!fs.existsSync(dest))missingRefs.push({file:e.file,ref});}
 return {id:e.id,title:e.title,file:e.file,...m,evidence:families.find(x=>x.id===m.family).evidence,bytes:fs.statSync(file).size,sourceCheck:'入口存在 / 内联脚本可解析 / 本地静态引用检查',browserCheck:'本轮待复测',effectiveness:'未做真实用户效果测试'};});
for(const f of ['three-engine.js','library.js','library-data.js','narrative-data.js','three-data.js','film-data.js','remake-data.js','story-plus-data.js']){scriptCount++;try{new vm.Script(fs.readFileSync(p.join(dist,f),'utf8'),{filename:f});}catch(err){parseErrors.push({file:f,message:err.message});}}
const report={version:1,date:'2026-10-16',scope:{runnable:60,references:34,resources:36,taskFamilies:9,expressionResearchFamilies:1,productionValidated:0,userEffectTests:0},method:'全量源码入口、脚本语法与静态引用检查；逐项任务映射属于设计审阅判断，不是用户测试。通用交互逻辑另做隔离测试。浏览器工具启动失败，本轮不声称浏览器、真机、读屏或性能验收通过。',marketLimit:'对照真实产品、公开研究、标准及招聘正文的目的性样本；不是市场普查，不计算市场覆盖率或求职成功率。',sources,families:families.map(f=>({...f,count:items.filter(x=>x.family===f.id).length})),items,checks:{scriptCount,parseErrors,missingRefs},fixes:[{id:'F1',priority:'P1',title:'三维拖放缺少完整非拖动替代',change:'增加物体选择、两轴滑块和四个方向按钮；指针与控件共用约束。',files:['three-engine.js','three-lab.css','three/drag.html']},{id:'F2',priority:'P1',title:'三维拖放复位未还原全部物体',change:'保存三个对象初始 X/Z；复位所有位置并同步选中项与控件。',files:['three-engine.js']},{id:'F3',priority:'P2',title:'滚动章节绑定固定 260px',change:'改为测量实际章节位置，兼容内容高度变化；仍需浏览器长文与窄屏复测。',files:['narrative-data.js','narratives/scroll-evidence.html']},{id:'F4',priority:'P2',title:'配色演示被称作规格切换',change:'更名为产品配色切换，删除功能范围误导。',files:['library-data.js','templates/variants.html']},{id:'F5',priority:'P2',title:'折叠面板文案与多开行为冲突',change:'改为按需展开问题，保留原生多开行为。',files:['library-data.js','templates/accordion.html']}],backlog:[{priority:'P1',title:'从外观比较补到选型任务',detail:'下一份真实项目应接属性表、尺寸单位、兼容关系和有效配置；当前图片与几何不支持购买或安装结论。',test:'给出真实约束，验证用户能选出合适方案并指出依据。'},{priority:'P1',title:'补异步失败与真实提交闭环',detail:'当前表单、加载和清单是本地演示；服务端校验、重试、幂等提交、库存冲突仍需业务接入。',test:'断网、失败、重试、重复提交后，核对数据和界面结果。'},{priority:'P1',title:'完成浏览器与真机验收',detail:'本轮浏览器启动失败。离屏焦点、减少动态、触屏、WebGL 失败以及长文断点均未完成本轮实测。',test:'桌面键盘、触屏、减少动态和无 WebGL 四条路径分别记录证据。'},{priority:'P2',title:'验证叙事是否让人理解',detail:'本库有完整叙事路径，但没有理解率、完成率或业务收益实测。以用户复述和真实任务结果判断。',test:'记录起因、行动、后果能否被复述；同时提供静态版本对照。'},{priority:'P2',title:'补真实资产制作与交付证据',detail:'程序化 WebGL 不能证明 C4D/Blender 建模、UV、渲染或品牌系统能力。已有招聘工作台保留了相应边界。',test:'保留自己的制作工程、分镜、组件规范、个人贡献与目标设备测量。'}]};
const linkFile=p.join(dist,'reference-link-check.json');if(fs.existsSync(linkFile)){const linkReport=JSON.parse(fs.readFileSync(linkFile,'utf8'));report.referenceCheck={file:'reference-link-check.json',total:linkReport.total,counts:linkReport.counts,method:linkReport.method};}
fs.mkdirSync(p.join(root,'audit'),{recursive:true});fs.writeFileSync(p.join(dist,'validation-data.js'),'window.ATLAS_VALIDATION='+JSON.stringify(report)+';\n');fs.writeFileSync(p.join(dist,'validation-report.json'),JSON.stringify(report,null,2));
fs.writeFileSync(p.join(root,'audit/inventory.json'),JSON.stringify(items,null,2));
console.log(JSON.stringify({templates:items.length,families:report.families.map(x=>({title:x.title,count:x.count})),levels:items.reduce((a,x)=>(a[x.level]=(a[x.level]||0)+1,a),{}),checks:report.checks},null,2));
if(parseErrors.length||missingRefs.length)process.exitCode=1;
