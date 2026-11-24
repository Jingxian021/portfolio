import hero from '../../assets/projects/robot-manipulator/hero move.png'
import statManipulator from '../../assets/projects/robot-manipulator/60.png'
import statCobot from '../../assets/projects/robot-manipulator/22-43.png'
import statTraditional from '../../assets/projects/robot-manipulator/72.png'
import statPalletizing from '../../assets/projects/robot-manipulator/robot palletizing.png'
import statIncreased from '../../assets/projects/robot-manipulator/increased300.png'
import userFlow from '../../assets/projects/robot-manipulator/user flow.png'
import workPhase from '../../assets/projects/robot-manipulator/work phase.png'
import avatar1 from '../../assets/projects/robot-manipulator/john.png'
import avatar2 from '../../assets/projects/robot-manipulator/adam.png'
import avatar3 from '../../assets/projects/robot-manipulator/smith.png'
import avatar4 from '../../assets/projects/robot-manipulator/max.png'
import strategy1 from '../../assets/projects/robot-manipulator/strategy1.png'
import strategy2 from '../../assets/projects/robot-manipulator/strategy2.png'
import strategy3 from '../../assets/projects/robot-manipulator/strategy3.png'
import designPreMove from '../../assets/projects/robot-manipulator/21 - Move.png'
import designPhaseA from '../../assets/projects/robot-manipulator/16 - Run.png'
import designPhaseB from '../../assets/projects/robot-manipulator/17 - Run.png'
import designProgramme from '../../assets/projects/robot-manipulator/22 - programme.png'
import designPhaseC from '../../assets/projects/robot-manipulator/log.png'

// 素材里每张 person 卡是整图，这里用裁出的头像 + 文案重建成可响应式的卡片
export const robotCaseStudy = {
  slug: 'robot-manipulator',
  title: 'Robot Manipulator Interface Design Palletizing Scenario',
  year: '2026',
  category: 'Control Interface',
  tags: ['Robotics', 'toI', 'Research'],


  hero,
  intro:
    'Today, main brands in manipulator, such as: UR / ABB, etc. has already solved the major problems in palletizing. However, it is still difficult between human operation and machines, resulting in low efficiency. To improve user experience, reduce mistakes, enhancing work efficiency, I’ve studied different robot manipulator interfaces and made the walk through by palletizing field.',
  target: 'Improving work efficiency of manipulators in palletizing scenario',
  stats: {
    title: 'Global Palletizing Market',
    headline: [
      { src: statManipulator, alt: '60% manipulator', w: 175, h: 89 },
      { src: statCobot, alt: '22 – 43% cobot', w: 300, h: 87 },
      { src: statTraditional, alt: '72% traditional high-level palletizing', w: 203, h: 89 }
    ],
    charts: [
      { src: statPalletizing, alt: 'Robot palletizing, 300 – 1000 cases per hour', w: 180, h: 138 },
      { src: statIncreased, alt: 'Increased 300%', w: 147, h: 138 }
    ]
  },
  research: {
    lead: 'I used the service to map the whole process, and try to have an overview of palletizing, also to',
    emphasis: 'find the most time-consuming steps',
    phases: [
      {
        name: 'Phase A',
        time: '3 – 5',
        unit: 'min',
        title: 'Conveyor in Place',
        body: 'Ensure Material bin has reached manipulator, check box',
        insight: 'Material bin may crook/ broken/ sunken, need operator handle'
      },
      {
        name: 'Phase B',
        time: '3 – 5',
        unit: 'min',
        title: 'Perform Palletizing',
        body: 'Inspect machine, prepare to click “stop”',
        insight:
          'Alarm information is E-code, hard to be understood, operators takes long time to check'
      },
      {
        name: 'Phase C',
        time: '5 – 15',
        unit: 'min',
        title: 'Exception Handling',
        body: 'Realizing dis-connection, warning, contact to fix',
        insight: 'Engineer takes time to locate problem, due to unfriendly log content'
      }
    ]
  },
  flows: {
    userFlow: { src: userFlow, alt: 'User flow: phases Pre, A, B and C', w: 1800, h: 860 },
    workPhase: {
      src: workPhase,
      alt: 'Working phase: pre-setting, operating and engineer if needed',
      w: 1800,
      h: 238
    }
  },
  splitProblems: [
    {
      value: '22',
      unit: '% top',
      text: 'gap between operators cognitive load and professional terminology'
    },
    {
      value: '78',
      unit: '% most',
      text: 'Old ERP system cannot afford all features, resulting a low efficiency in operation'
    }
  ],
  personas: [
    {
      role: 'Administrator',
      frequency: 1,
      avatar: avatar1,
      // name: 'Jonh',
      // age: '36',
      // mbti: 'ESTJ',
      // years: 'Working 8 Year',
      // country: 'Ireland',
      pain: ['No data for management', 'Lack data to support decision making'],
      goals: ['Data support decision making']
    },
    {
      role: 'Technician',
      frequency: 3,
      avatar: avatar2,
      // name: 'Adam',
      // age: '29',
      // mbti: 'ENTJ',
      // years: 'Working 3 Year',
      // country: 'Latvia',
      pain: ['Spend long time to investigate', 'Alarm information are too technic to analyse the root cause'],
      goals: ['Locate problems precisely and easily']
    },
    {
      role: 'Operator',
      frequency: 4,
      avatar: avatar3,
      // name: 'Smith',
      // age: '22',
      // mbti: 'INTP',
      // years: 'Working 1 Year',
      // country: 'Britain',
      pain: ['Afraid to wrongly manipulate', 'Confused about next steps after alarming'],
      goals: ['Palletizing fast and accurately', 'Less mistakes']
    },
    {
      role: 'Maintenance Engineer',
      frequency: 2,
      avatar: avatar4,
      // name: 'Max',
      // age: '28',
      // mbti: 'ESFJ',
      // years: 'Working 2 Year',
      // country: 'Mexico',
      pain: ['No detail records of problems', 'Scattered information, inefficient integration'],
      goals: ['Effective and centralized information display']
    }
  ],
  problems: [
    'The gap between professional terminology and users’ cognitive load.',
    'Ambiguity information for different users.',
    'Unclear permissions and accountability.',
    'Unfriendly interface.'
  ],
  strategies: [
    {
      src: strategy1,
      w: 618,
      h: 603,
      alt: 'Strategy 1 — clarify clear responsibility by different type of users’ accessibility'
    },
    {
      src: strategy2,
      w: 618,
      h: 606,
      alt: 'Strategy 2 — categorize and design alarm information to face different group of users'
    },
    {
      src: strategy3,
      w: 618,
      h: 607,
      alt: 'Strategy 3 — design user friendly interface to enhance efficiency'
    }
  ],
  design: [
    {
      src: designPreMove,
      w: 1481,
      h: 951,
      // phase: 'Phase Pre',
      // title: 'Move',
      // caption: 'Re-order joints to real world recognition, add multiple control methods and supplementary text.'
    },
    {
      src: designPhaseA,
      w: 1481,
      h: 951,
      // phase: 'Phase A',
      // title: 'Run',
      // caption: 'Show procedure and time, clarify the relationship between stop, start and pause.'
    },
    {
      src: designPhaseB,
      w: 1481,
      h: 951,
      // phase: 'Phase B',
      // title: 'Run',
      // caption: 'Vision sensor surfaces the problem when it happens, with a diagram of the position.'
    },
    {
      src: designProgramme,
      w: 1481,
      h: 951,
      // phase: 'Phase Pre',
      // title: 'Program',
      // caption: 'Block-based programming with the generated code next to it.'
    },
    {
      src: designPhaseC,
      w: 1481,
      h: 952,
      // phase: 'Phase C',
      // title: 'Log',
      // caption: 'Avatars, user ID and filters make permissions and history legible.'
    }
  ]
}
