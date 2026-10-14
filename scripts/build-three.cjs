const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
const rows=[
['orbit','自由观察与缩放','模型观察','数码 / 珠宝 / 工业','让用户从自己的角度观察体积与轮廓。','观察距离','拖动模型或使用方向键旋转，滑块控制远近。','入门','替换程序化模型为优化后的 GLB；保留视角重置与触控替代。','不要让旋转抢走整页滚动；提供明确的初始视角。'],
['material','金属与粗糙度实验','材质光照','家居 / 美妆 / 汽车','在同一灯光下比较颜色、粗糙度和金属感。','表面粗糙度','移动滑块改变粗糙度，再切换金属模式与颜色。','进阶','换成真实 PBR 贴图和校准过的环境光。','示例材质是视觉演示，不代表真实产品的物理测量。'],
['explode','可控爆炸拆解','结构讲解','工业 / 电子 / 教育','把看不见的层次展开，解释部件之间的关系。','拆解程度','拖动滑块展开各层，反向拖动重新组合。','进阶','给真实模型按部件命名，逐个设置拆解方向与距离。','装配关系需工程审核；不要把演示当成安装指导。'],
['clipping','动态剖切观察','结构讲解','建筑 / 设备 / 教学','移动一个平面，观察壳体内的构造。','剖切位置','移动滑块让剖切面穿过产品，旋转查看内部。','进阶','使用局部 clipping plane；需要封口时补充 stencil 或实体布尔。','这个示例没有剖面封口，也不是医疗或工程诊断工具。'],
['hotspots','点击部件与高亮','结构讲解','商品 / 展品 / 科普','从物体出发阅读信息，不必来回对应图例。','部件序号','点击三维表面选中部件；也可用滑块依次选择。','进阶','用射线拾取绑定产品部件、说明和可访问的按钮列表。','避免仅靠颜色表达选中，始终同步部件名称。'],
['configurator','模块化家具配置','产品配置','家具 / 空间 / 定制','配置改变立即反映到尺寸、颜色和部件。','宽深比例','调节宽深，切换颜色，启用或隐藏扶手。','进阶','替换示例比例为经过校验的尺寸选项和可组合规则。','参数化外观不等于可生产尺寸，需要业务约束。'],
['morph','球体与方体变形','动效叙事','品牌 / 艺术 / 概念','用连续形变表现状态转换和形态探索。','形态混合','拖动滑块，观察球体平滑变成立方体。','进阶','为真实模型准备相同拓扑的 morph targets。','形变适合表达故事，不适合伪装真实产品结构。'],
['particles','粒子形态重组','动效叙事','发布会 / 科技 / 片头','让点云在两种空间结构之间重新组织。','聚合形态','从球体点云过渡到环形，再播放循环。','进阶','将粒子目标采样到自己的文字或模型表面。','控制粒子数；给低性能设备保留静态封面。'],
['instancing','阵列与群体波动','程序化空间','数据 / 展览 / 科技','同一个模块，构成可变化的空间节奏。','波动相位','拖动相位或播放，观察 225 个实例的变化。','进阶','把柱高映射到真实数据；用实例化减少绘制调用。','如果表示数据，应说明坐标、数值和单位。'],
['path','沿曲线的空间运动','空间导航','运输 / 过程 / 导览','沿着路径解释移动过程，而不是突然跳转。','路径进度','拖动进度，观察物体沿闭合曲线运动。','进阶','替换 Catmull-Rom 控制点，并设计速度与停留节点。','运动路径是示意；真实路线需使用对应空间数据。'],
['room','三维展廊浏览','空间导航','艺术 / 作品集 / 房产','在空间中逐个观察展品，保留位置关系。','展廊位置','移动滑块横向浏览五个展品，也可拖动观察。','进阶','用真实场景替换程序展廊，加入展品信息和可跳转目录。','先保证用户能到达目标，再设计自由漫游。'],
['scroll','滚动驱动镜头叙事','动效叙事','品牌 / 新品 / 故事','滚动进度与镜头、结构展开保持一致。','叙事进度','在下方故事框内滚动，或用滑块推进三个阶段。','进阶','把局部滚动容器换成页面章节并设置镜头关键帧。','尊重减少动态偏好；核心信息不应只出现在动画中。'],
['projection','透视与正交比较','模型观察','工业 / 建筑 / 图解','同一物体，比较空间透视与无透视投影。','视场 / 正交倍率','切换正交投影，再用滑块比较视场与倍率。','入门','技术图解用正交，空间感呈现用透视；保持目标位置一致。','切换相机后避免把视觉大小变化误读为产品尺寸变化。'],
['lighting','交互式环绕布光','材质光照','摄影 / 产品 / 材料','改变灯光方向，观察轮廓、反射和阴影明暗。','主光方位','旋转主光方位，切换冷暖光，比较高光变化。','入门','用自己的灯位、色温和环境图建立摄影布光预览。','屏幕表现受显示器影响，不代表实物色准。'],
['turntable','可暂停产品转台','产品配置','电商 / 工业 / 展示','让产品按用户控制的节奏完成一圈展示。','转台角度','拖动角度，或点击播放后随时暂停。','入门','替换为自己的产品，默认静止，播放由用户启动。','不要把自动旋转设成唯一观察方式。'],
['measure','尺寸包围盒演示','结构讲解','家居 / 包装 / 空间','把模型范围与尺寸提示放在同一画面。','整体比例','移动滑块放大缩小，观察包围盒与示例单位。','入门','从模型包围盒读取尺寸，校验模型单位后再显示真实数值。','当前使用抽象单位 u，不是毫米，不可用于实际测量。'],
['drag','三维物体平面拖放','空间导航','布局 / 编辑器 / 教育','选中并移动物体，直接编排空间关系。','选中物体水平位置','拖动一个物体在地面平面上移动；滑块提供水平替代。','进阶','增加吸附、边界、撤销和碰撞约束后用于空间布局。','这是平面拖动；不包含刚体物理或碰撞检测。'],
['wave','程序化波浪表面','程序化空间','艺术 / 背景 / 材质','用顶点变化形成连续起伏的空间表面。','波浪相位','拖动相位或播放变化，切换线框观察网格。','进阶','将 CPU 顶点更新迁移到 shader，以支持更大规模网格。','视觉波浪不是流体求解；不要用于物理预测。']
];
const defs=rows.map((r,i)=>({id:'s-'+r[0],mode:r[0],title:r[1],cat:r[2],tags:r[3].split(' / '),brief:r[4],label:r[5],hint:r[6],steps:r[6],level:r[7],adapt:r[8],limit:r[9],type:'three',file:'three/'+r[0]+'.html',image:'assets/three-'+r[0]+'.webp',initial:r[0]==='explode'?35:r[0]==='clipping'?60:35,color:i%4===1?'#a7bff1':i%4===2?'#ebae8c':'#d8e866'}));
const sources=[
['clipping','Three.js · 交互剖切','结构讲解','https://threejs.org/examples/webgl_clipping.html','剖切平面揭示内部结构。','比较全局和局部裁切；进一步研究剖面封口。'],
['instances','Three.js · 动态实例阵列','程序化空间','https://threejs.org/examples/webgl_instancing_dynamic.html','大量相同几何体的动态组织。','适合模块化场景与数据柱阵；关注绘制调用和设备预算。'],
['morph','Three.js · Morph Targets','动效叙事','https://threejs.org/examples/webgl_morphtargets.html','用形态权重驱动连续过渡。','适合相同拓扑模型的形变，不是任意两模型自动融合。'],
['transmission','Three.js · 透射材质','材质光照','https://threejs.org/examples/webgl_materials_physical_transmission.html','透明材质中的光线表现。','适合玻璃类视觉研究；先评估移动端成本。'],
['picking','Three.js · 射线拾取','模型观察','https://threejs.org/examples/webgl_interactive_cubes.html','把指针位置映射到空间物体。','选择、高亮、热点与编辑器操作的基础机制。'],
['animation','Three.js · 骨骼动作混合','动效叙事','https://threejs.org/examples/webgl_animation_skinning_blending.html','多个角色动作之间过渡。','学习动画状态和权重；模型来源与授权见原页。'],
['bloom','Three.js · Bloom 后处理','材质光照','https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html','给高亮区域增加发光表现。','适合灯效和科幻视觉；保留文字对比和性能余量。'],
['spline','Three.js · 空间曲线编辑','空间导航','https://threejs.org/examples/webgl_geometry_spline_editor.html','通过控制点编辑空间路径。','可用于镜头、交通路线或空间运动的路径设计。'],
['mvhot','model-viewer · 热点与尺寸','结构讲解','https://modelviewer.dev/examples/annotations.html','将说明附着在模型表面。','热点可关联可见性；尺寸标注要先校验模型单位。'],
['mvanim','model-viewer · 动画控制','产品配置','https://modelviewer.dev/examples/animation/index.html','控制模型已有的动画片段。','适合门盖开合和产品动作；需要带动画的模型资产。'],
['babylon','Babylon.js · 功能演示库','三维引擎','https://www.babylonjs.com/featureDemos/','从材质、物理到粒子的功能地图。','按需求筛选引擎能力，进入单个演示进一步核对。'],
['bviewer','Babylon.js · Viewer Configurator','产品配置','https://viewerconfig.babylonjs.com/','可视化配置模型查看器。','可导出查看器设置；本地模型部署时需要有效资产地址。'],
['dscroll','Drei · ScrollControls','动效叙事','https://drei.docs.pmnd.rs/controls/scroll-controls','将滚动进度连接到三维场景。','适合 React 项目的分章叙事，提供滚动范围与进度工具。'],
['dpresent','Drei · PresentationControls','模型观察','https://drei.docs.pmnd.rs/controls/presentation-controls','带回弹与范围限制的物体展示控制。','适合局部产品展示；控制的是内容物体而不是相机。'],
['splineevents','Spline · 事件与状态','三维引擎','https://docs.spline.design/interaction-states-events-and-actions/concepts/events-interactivity','用事件触发对象状态转换。','适合设计师原型验证；根据实际导出方案检查费用与功能。'],
['pcreact','PlayCanvas · 可编辑示例','三维引擎','https://developer.playcanvas.com/user-manual/react/examples/','模型展示、物理与动效的可编辑入口。','选择适合自身技术栈的示例，再研究资源加载与交互。'],
['verge','Verge3D · DCC 到网页','三维引擎','https://www.soft8soft.com/verge3d/','面向三维设计师的网页交互工具。','支持从 DCC 工作流构建配置器、展示与教育内容，商业授权见原站。'],
['vtk','VTK.js · 科学可视化','结构讲解','https://kitware.github.io/vtk-js/examples/','体数据、裁切与交互控件参考。','适合技术可视化学习；具体数据分析需要领域校验。'],
['webxr','WebXR · 官方样例集合','空间导航','https://immersive-web.github.io/webxr-samples/','沉浸式 AR / VR 的基础样例。','需要兼容设备和安全上下文；普通鼠标预览不能替代 XR 实测。'],
['community','Babylon.js · 商业与社区作品','三维作品集','https://www.babylonjs.com/community/','车辆配置、柜体设计与空间体验的扩展入口。','先选业务问题，再进入作品；社区列表不代表完整流程实测。']
].map(([id,title,cat,url,brief,description])=>({id:'r3-'+id,type:'resource',title,cat,url,brief,description,tags:['三维','WebGL',cat],stack:'3D REFERENCE',verified:'2026-10-14'}));
fs.mkdirSync(path.join(out,'three'),{recursive:true});
function html(d){const option=d.mode==='configurator'?'隐藏扶手':d.mode==='projection'?'正交投影':d.mode==='material'?'高金属度':d.mode==='lighting'?'冷色主光':'显示线框';return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${d.title} · Atlas 3D</title><link rel="stylesheet" href="../three-lab.css"></head><body><header><div><span class="eyebrow">ATLAS / SPATIAL LAB · ${String(defs.indexOf(d)+1).padStart(2,'0')}</span><h1>${d.title}</h1></div><span class="runtime" id="runtime">LOADING WEBGL</span></header><main><div class="stage" id="stage"><canvas id="scene" tabindex="0" aria-label="三维场景：拖动旋转，方向键调整视角，加减键缩放"></canvas><div class="overlay">${d.cat} / ${d.level}</div><div class="overlay bottom"><b>REALTIME 3D</b><span id="metric">程序化原创场景 · 拖动观察</span></div><div class="fallback" id="fallback" hidden><h2>暂时无法显示三维场景</h2><p>当前浏览器未启用 WebGL，或图形上下文已中断。可重新打开预览，或换用支持 WebGL 的浏览器。</p></div></div><div class="controls"><div class="control-grid"><label for="parameter">${d.label}<output id="value"></output><input id="parameter" type="range" min="0" max="100" value="${d.initial}"></label><div class="row"><button id="play" aria-pressed="false">播放变化</button><button id="reset">重置视图</button></div></div><div class="row"><button class="swatch" data-color="#d8e866" aria-pressed="false">青柠</button><button class="swatch" data-color="#a7bff1" aria-pressed="false">雾蓝</button><button class="swatch" data-color="#ebae8c" aria-pressed="false">陶土</button><button id="option" aria-pressed="false">${option}</button></div><div class="camera-tools row"><button data-camera="front">正面</button><button data-camera="side">侧面</button><button data-camera="top">俯视</button></div><div id="story" tabindex="0" aria-label="滚动故事" hidden><section><h2>01 看见整体</h2><p>在这里滚动，镜头与结构随进度变化。</p></section><section><h2>02 换一个角度</h2><p>环绕观察轮廓、体积与材质。</p></section><section><h2>03 理解内部</h2><p>在结束前展开层次；反向滚动可以还原。</p></section></div><p id="status" role="status">正在准备场景…</p><small>${d.limit}</small></div></main><div class="footer">原创示意 · 可替换为自己的模型 · Three.js MIT / r160 · 本地依赖</div><script src="../vendor/three-0.160.0.min.js"></script><script src="../three-engine.js"></script><script>startAtlas3D(${JSON.stringify(d).replace(/</g,'\\u003c')});</script></body></html>`;}
for(const d of defs)fs.writeFileSync(path.join(out,d.file),html(d));
fs.writeFileSync(path.join(out,'three-data.js'),'window.ATLAS_THREE='+JSON.stringify(defs)+';\nwindow.ATLAS_3D_RESOURCES='+JSON.stringify(sources)+';\n');
fs.writeFileSync(path.join(out,'three','README.txt'),`ATLAS 3D / 18 套可复用三维模板\n\n解压整个包后直接打开 three 文件夹里的 HTML。请保留上级 three-engine.js、three-lab.css 和 vendor 文件夹；无需联网。单个模板也可从在线素材库下载为完全独立 HTML。\n\n${defs.map(d=>d.mode+'.html — '+d.title+' / '+d.cat).join('\n')}\n\n运行需要支持 WebGL 的现代浏览器和图形硬件。默认静止，播放由用户启动。所有几何体是程序化原创示意，不含公司模型和第三方品牌图片。Three.js r160 使用 MIT 许可证，vendor/THREE-LICENSE.txt 随包保留。模板逻辑可作为项目起点，正式业务需要真实资产、数据和适配测试。\n`);
console.log(JSON.stringify({templates:defs.length,resources:sources.length}));
