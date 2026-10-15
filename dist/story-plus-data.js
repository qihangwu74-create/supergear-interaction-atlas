window.ATLAS_REMAKES.push(...[
  {
    "id": "m-beacon",
    "type": "remake",
    "edition": "story-plus",
    "title": "最后一束光 · 你的选择决定航线",
    "cat": "动效叙事",
    "tags": [
      "叙事交互",
      "SVG",
      "收到信号",
      "收集证据",
      "选择航线",
      "看见后果"
    ],
    "brief": "先检查两条线索，再决定从哪里穿过风暴。结尾会记住你的选择。",
    "file": "stories/beacon.html",
    "image": "assets/story-beacon.webp",
    "three": false,
    "refs": [],
    "steps": "收到信号 → 收集证据 → 选择航线 → 看见后果",
    "adapt": "编辑独立 HTML 的 ATLAS_STORY_CONFIG 与 SVG 场景。支持 AtlasTemplate.getState / setState / reset 和 atlas:change 事件。提交两条分支的状态图，解释线索、决定与结局之间的因果关系。",
    "limit": "原创虚构故事与 SVG 场景；没有真实航海数据，不是航行建议。",
    "jobs": [
      "tencent-ux",
      "factory"
    ],
    "question": "如果用户跳过关键信息，系统应该阻止、提示还是允许？"
  },
  {
    "id": "m-seed",
    "type": "remake",
    "edition": "story-plus",
    "title": "从一粒种子开始 · 滚动见证生长",
    "cat": "动效叙事",
    "tags": [
      "叙事交互",
      "SVG",
      "埋下可能",
      "向下扎根",
      "改变条件",
      "留下新的种子"
    ],
    "brief": "滚动从地下走向树冠；改变雨量，再观察故事结尾如何回应。",
    "file": "stories/seed.html",
    "image": "assets/story-seed.webp",
    "three": false,
    "refs": [],
    "steps": "埋下可能 → 向下扎根 → 改变条件 → 留下新的种子",
    "adapt": "编辑独立 HTML 的 ATLAS_STORY_CONFIG 与 SVG 场景。支持 AtlasTemplate.getState / setState / reset 和 atlas:change 事件。提交分镜、滚动进度映射，以及减少动态效果版本的对照。",
    "limit": "植物形态与生长结果均为叙事示意，不是农业模型或科学预测。",
    "jobs": [
      "factory",
      "emergent"
    ],
    "question": "滚动推进故事时，用户是否始终知道自己在哪里、改变了什么？"
  },
  {
    "id": "m-parallel",
    "type": "remake",
    "edition": "story-plus",
    "title": "一座城，两种视角 · 让信息相遇",
    "cat": "动效叙事",
    "tags": [
      "叙事交互",
      "SVG",
      "同一时刻",
      "信息断层",
      "做一个决定",
      "回到双方"
    ],
    "brief": "送件人与收件人经历同一场等待。让两条视角交叉，找到体验断层。",
    "file": "stories/parallel.html",
    "image": "assets/story-parallel.webp",
    "three": false,
    "refs": [],
    "steps": "同一时刻 → 信息断层 → 做一个决定 → 回到双方",
    "adapt": "编辑独立 HTML 的 ATLAS_STORY_CONFIG 与 SVG 场景。支持 AtlasTemplate.getState / setState / reset 和 atlas:change 事件。提交双侧用户旅程、状态反馈清单和一次真实可用性观察记录。",
    "limit": "原创虚构服务故事；时间、路线和后果为示例，不是真实物流承诺。",
    "jobs": [
      "xinxisoft",
      "tencent-ux"
    ],
    "question": "后台完成了动作，用户为什么仍然觉得没有进展？"
  },
  {
    "id": "m-archive",
    "type": "remake",
    "edition": "story-plus",
    "title": "未完成的展览 · 穿过四间档案室",
    "cat": "动效叙事",
    "tags": [
      "叙事交互",
      "SVG",
      "一张草稿",
      "一次失败",
      "一个转折",
      "继续书写"
    ],
    "brief": "纵向滚动穿过横向展厅，打开每份档案，并带着阅读记录返回原位。",
    "file": "stories/archive.html",
    "image": "assets/story-archive.webp",
    "three": false,
    "refs": [],
    "steps": "一张草稿 → 一次失败 → 一个转折 → 继续书写",
    "adapt": "编辑独立 HTML 的 ATLAS_STORY_CONFIG 与 SVG 场景。支持 AtlasTemplate.getState / setState / reset 和 atlas:change 事件。提交四段项目故事、每次转折的依据和可返回的详情流程。",
    "limit": "原创示例档案与几何海报；替换为自己的项目后才能作为个人经历展示。",
    "jobs": [
      "bns",
      "factory"
    ],
    "question": "查看细节之后，用户能否回到刚才的位置，并理解整条时间线？"
  }
]);
