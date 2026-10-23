// Original visual teaching sequence. These steps are not a service procedure.
// Directions are camera-to-target vectors; bounds are fitted at runtime.
export const story = {
  id: 'luggage', name: '看懂尾部与边箱',
  steps: [
    {title:'先找到它的位置', question:'边箱在整车的哪个位置？', text:'从侧后方建立整车方向。前轮在远端，边箱位于座椅两侧、后轮附近。', result:'先有整车参照，再进入局部。', group:'all', direction:[1.5,.5,-1.4], fit:'whole', action:'whole', labels:['luggage','tank']},
    {title:'从整车中认出一个系统', question:'哪些可见部件共同构成尾部体量？', text:'尾部系统先高亮，其他部分轻轻退后。点击空间标注，可以进一步观察边箱或后轮；返回讲解视角继续。', result:'边箱与尾部是视觉分组，不等于一个工程总成。', group:'luggage', direction:[1.6,.45,-1.1], fit:'whole', action:'highlight', labels:['luggage','rearwheel']},
    {title:'展开，但不丢失原位', question:'这些部件原来处在哪里？', text:'拖动展开滑杆，边箱与尾部向后上方移开。虚线保留原始位置与当前位置的联系；反向拖动可以归位。', result:'移动用于解释空间关系，不代表实际拆卸方向。', group:'luggage', direction:[1.8,.6,-1.2], fit:'expanded', action:'separate', labels:['luggage','rearwheel']},
    {title:'靠近，观察外形衔接', question:'边箱如何与座椅、后轮形成轮廓关系？', text:'镜头靠近边箱区域。拖动旋转检查外形，点击“回到讲解视角”恢复构图。这里展示模型已有外观，不推断内部安装结构。', result:'观察边箱体量、上沿和周围部件的相对位置。', group:'luggage', direction:[2,.65,-.8], fit:'luggage', action:'detail', labels:['luggage','tank']},
    {title:'只改变一个选择', question:'边箱的显示状态怎样影响整车轮廓？', text:'使用下面的两个按钮切换边箱显示。镜头与其他部件保持一致，便于判断变化来自哪里。', result:'这是现有网格的可见性对照，不是可购买配置或适配结论。', group:'all', direction:[2.2,.5,-1.4], fit:'whole', action:'compare', labels:[]},
    {title:'回到整体，说出发现', question:'你能说明边箱的位置和轮廓影响了吗？', text:'所有部件回到原始显示和坐标，镜头回到开场构图。写下观察结果，保存当前位置，或导出带镜头的状态文件。', result:'完成一条“定位 → 关系 → 细节 → 比较 → 回归”的观察路线。', group:'all', direction:[1.5,.5,-1.4], fit:'whole', action:'return', labels:['luggage']}
  ]
};

// Keep author-facing names separate from raw mesh identifiers.
export const partNames = [
  [/cofra/i,'边箱'],[/windshield/i,'风挡'],[/fuel_tank/i,'油箱'],[/^seat$/i,'座椅'],
  [/tire_front/i,'前轮轮胎'],[/tire_rear/i,'后轮轮胎'],[/rim_front/i,'前轮轮毂'],[/rim_rear/i,'后轮轮毂'],
  [/body_front/i,'前整流罩'],[/engine/i,'发动机区域部件'],[/radiator/i,'散热区域部件'],
  [/muffler/i,'排气部件'],[/fender_front/i,'前挡泥板'],[/fender_rear/i,'后挡泥板']
];
export function partLabel(name,groupName){return partNames.find(([pattern])=>pattern.test(name))?.[1]||groupName+' · 模型部件';}
