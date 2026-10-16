# Interaction Atlas · 个人交互素材库

为不同项目长期积累的个人设计工具。入口是 dist/library.html，原 SUPERGEAR 研究页面保留在 dist/index.html。

## 叙事扩展与招聘证据

2026-10-15 新增 4 套原创 HTML/SVG 叙事模板：最后一束光、从一粒种子开始、一座城两种视角、未完成的展览。默认进入新叙事实验。全库 130 个内置条目，60 套可运行模板。

入口 dist/library.html?view=storyplus；整包 dist/story-plus-kit.zip；调用文档 dist/stories/READ-ME.txt。生成器 scripts/build-story-expansion.cjs，无外部依赖。模板提供可修改源文件、分支后果、阅读位置恢复、键盘操作及减少动态选项。虚构示例需替换为个人真实内容后再用于作品集。

新增 dist/career.html 下一步工作台：7 个公开岗位正文核对样本（4 国内、3 海外、6 家雇主），核心要求与加分项分开，包含原始链接、短摘、核对日期及失效来源排除记录。证据数据 dist/career-evidence.json。样本是 2026-10-15 核对快照，不代表市场比例或仍在招聘。练习路线为项目分析建议，并非招聘原文。

案例草稿与进度仅保存在访问者本地浏览器，可导入、导出 JSON 或打印为 PDF；没有上传接口。生成器 scripts/build-career-lab.cjs 生成页面与数据，交互源代码 dist/career.js。

## 案例机制复现模板

新增 8 套模板（5 套 WebGL、3 套 HTML/SVG），在个人库默认打开“案例复现模板”。全库共 56 套可运行模板。30 个参考案例详情已连接到对应机制模板。

模板：模块配置、拆解运镜、航线叙事、点云花园、粒子开场、滚动漫画、互动问答、年度时间线。支持独立页面、源码、单个内嵌依赖下载，以及 reference-kit.zip 整包。调用与替换说明见 dist/remakes/INTEGRATION.txt。生成器为 scripts/build-reference-kit.cjs。所有示意模型、文案和插画由本项目编写，不包含原站品牌资产；不是 34 个网站的完整克隆。

## 2026-10-15 网站精选

新增 10 个真实网站案例：Igloo、The Boat、Penderecki’s Garden、Weglot Like Magic、Of the Oak、Atlas Motion、Unseen Studio、Unseen 2025 Wrapped、Symphony of Vines、OceanX 2025。每个附实际截图、体验入口、观察步骤、叙事路径、镜头分析与实测范围。

通过 dist/library.html?view=discover#collection 进入本次精选；结构化调研记录见 dist/discovery-2026-10-15.json。未完成加载或入口失效的候选另行记录，不计入 10 个精选。品牌图像仅用于案例研究，通用模板包不包含第三方图片。

## 新增内容

- 48 套可运行模板：24 套二维（新增 8 套叙事流程），24 套 WebGL 三维（含 6 套完整镜头叙事）；实时体验、窄屏预览、源码查看与下载。
- 36 个官方资源入口：组件系统、动效、三维与设计规范，分别附用途和官方链接。
- 34 个带图参考案例，在个人库中也能检索和收藏。
- 自建链接条目、设计笔记、收藏、按场景筛选、关键词与笔记搜索。
- JSON 导出与合并导入，保存名称、强调色、收藏、笔记和自建条目。
- 同一浏览器首次进入个人库时，会迁移旧研究页面已收藏的案例。

## 动效与镜头叙事专题

默认进入“动效叙事”，共有 19 个相关演示。其中新增 8 套二维完整流程、6 套三维镜头流程，其余为滚动、形变、粒子与空间反馈机制研究。全库 126 个内置条目，不含个人自建链接。

三维叙事包括：产品结构、材质与光位、展廊动线、配置决策、空间路径、五种镜头职责。每套有 5 个语义镜头，支持逐镜、回看、进度拖动、暂停和明确结论。脚本见 dist/three/CAMERA-STORY-GUIDE.txt。镜头与文案一同设计，运动用于揭示信息；全景建立语境、特写提供证据、最后回归整体。

## 使用与迁移

直接打开 dist/library.html，或访问 GitHub Pages 根网址。无需安装依赖。
收藏和笔记只保存在当前浏览器的 localStorage，不会同步到 GitHub，也不会被其他访客看到。
换设备、换网址、清理浏览器之前，请点击“导出备份”；在新环境点击“导入备份”。同 ID 条目的笔记以导入内容为准，其他条目会合并。自建条目最多 500 个，备份文件最多 2 MB。
浏览器不允许本地存储时仍可临时使用，但应导出备份。在线版与 file:// 本地版的收藏互相独立。

## 带走通用模板

dist/template-kit.zip 包含 16 个 HTML 与使用说明，任何一个都能独立打开。模板包不包含公司 logo、产品图、第三方截图或网络依赖。它们是本项目编写的示例，可作为个人或商业项目的开发起点；表单、价格、购物清单和任务进度等需换成真实业务逻辑后再发布。
个人库的“个性设置”可修改名称与强调色；单个模板下载会使用当前强调色，整包下载为默认色。
原 SUPERGEAR 产品素材和第三方案例图片仍只用于其原有项目及研究参考，并不包含在通用模板包中。

新增离线包：

- dist/narrative-kit.zip：8 套二维叙事，单个 HTML 无依赖。
- dist/three-kit.zip：24 套 WebGL 模板与共享本地 Three.js 引擎，解压时保留目录结构。
- 在线素材库可下载单个三维模板，自动内嵌依赖；file:// 环境若限制 fetch，请使用整包。
- 三维模板使用原创程序化几何，不包含公司模型与第三方案例图。Three.js 固定为 r160（非最新版），MIT 许可证保留在 vendor/THREE-LICENSE.txt。
- 三维示意需支持 WebGL；相机使用真实三维投影，但未实现景深、物理求解、XR 或真实工程测量。三维配色由模板内控制，不随素材库强调色变化。

## 维护

- dist/library.html / library.css / library.js：个人库页面、样式与交互。
- scripts/build-library.cjs：16 套模板与 16 个资源的数据源。运行 node scripts/build-library.cjs 更新 library-data.js 和独立模板 HTML。
- dist/templates/：独立模板文件。修改生成器后应重新打包 template-kit.zip。
- scripts/build-three.cjs：18 套三维机制与 20 个新增官方资源；scripts/build-story-edition.cjs：6 套镜头流程；scripts/build-narratives.cjs：8 套二维叙事。生成顺序：基础库 → 三维机制 → 镜头流程 → 二维叙事。
- dist/three-engine.js / three-lab.css：共享 WebGL 运行逻辑与镜头控制；源文件可直接编辑。
- dist/cases.js：34 个参考案例及配图来源。

资源核对日期：2026-10-14。官方资源为入口级核对，不表示所有示例都已实测或可以免费商用，具体授权以原站为准。

---

# SUPERGEAR · 交互灵感实验室

面向产品、设计和开发团队的交互式研究案例库。黑黄品牌风格，34 个参考案例、4 个可操作实验、20 个扩展方向。

## 打开

直接使用现代浏览器打开 `dist/index.html`。不需要安装依赖，也不需要构建。

开发预览可在项目根目录运行 `python -m http.server 8080 --directory dist`，然后访问 `http://localhost:8080`。

## 内容与功能

- 案例分类、关键词搜索和优先参考筛选。
- 案例详情、官方来源与调研核对范围。
- 本地收藏、收藏夹和文本清单导出。收藏只保存在当前浏览器，不上传服务器。
- 双款拖动比较，支持四款产品、正视和侧视切换。
- 材质光源、分步装配、规则选型三个概念演示。
- 按现有素材、业务连接、实时三维分组的 20 个交互扩展方向。
- 响应式布局、键盘操作、减少动态效果偏好支持。

## 文件结构

```text
dist/
  index.html        页面结构
  style.css         视觉和响应式样式
  app.js            交互逻辑、演示和扩展建议
  cases.js          24 个案例及其官方来源
  assets/           产品图、品牌 logo 和标注过的研究截图
```

## 素材对应

ST、CB、CVO、DB 的 `款式.webp` 为侧视图，`款式-front.webp` 为正视图。由用户提供的 3840×2160 原图生成网页尺寸副本，保持图像内容与比例。

## 调研边界

调研日期：2026-10-14。这是精选案例库，并非全网排名。A 仅代表案例文字说明中的局部实测；B 为官方页面或制作方说明；C 为历史参考。24 个案例均有独立配图，包含 23 张官网或制作方页面截图及 1 张 Vans 官方产品图；详情可查看大图与图片来源。截图不表示完整流程实测。Ray-Ban 使用官方产品页配图，Framework 使用官方拆装教程，Dyson 使用相关 VR 历史介绍页，均注明限制。官网可能受地区、设备和后续更新影响。

材质、装配、选型演示用于解释交互机制，不是实际工程安装指导、材质实测或适配规则。真实应用需要产品和工程数据审核。当前实验不会创建购物车或处理订单。

## 发布与维护

纯静态页面可以部署到支持静态文件的托管服务，发布目录为 `dist`。更改案例请编辑 `cases.js`；演示和建议在 `app.js`。开启 GitHub Pages 或公开仓库会改变访问范围，应由项目所有者明确决定。

## 素材与权利

SUPERGEAR 品牌和产品素材由项目方提供。参考品牌、案例及截图属于相应权利人，仅用于调研说明，官方来源保留在案例中。此项目未授予第三方素材的再许可。

## GitHub Pages

仓库根目录的 index.html 现在会转到 dist/library.html，原研究页面仍可通过导航进入。在 Settings → Pages 中选择 Deploy from a branch，分支 main，目录 / (root)，然后 Save。启用后访问 https://qihangwu74-create.github.io/supergear-interaction-atlas/ 。

所有页面配图均位于 dist/assets，使用相对路径，不依赖第三方图片外链。

## 2026-10-16 适用性审计

入口 [dist/validation.html](dist/validation.html)，机器可读报告 [dist/validation-report.json](dist/validation-report.json)，测试记录 [dist/validation-tests.json](dist/validation-tests.json)。60 套模板逐项映射至 9 类任务方向与 1 类表达研究；26 套机制、27 套流程、7 套研究均是源码层分类，不等同于生产验收或市场覆盖率。10 个原始来源分别标明产品、研究、标准、招聘性质与核对日期。

修复三维拖放的完整非拖动替代及全部位置复位、滚动章节的固定高度假设、配色模板及折叠面板的不准确文案。下载包与单页同步更新。浏览器工具本轮无法启动，因此画面、焦点、真机与性能验收尚未完成；未做真实用户效果测试。

审计生成：`node scripts/build-validation.cjs`；逻辑回归：`node scripts/test-validation.cjs`。可设置 ATLAS_ROOT 指向仓库目录。修改模板后应重跑并更新相关 ZIP。浏览器验证完成前不能将待复测状态改为通过。

同轮另对 34 个参考案例与 36 个资源入口做了公开 HTTP 检查：67 个返回成功状态，3 个返回 403（Framework、Dyson、LottieFiles）。这只证明链接响应，不证明交互功能或业务效果。逐项记录见 `dist/reference-link-check.json`；复查脚本 `scripts/check-reference-links.cjs`。
