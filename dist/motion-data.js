window.ATLAS_REMAKES.push(...[
  {
    "id": "m-motion-material",
    "type": "remake",
    "edition": "motion-lab",
    "title": "光标巡光 · 材质显影",
    "cat": "动效叙事",
    "tags": [
      "2026-10-22",
      "滚动",
      "镜头语言",
      "WebGL"
    ],
    "brief": "区分哑光、缎面和抛光的视觉反应。",
    "file": "motion/material.html",
    "image": "motion/material-cover.svg",
    "imageLabel": "原创模板设计示意",
    "three": true,
    "refs": [],
    "steps": "光标移动调整灯位；滚动改变巡光角度；点击切换表面。 先看轮廓 → 让光掠过 → 比较表面 → 回到选择",
    "adapt": "单页内编辑 ATLAS_MOTION_CONFIG，调用 AtlasTemplate.getState / setState / reset。详细提示词、10 个来源和整包下载见新动效专题。",
    "limit": "程序化几何与示意灯光，不是实物色差或材质检测。",
    "sourceLinks": [
      [
        "Three.js · Physical Material",
        "https://threejs.org/docs/pages/MeshPhysicalMaterial.html"
      ],
      [
        "Three.js · PointLight",
        "https://threejs.org/docs/pages/PointLight.html"
      ],
      [
        "MDN · pointermove",
        "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event"
      ]
    ]
  },
  {
    "id": "m-motion-passage",
    "type": "remake",
    "edition": "motion-lab",
    "title": "点击入场 · 品牌纵深穿行",
    "cat": "动效叙事",
    "tags": [
      "2026-10-22",
      "滚动",
      "镜头语言",
      "WebGL"
    ],
    "brief": "把品牌起点、探索过程与价值结果串成可回看的旅程。",
    "file": "motion/passage.html",
    "image": "motion/passage-cover.svg",
    "imageLabel": "原创模板设计示意",
    "three": true,
    "refs": [],
    "steps": "点击进入后，自然滚动推进；章节按钮与进度条也可控制。 发出邀请 → 穿过未知 → 找到方向 → 带走主张",
    "adapt": "单页内编辑 ATLAS_MOTION_CONFIG，调用 AtlasTemplate.getState / setState / reset。详细提示词、10 个来源和整包下载见新动效专题。",
    "limit": "原创虚构品牌场景；真实三维位移，没有视频或外部模型。",
    "sourceLinks": [
      [
        "Google · Staging & Camera Control",
        "https://modelviewer.dev/examples/stagingandcameras/"
      ],
      [
        "GSAP · ScrollTrigger",
        "https://gsap.com/docs/v3/Plugins/ScrollTrigger/"
      ],
      [
        "illoca · 产品叙事网站",
        "https://illoca.unseen.co/"
      ]
    ]
  },
  {
    "id": "m-motion-anatomy",
    "type": "remake",
    "edition": "motion-lab",
    "title": "电影运镜 · 产品分层拆解",
    "cat": "动效叙事",
    "tags": [
      "2026-10-22",
      "滚动",
      "镜头语言",
      "WebGL"
    ],
    "brief": "按部件关系解释结构，拆开之后仍知道如何组成整体。",
    "file": "motion/anatomy.html",
    "image": "motion/anatomy-cover.svg",
    "imageLabel": "原创模板设计示意",
    "three": true,
    "refs": [],
    "steps": "点击开始，然后滚动或使用章节导航。 认识整体 → 靠近接口 → 看懂层次 → 重新组合",
    "adapt": "单页内编辑 ATLAS_MOTION_CONFIG，调用 AtlasTemplate.getState / setState / reset。详细提示词、10 个来源和整包下载见新动效专题。",
    "limit": "原创镜头装置示意；无真实工程尺寸、维修或装配验证。",
    "sourceLinks": [
      [
        "Google · Staging & Camera Control",
        "https://modelviewer.dev/examples/stagingandcameras/"
      ],
      [
        "GSAP · ScrollTrigger",
        "https://gsap.com/docs/v3/Plugins/ScrollTrigger/"
      ],
      [
        "Codrops · Sticky Sections",
        "https://tympanus.net/codrops/2024/01/31/on-scroll-animation-ideas-for-sticky-sections/"
      ]
    ]
  },
  {
    "id": "m-motion-gaze",
    "type": "remake",
    "edition": "motion-lab",
    "title": "视线引导 · 点击细节讲解",
    "cat": "动效叙事",
    "tags": [
      "2026-10-22",
      "滚动",
      "镜头语言",
      "SVG"
    ],
    "brief": "用角色的注意力引导用户看向正在解释的部位。",
    "file": "motion/gaze.html",
    "image": "motion/gaze-cover.svg",
    "imageLabel": "原创模板设计示意",
    "three": false,
    "refs": [],
    "steps": "点击开始；点击细节按钮或滚动，眼睛看向当前讲解位置。 建立视线 → 看向旋钮 → 看向接口 → 完成理解",
    "adapt": "单页内编辑 ATLAS_MOTION_CONFIG，调用 AtlasTemplate.getState / setState / reset。详细提示词、10 个来源和整包下载见新动效专题。",
    "limit": "原创 SVG 角色；不读取摄像头、不检测真实眼动。",
    "sourceLinks": [
      [
        "MDN · pointermove",
        "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event"
      ],
      [
        "GSAP · ScrollTrigger",
        "https://gsap.com/docs/v3/Plugins/ScrollTrigger/"
      ]
    ]
  },
  {
    "id": "m-motion-portraits",
    "type": "remake",
    "edition": "motion-lab",
    "title": "滚动画廊 · 人物重排与归位",
    "cat": "动效叙事",
    "tags": [
      "2026-10-22",
      "滚动",
      "镜头语言",
      "SVG"
    ],
    "brief": "团队、创作者或人物专题：先形成印象，再看具体的人。",
    "file": "motion/portraits.html",
    "image": "motion/portraits-cover.svg",
    "imageLabel": "原创模板设计示意",
    "three": false,
    "refs": [],
    "steps": "自然滚动将散落画面重排为网格；点击人物打开档案。 各自的世界 → 走到一起 → 看见每个人 → 留下联系",
    "adapt": "单页内编辑 ATLAS_MOTION_CONFIG，调用 AtlasTemplate.getState / setState / reset。详细提示词、10 个来源和整包下载见新动效专题。",
    "limit": "原创 SVG 人物插画，不含第三方肖像；上线时可替换为授权照片。",
    "sourceLinks": [
      [
        "Codrops · Layout Formations",
        "https://tympanus.net/codrops/2024/09/18/exploration-of-on-scroll-layout-formations/"
      ],
      [
        "Codrops · Staggered 3D Grid",
        "https://tympanus.net/codrops/2024/10/16/staggered-3d-grid-animations-with-scroll-triggered-effects/"
      ],
      [
        "Codrops · TileScroll",
        "https://github.com/codrops/TileScroll"
      ]
    ]
  }
]);