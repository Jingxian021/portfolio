import nutriCover from '../../assets/projects/covers/nutri -cover.png'
import noteEditorCover from '../../assets/projects/covers/note editor - cover.png'
import robotArmCover from '../../assets/projects/covers/robot arm-cover.png'
import robotDeliveryCover from '../../assets/projects/covers/sonimod delivery-cover.png'
import hiveeCover from '../../assets/projects/covers/hivee - Cover.png'
import sonimodCover from '../../assets/projects/covers/Sonimod - Cover.png'

export const projects = [
  {
    slug: 'nutri-notebook',
    title: 'Nutri Notebook Mobile App Design',
    year: '2023',
    category: { en: 'Mobile App', zh: '移动应用' },
    tag: ['Health', 'toC', 'Mobile'],
    cover: nutriCover,
    summary: {
      en: 'Food logging that asks less and remembers more.',
      zh: '少问一点、多记一点的饮食记录工具。'
    }
  },
  {
    slug: 'note-editor',
    title: 'Note Editor',
    year: '2025',
    category: { en: 'Product Design', zh: '产品设计' },
    tag: ['Tool', 'Multi-platfrom', 'SaaS'],
    cover: noteEditorCover,
    summary: {
      en: 'A writing surface that keeps structure out of the way until it is needed.',
      zh: '一个把结构藏起来、需要时才出现的写作界面。'
    }
  },
  {
    slug: 'robot-manipulator',
    title: 'Robot Manipulator Palletizing Interface Design',
    year: '2026',
    category: { en: 'Control Interface', zh: '控制界面' },
    tag: ['Robotics', 'toI', 'Research'],
    cover: robotArmCover,
    summary: {
      en: 'Operating software for a palletizing robot, designed around four different operators.',
      zh: '围绕四类使用者重新设计的码垛机器人操作软件。'
    }
  },
  {
    slug: 'robot-delivery',
    title: 'Robot Delivery Management System Design',
    year: '2026',
    category: { en: 'Service Design', zh: '服务设计' },
    tag: ['Robotics', 'toB'],
    cover: robotDeliveryCover,
    summary: {
      en: 'Last-metre delivery flow for a robot working office buildings.',
      zh: '外卖配送机器人系统流程设计。'
    }
  },
  {
    slug: 'hivee',
    title: 'Hivee Online Collaboration SaaS',
    year: '2023',
    category: { en: 'Product Design', zh: '产品设计' },
    tag: ['SaaS', 'toC', 'Group Work'],
    cover: hiveeCover,
    summary: {
      en: 'Collective note-taking for teams that think in fragments.',
      zh: '为碎片化思考的团队做的协作笔记工具。'
    }
  },
  {
    slug: 'sonimod',
    title: 'Sonimod Food Order System Design',
    year: '2022',
    category: { en: 'Visual Identity', zh: '视觉识别' },
    tag: ['Delivery', 'toC', 'Official Site'],
    cover: sonimodCover,
    summary: {
      en: 'A modular identity system built from one repeating sound-shaped mark.',
      zh: '由一个重复的声音形状构成的模块化识别系统。'
    }
  },

]

export const tentativeProjects = [
  {
    slug: 'robot-hiring',
    title: 'Robot Hiring',
    year: '—',
    category: { en: 'Exploration', zh: '探索中' },
    summary: { en: 'An unfinished study on how robots enter a workforce.', zh: '关于机器人如何进入工作流程的未完成研究。' }
  },
  {
    slug: 'plant-pal',
    title: 'Plant Pal',
    year: '—',
    category: { en: 'Exploration', zh: '探索中' },
    summary: { en: 'A plant care companion, still at sketch stage.', zh: '植物养护陪伴工具，仍在草图阶段。' }
  },
  {
    slug: 'seecool',
    title: 'SeeCool',
    year: '—',
    category: { en: 'Exploration', zh: '探索中' },
    summary: { en: 'An early concept around cooling and comfort.', zh: '围绕降温与舒适感的早期概念。' }
  },

  {
    slug: 'yoga',
    title: 'Yooooga Mobile App Design',
    year: '2025',
    category: { en: 'Motion Study', zh: '动态研究' },
    tag: ['Health', 'Motion', 'Mobile'],
    summary: {
      en: 'Still frames that describe movement without showing it.',
      zh: '用静止画面描述运动，而不直接展示运动。'
    }
  }
]

export const allProjects = [...projects, ...tentativeProjects]

export const getProject = (slug) => allProjects.find((item) => item.slug === slug)
