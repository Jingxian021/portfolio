import dashboardCover from '../../assets/projects/hivee/dashboard cover.png'
import dashboard from '../../assets/projects/hivee/dashboard.png'
import teamView from '../../assets/projects/hivee/team.png'
import calendarView from '../../assets/projects/hivee/calendar-view.png'
import walkThroughCard from '../../assets/projects/hivee/walk through card.png'
import beforeDashboard from '../../assets/projects/hivee/before dashbaord.png'
import afterDashboard from '../../assets/projects/hivee/after dashboard.png'
import beforeTable from '../../assets/projects/hivee/before table.png'
import afterTable from '../../assets/projects/hivee/after table.png'
import ringVisual from '../../assets/projects/hivee/image 343.png'
import ringEasy from '../../assets/projects/hivee/image 344.png'
import group4073 from '../../assets/projects/hivee/Group 4073 (1).png'
import group4072 from '../../assets/projects/hivee/Group 4072.png'
import ellipse from '../../assets/projects/hivee/Ellipse.png'
import polygon from '../../assets/projects/hivee/Polygon.png'
import rectangle from '../../assets/projects/hivee/Rectangle.png'
import star from '../../assets/projects/hivee/Star.png'
import spaceWord from '../../assets/projects/hivee/space-word.png'
import davidPortrait from '../../assets/projects/hivee/persona-david.png'
import saraPortrait from '../../assets/projects/hivee/persona-sara.png'
import userData01 from '../../assets/projects/hivee/user data-01.png'
import userData02 from '../../assets/projects/hivee/user data-02.png'
import researchData from '../../assets/projects/hivee/research data.png'
import personaFullDavid from '../../assets/projects/hivee/persona-01.png'
import personaFullSara from '../../assets/projects/hivee/persona-02.png'

export const hiveeCaseStudy = {
  title: 'Hivee Online Collaboration SaaS Design',
  tags: ['SaaS', 'toC'],
  meta: [
    { label: 'Year', value: '2023' },
    { label: 'Client', value: 'Atlassian' },
    { label: 'Category', value: 'SaaS' },
    { label: 'Role', value: 'UIUX / Product' },
    { label: 'Team', value: 'Jessie / Elaine / Di / Keeva' }
  ],
  hero: { src: dashboardCover, w: 2030, h: 966, alt: 'Hivee dashboard cover' },

  research: {
    id: 'hv-research',
    title: 'User Research',
    sub: 'Understanding our target user',
    lead:
      'We hired over 71 participants, which covered most of our potential users, from college students to young professionals.',
    group: {
      question: 'How many members in your group?',
      value: '52.11',
      unit: '%',
      note: 'in small groups',
      image: { src: userData01, w: 908, h: 1144, alt: 'Group size distribution: 52.11% in small groups' }
    },
    challenges: {
      question: '“What are the main challenges for you, when use online collaboration tools currently ?”',
      title: 'Main Challenges',
      note: 'Respondents could select multiple options',
      image: { src: userData02, w: 1631, h: 1043, alt: 'Main challenges — 68% switch among platforms, 49% complex operation, 42% lack of functions, 41% unfriendly interface' }
    },
    insight: {
      lead: 'over',
      value: '84.51% candidates thought online meeting & whiteboard would help to cooperation'
    },
    functions: {
      question: '“Which functions do you think can enhance team project cooperation?”',
      image: { src: researchData, w: 1800, h: 758, alt: 'Desired team collaboration functions — Online Meeting & Whiteboard 84.51%, Sharing files 74%, Integration 71%' }
    }
  },

  whys: {
    id: 'hv-whys',
    title: '5 Whys Method',
    sub: 'Reasons behind the data',
    lead: 'We Use 5 Whys to figure out the root cause',
    items: [
      {
        question: 'Why user value “online meeting & whiteboard” function most?',
        value: 84,
        answer: 'They need real-time communication to discuss their ideas accurately and clearly.'
      },
      {
        question: 'Why user frequent switch among platforms',
        value: 68,
        answer:
          'Current tools are not All-in-one platforms, and user needs discussion, writing, tracking etc.'
      },
      {
        question: 'Why they value sharing files function?',
        value: 78,
        answer:
          'They need to keep updating the latest information among team members to ensure everyone’s on the same ground'
      }
    ]
  },

  competitor: {
    id: 'hv-competitor',
    title: 'Competitor Analysis',
    sub: 'Learn From Competitors',
    currentTitle: 'Current Tools',
    intro:
      'Existing products mainly provide convenience to users with functions such as synchronization, project management, and templates, but lack project operability and clear visual expression of project progress and time scheduling.',
    matrix: { src: group4073, w: 1368, h: 895, alt: 'Competitor comparison across five capabilities' },
    positioning:
      'By establishing a coordinate axis, we can intuitively find the product’s market positioning, facilitate brand recognition and distinction, and form differentiated functions with competing products. Based on team size and project complexity, Hivee’s market positioning is lightweight, easy-to-use collaboration software.',
    quadrant: { src: group4072, w: 1516, h: 1150, alt: 'Market positioning quadrant with Hivee marked we are here' }
  },

  personas: {
    id: 'hv-personas',
    title: 'Persona',
    sub: 'User’ Pain Points',
    items: [
      {
        name: 'David',
        align: 'left',
        card: { src: personaFullDavid, w: 781, h: 959, alt: 'David persona — 28-year-old, Melbourne, Work @ Canva' }
      },
      {
        name: 'Sara',
        align: 'right',
        card: { src: personaFullSara, w: 700, h: 1162, alt: 'Sara persona — 21-year-old, London, Study @ UNSW' }
      }
    ]
  },
  problem: {
    id: 'hv-problem',
    title: 'Problem Space',
    sub: 'Define Problems',
    lead: 'We need to address the issue of low efficiency in online user collaboration.',
    body: [
      { text: 'This challenge arises from the tool’s current ' },
      {
        text: 'lack of functions, insufficient storage space, unfriendly interface & unclear task management',
        strong: true
      },
      {
        text: '. Consequently, users tend to abandon the software, resulting in a decline in user retention.'
      }
    ],
    decorations: { ellipse, polygon, rectangle, star },
    spaceWord: { src: spaceWord, w: 2960, h: 448 }
  },

  strategy: {
    id: 'hv-strategy',
    title: 'Strategy',
    sub: 'Solutions',
    hmw: 'How might we create user friendly interface and help user reduce learning curve?',
    cards: [
      {
        title: 'Simplify Interface & Use Instructions',
        tone: 'blue',
        points: [
          'Card setting to group content',
          'Minimalism Style',
          'Set Demo to introduce functions',
          'Visualize data and process'
        ]
      },
      {
        title: 'Define Clear Task Management',
        tone: 'pale',
        points: [
          'Clarify the tasks dates & plans',
          'Clarify the roles & responsibility',
          'Clarify & Visualize task process',
          'Clarify personal & team process'
        ]
      }
    ],
    principles: [
      {
        title: 'Data Visualization',
        body: 'Visualize data by using pies and charts to intuitively express information'
      },
      { title: '60-30-10 Law', body: 'Applying 60-30-10 rule to enhance readability and contrast' },
      {
        title: 'Kanban Card Improve Productivity',
        body: 'Set Kanban chart to help users checking tasks.'
      }
    ],
    hero: { src: dashboard, w: 1404, h: 790, alt: 'Hivee dashboard on a laptop' },
    walkthrough: {
      team: { src: teamView, w: 1360, h: 790, alt: 'Team page with teammates and project prioritization' },
      label: 'Walkthrough for New Users',
      card: { src: walkThroughCard, w: 597, h: 464, alt: 'Walkthrough card introducing members’ process' },
      label2: 'Alternating Row Colors'
    },
    categorization: {
      title: 'Categorization',
      body: 'Categorize information and use a top-down browsing sequence',
      image: { src: calendarView, w: 1404, h: 790, alt: 'Calendar page with monthly plan and weekly schedule' }
    }
  },

  iterations: {
    id: 'hv-iterations',
    title: 'Iterations',
    sub: 'Before & After',
    groups: [
      {
        list: [
          'Add Avatars to show members’ status',
          'Enlarge Main Content'
        ],
        bullets: [
          'Adding avatars allows users to quickly identify whether members are online or offline, enabling faster communication with available members. This feature helps improve workflow efficiency by making it easier to reach out to active team members in real time.',
          'Enlarging the main content interface adjust info structure and density. This allow users to perceive the info when needed, reduce cognitive perception burden.'
        ],
        ring: { src: ringVisual, w: 477, h: 355, alt: 'After — 56% think visual friendly' }
      },
      {
        list: [
          'visualize process',
          'add members’ avatar to make it clearer',
          'add priority setting'
        ],
        bullets: [
          'Visualize the process to help users gain a clearer view of the data.',
          'Use distinct background colors for each line to improve visual clarity.',
          'Incorporate avatars to represent different members for better identification.',
          'Add a priority option to notify users of urgency, helping them make more informed decisions.'
        ],
        ring: { src: ringEasy, w: 402, h: 269, alt: 'After — 75% think easy to use' }
      }
    ],
    beforeDashboard: {
      src: beforeDashboard,
      w: 1794,
      h: 604,
      alt: 'Before — dashboard with small, compressed content'
    },
    afterDashboard: {
      src: afterDashboard,
      w: 1762,
      h: 602,
      alt: 'After — dashboard with enlarged main content and member avatars'
    },
    beforeTable: { src: beforeTable, w: 1752 * 0.9, h: 604 * 0.9, alt: 'Before — team projects table' },
    afterTable: { src: afterTable, w: 1509, h: 623, alt: 'After — team projects table with priority and avatars' }
  }
}
