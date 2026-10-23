// Visual systems, not a manufacturer BOM or service disassembly sequence.
export const modes = [
 ['story','引导叙事','GUIDED STORY / LUGGAGE','从一个问题，到一个发现。','沿六个章节理解边箱与整车的关系。可以随时回看、自由观察或保存当前位置。','基于原模型的视觉观察路线；分组与展开方向不是制造商装配或维修流程。'],
 ['explode','分层爆炸','EXPLODE / UNDERSTAND THE WHOLE','把整体，展开成关系。','拖动进度，让车头、覆盖件、动力与轮组依次分离。点击部件可查看归属。','空间位移是展示编排，未校验真实拆卸路径或干涉。'],
 ['assembly','分步回装','ASSEMBLY / RETURN WITH CONTEXT','每一步，都回到它的位置。','从分离状态逐组回装。每一步都交代当前系统，最后回到完整车型。','这是结构认知顺序，不是维修手册或紧固顺序。'],
 ['section','动态剖切','SECTION / REVEAL THE INSIDE','移动切面，看见层次。','选择方向，拖动切面，观察模型已有的内部几何。','表面网格裁切，不补造实体截面；模型没有的内部件不会出现。'],
 ['xray','透明透视','X-RAY / LOOK THROUGH','让外层，轻轻退后。','降低覆盖件透明度，再选择一个内部系统。','只显示原模型已有结构；透明渲染可能有表面叠加。'],
 ['isolate','部件联动','ISOLATE / NAME WHAT YOU SEE','从名字，找到真实部件。','点击左侧清单或车上的部件；可隐藏其他系统，单独旋转查看。','清单来自模型分组，不代表采购 BOM 或完整零件数量。'],
 ['mechanism','机构运动','MOTION / FOLLOW THE AXIS','沿轴旋转，读懂运动。','拖动车轮角度，观察轮胎、轮毂和制动盘同步转动。','轴心按轮胎网格包围盒估计；不包含制动、传动与悬挂动力学。'],
 ['flow','原理路径','FLOW / MAKE A PATH VISIBLE','给看不见的路径，一个方向。','选择外部来流或动力关系，拖动进度追踪路径；也可播放。','路径与粒子为概念示意，不是 CFD、真实管线或工程仿真。'],
 ['config','配置探索','CONFIGURE / SEE THE CHANGE','改变一项，看清影响。','切换原模型中的边箱与风挡可见性，并探索车漆颜色。','隐藏件与配色是视觉概念方案，不等于可购买或适配的配置。'],
 ['measure','空间包络','ENVELOPE / CHECK THE SPACE','把体量，变成可读的边界。','查看整车或系统包围盒。可输入已知整车长度，将模型比例换算为毫米。','默认单位为模型单位；校准结果是网格包络估算，不是官方尺寸或安装间隙。'],
 ['compare','同步对比','COMPARE / HOLD THE VIEW','同一视角，比较不同选择。','左边保留原模型，右边切换概念配置；拖动任一侧，同步改变观察角度。','两侧共用模型与镜头参数；差异仅来自可见性与演示配色。'],
 ['inspect','检查叙事','INSPECT / ASK BEFORE CONCLUDING','从一个问题，走向观察。','选择观察任务，沿“整体—相关部件—局部—记录”四步完成查看。','这是外观与结构检查流程示例，不能诊断车辆故障。']
].map(([id,name,en,title,copy,limit])=>({id,name,en,title,copy,limit}));

export const groups = [
 {id:'front',name:'前脸与操控',en:'FRONT / CONTROL',offset:[0,.55,.85],order:0,pattern:'body_front|windshield|HL|handlebar|grips|levers|switch|mirrors|control_panel|display_meter|glass_meter|dinamics|text_',copy:'整流罩、灯组、风挡及操控区域建立前部体量。'},
 {id:'tank',name:'油箱与座椅',en:'TANK / SEAT',offset:[0,.85,0],order:1,pattern:'fuel_tank|^seat$',copy:'观察油箱、覆盖件与座椅的前后衔接。'},
 {id:'luggage',name:'边箱与尾部',en:'LUGGAGE / TAIL',offset:[0,.35,-.95],order:2,pattern:'cofra|tail|LicPlate|stop_signal|glass_red|reflector_rear|ribs_small_rear|reflector_small_rear|katafot_rear|fender_rear|fastening_rear',copy:'边箱与尾部件按现有模型归为一个视觉系统。'},
 {id:'frontwheel',name:'前轮与前叉',en:'FRONT WHEEL',offset:[0,-.05,.9],order:3,pattern:'front|traverse',copy:'轮胎、轮毂、制动与前叉在同一位置建立关系。'},
 {id:'rearwheel',name:'后轮与后悬',en:'REAR WHEEL',offset:[0,-.05,-.85],order:3,pattern:'rear|swingarm',copy:'观察后轮、后悬与相邻传动部件的布局。'},
 {id:'power',name:'动力与散热',en:'POWER / COOLING',offset:[.85,.12,0],order:4,pattern:'engine|radiator|filter|folter|muffler|spark|starter|head_engine|hose|belt|pulley',copy:'动力外壳、散热片、排气与传动相关外观件。'},
 {id:'frame',name:'车架与其他',en:'FRAME / REMAINDER',offset:[0,0,0],order:5,pattern:'.*',copy:'车架与未归入其他系统的部件保留为结构参照。'}
];
export const assemblyOrder=['rearwheel','frontwheel','power','luggage','tank','front'];
export const tasks=[
 {id:'front',name:'前部结构观察',steps:[['整车定位','先找到前部系统在整车中的位置。','all'],['轮组关系','查看前轮与前叉的相对布局。','frontwheel'],['前脸覆盖','查看整流罩与风挡的体量衔接。','front'],['记录观察','记录可见现象；需要维修判断时另查车型资料。','front']]},
 {id:'power',name:'动力区域观察',steps:[['整车定位','先建立动力区域的整体位置。','all'],['外部结构','查看模型已有的发动机与散热部件。','power'],['上方关系','查看油箱与座椅相对于动力区域的位置。','tank'],['记录观察','模型不能验证油路、温度、磨损或故障原因。','power']]},
 {id:'luggage',name:'尾部配置观察',steps:[['整车定位','观察尾部在整车中的体量。','all'],['尾部部件','查看边箱、尾灯与覆盖件的分组。','luggage'],['轮组关系','查看后轮和后悬附近的布局。','rearwheel'],['记录观察','网格显示不能代替承载、适配与碰撞校验。','luggage']]}
];
export function groupFor(name){return groups.find(g=>new RegExp(g.pattern,'i').test(name)).id;}
export const shellPattern=/body_front|windshield|fuel_tank|cofra|^seat$|fender_|^body$/i;
export const luggagePattern=/cofra/i;
export const screenPattern=/windshield/i;
