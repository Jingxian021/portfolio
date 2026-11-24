import cover from '../../assets/projects/sonimod delivery/cover.png'
import staffDashboard from '../../assets/projects/sonimod delivery/dashboard staff.png'
import ceoDashboard from '../../assets/projects/sonimod delivery/ceo dashboard.png'
import managerDashboard from '../../assets/projects/sonimod delivery/manager dashboard.png'
import mapScreen from '../../assets/projects/sonimod delivery/map.png'
import robotDiagram from '../../assets/projects/sonimod delivery/diagramRobot.png'
import patterns from '../../assets/projects/sonimod delivery/patterns.png'
import chooseRoute from '../../assets/projects/sonimod delivery/ensure.png'
import issueGraph from '../../assets/projects/sonimod delivery/issueAnalysis.png'
import issueCard from '../../assets/projects/sonimod delivery/Issue.png'
import productLaptop from '../../assets/projects/sonimod delivery/Product_manager 1.png'
import productTable from '../../assets/projects/sonimod delivery/Product.png'
import shiftBoard from '../../assets/projects/sonimod delivery/shift.png'
import reportBefore from '../../assets/projects/sonimod delivery/reportCardBefore.png'
import reportSecond from '../../assets/projects/sonimod delivery/report.png'
import reportFinal from '../../assets/projects/sonimod delivery/feedbackcardAfter.png'
import deliveryBefore from '../../assets/projects/sonimod delivery/robot_delivery_before.png'
import deliveryAfter from '../../assets/projects/sonimod delivery/delivery.png'
import fixBefore from '../../assets/projects/sonimod delivery/robot_fix_before.png'
import fixAfter from '../../assets/projects/sonimod delivery/fixAfter.png'
import chargingBefore from '../../assets/projects/sonimod delivery/chargingBefore.png'
import chargingAfter from '../../assets/projects/sonimod delivery/chargingAfter.png'
import chargingMap from '../../assets/projects/sonimod delivery/chargingMap.png'
import onTheWay from '../../assets/projects/sonimod delivery/onTheWay.png'
import waitToConfirm from '../../assets/projects/sonimod delivery/waitToConfirm.png'
import returned from '../../assets/projects/sonimod delivery/returnCard.png'

export const deliveryStudy = {
  title: 'Robot Delivery System Design',
  tags: ['Robot', 'Delivery', 'toB', 'Research'],
  meta: [
    { label: 'Year', value: '2026' },
    { label: 'Client', value: 'Sonimod' },
    { label: 'Category', value: 'Case Study' },
    { label: 'Role', value: 'UIUX Design' }
  ],
  hero: {
    src: cover,
    alt: 'Robot delivery dashboard opened on a laptop'
  },

  background: {
    blocks: [
      {
        title: 'What is the system for ?',
        lines: [
          { parts: [['To B-side operation system', 'b'], [' building to help Sonimod manage their restaurants, and provide '], ['automatic robot delivery', 'b'], [' to reduce operation cost.']] },
          { parts: [['It contains Dashboard, robot management, store operations modules.']] }
        ]
      },
      {
        title: 'About Sonimod',
        lines: [
          { parts: [['An Italian restaurant chain, famous for its pizza.']] },
          { parts: [['They decide to use automotive vehicle - robot delivery to offer their food delivery service.', 'b']] }
        ]
      }
    ],
    problems: [
      'Promote robot delivery - reduce the customers’ complaints due to robot issues',
      'Reduce mistakes in operation',
      'Manage product data quickly and accurately'
    ],
    challenges: [
      'Robot delivery exception handling',
      'Multi - users management & user permissions',
      'Customers reports handling due to robot issues'
    ]
  },

  needs: {
    intro: [
      { parts: [['To talk with Sonimod, we divide their roles in '], ['four groups,', 'b'], [' CEOs, managers, staff, and kitchen clerks.']] },
      { parts: [['The most important for us is the '], ['Staff group', 'b'], [' as the most frequently system users and frontier to face with customers']] }
    ],
    rows: [
      {
        role: 'CEO',
        needs: [
          [{ parts: [['Know operation data to estimate market trend']] }],
          [{ parts: [['Make right decisions', 'b'], [' with provided data']] }]
        ],
        sectors: ['Dashboard', 'Balance']
      },
      {
        role: 'Manager',
        needs: [
          [{ parts: [['Know operation data, manage staff']] }],
          [{ parts: [['Know emergency and '], ['handle urgent cases', 'b'], [' to ensure local store runs well']] }],
          [{ parts: [['Improve customer satisfaction.']] }],
          [{ parts: [['Increase store’s profits']] }]
        ],
        sectors: ['Dashboard', 'Operation', 'Balance', 'Product']
      },
      {
        role: 'Staff',
        needs: [
          [{ parts: [['Know customers’ complaints, deal with it in time']] }],
          [{ parts: [['Know order state, manage order smoothly, '], ['reduce mistakes', 'b']] }],
          [{ parts: [['Know robots state, '], ['manage robot delivery', 'b']] }]
        ],
        sectors: ['Dashboard', 'Operation', 'Robot', 'Delivery', 'Order']
      },
      {
        role: 'Kitchen Clerk',
        needs: [
          [{ parts: [['Know order tasks to make dishes']] }],
          [{ parts: [['Know food status to ensure well operation']] }]
        ],
        sectors: ['Operation', 'Kitchen', 'Product']
      }
    ],
    cards: [
      {
        role: 'CEO',
        lines: ['Hard to compare the data with market trend', 'Lack robot usage data to compare the profits after using it']
      },
      {
        role: 'Manager',
        lines: [
          'Don’t know robot’s issue when delivery, so hard to deal with customers, resulting low customer satisfaction'
        ],
        bullets: [
          { parts: [['Hard to track the operator, who make mistakes. Sometimes, '], ['repeated operations', 'b'], [' may happen, and cannot credit the performance']] }
        ]
      },
      {
        role: 'Staff',
        bullets: [
          { parts: [['Easy to fill in wrong information in forms']] },
          { parts: [['Easy to forget deal with customers’ '], ['feedback', 'b'], [' in time, due to busy work in store. Result in '], ['high complaints', 'b']] },
          { parts: [['There so many cases, we '], ['don’t know the food status', 'b'], [' when reach the customer. It may have some issues but we don’t know, so we need to carefully avoid it.']] }
        ]
      },
      {
        role: 'Kitchen Clerk',
        lines: ['Check food status and fill in one by one, really consuming time', 'Easy to fill in wrong data when busy']
      }
    ]
  },

  space: {
    lead: 'Sonimod wants to',
    items: [
      'reduce human operation mistakes when input the information,',
      'monitor robot status in real time to avoid issue,',
      'deal with issues immediately to reduce customers’ complaints.'
    ]
  },

  strategy: [
    { index: '01', title: 'RBAC Model Design', points: ['Customizable dashboard', 'Role-based permissions'] },
    { index: '02', title: 'Real Time Feedback', points: ['Robot edge cases feedback', 'Real time robot delivery monitor'] },
    { index: '03', title: 'Issues First', points: ['Prioritize to place important issues in the first place to make them visible'] }
  ],

  design: {
    intro: [
      { parts: [['We used dashboard to helps users digest data from multiple sources at a glance.']] },
      { parts: [['We design '], ['tailored dashboards for different users', 'b'], [' based on their needs.']] }
    ],
    dashboards: [
      { role: 'Staff’s', note: 'Focusing on specific cases', src: staffDashboard, alt: 'Staff dashboard with order issues and order status' },
      { role: 'CEO’s', note: 'Focusing on overall data', src: ceoDashboard, alt: 'CEO dashboard with overall revenue data' },
      { role: 'Manager’s', note: 'Focusing on managing', src: managerDashboard, alt: 'Manager dashboard with staff performance' }
    ],
    flowIntro: [
      { parts: [['We draw the diagram to illustrate the users and robot’s roles and operations in delivery. So, clarify the responsibilities, '], ['recognize the possible problems', 'b'], [' and find the '], ['opportunities', 'b'], ['.']] }
    ],
    patterns: { src: patterns, alt: 'Pattern legend between staff, robot and customer' },
    flow: [
      {
        node: 'Ready Meal',
        groups: [{ who: 'Kitchen Clerk', lines: ['Finish the meal, input to system'] }]
      },
      {
        node: 'Choose Robot',
        groups: [
          { who: 'Staff', lines: ['Choose the robot on system', 'Choose the route', 'Contact the customer info to robot', 'Put food in robot'] },
          { who: 'Robot', lines: ['Send message to customer'] }
        ]
      },
      {
        node: 'Delivery',
        groups: [
          { who: 'Staff', lines: ['Monitor the delivery status', 'If exception happens, deal with it'] },
          { who: 'Robot', lines: ['Delivery on the road', 'Send message to system & customer if exception happens'] },
          { who: 'Customer', lines: ['Receive the message', 'Wait the output'] }
        ]
      },
      {
        node: 'Wait to Confirm',
        groups: [
          { who: 'Staff', lines: ['Monitor the delivery status', 'If exception happens, deal with it'] },
          { who: 'Robot', lines: ['Return to designated store', 'Send message to system if exception happens'] }
        ]
      },
      {
        node: 'Return',
        groups: [
          { who: 'Staff', lines: ['Monitor the delivery status', 'If exception happens, deal with it', 'Send the message to customer', 'Wait to confirm the receipt', 'Send message to system if customer refused to accept'] },
          { who: 'Customer', lines: ['Scan and take the food', 'If refuse, contact the store'] }
        ]
      }
    ]
  },

  delivery: {
    record: {
      title: 'Record',
      body: [
        { parts: [['record the operator and all the initial data to track. Help manager '], ['clarify the responsibility', 'b'], [' and credit the performance']] }
      ],
      image: mapScreen,
      alt: 'Delivery monitoring screen with route and robot state'
    },
    features: [
      {
        chipImage: chargingMap,
        title: 'Choose the robot',
        body: [
          { parts: [['To '], ['reduce the robot issue caused by low battery', 'b'], [', we provide the instruction for users to help them choose the battery at least over 85% robot to process the task']] }
        ]
      },
      {
        title: 'Choose the route',
        body: [
          { parts: [['To '], ['reduce the traffic issue', 'b'], [' we provide different routes for users to choose. If the robot meet the '], ['traffic congestion (wait over 10min)', 'b'], [' they would '], ['auto re-organize the route', 'b'], [', and '], ['send', 'b'], [' the message back to staff and also to the customer']] }
        ],
        image: chooseRoute,
        alt: 'Route selection with three route options and map preview'
      }
    ]
  },

  exception: {
    intro: [
      { parts: [['Set the diagram for robot delivery process, considering all the phases and possible issues. Design the handling cases in different situation to ensure effective feedback to both customers and staff.']] }
    ],
    diagram: { src: robotDiagram, alt: 'Exception handling flow of the robot delivery' },
    categoriesNote: [
      { parts: [['Categorized the possible issues into different types, so that to support the flow design.']] }
    ],
    graph: { src: issueGraph, alt: 'Exception categories: robot, traffic, weather, operation and emergency issues' },
    kanbanNote: [
      { parts: [['On the management page, I designed the kanban card with robot status, helping staff view and manage the bots.']] }
    ],
    statusCards: [
      { src: onTheWay, alt: 'On the way status card' },
      { src: waitToConfirm, alt: 'Wait to confirm status card' },
      { src: returned, alt: 'Return status card' }
    ],
    handlingTitle: 'Exception Handling',
    handlingBody: [
      { parts: [['We also set the exception card to help users recognize the exceptions and deal with them in time. So as to reduce customers complaints.']] }
    ],
    card: { src: issueCard, alt: 'Exception card showing a traffic issue with order code and location' }
  },

  product: {
    laptop: { src: productLaptop, alt: 'Product management table with selected rows and instruction popover' },
    title: 'Reduce User’s Cognitive Load to reduce operation mistakes',
    body: [
      { parts: [['We categorize the operations as two types - '], ['modify globally \\& modify individually', 'b']] },
      { parts: [['(Note: “modify globally” one are the less frequently used functions)']] },
      { parts: [['Re-order the operations to '], ['hide those operation can be modified globally', 'b'], [', which can be modified globally.']] },
      { parts: [['Only when user choose the items they appear, and can be operate by one click']] },
      { parts: [['Reserve the “edit” button for each item to modify separately.']] }
    ],
    table: { src: productTable, alt: 'Product list after re-ordering the operations' },
    shift: { src: shiftBoard, alt: 'Shift management board with permission note and toast notification states' }
  },

  usability: {
    title: 'We used Cognitive Walkthrough to test prototypes and optimized design',
    intro: [
      'We set several rounds walkthrough to test the usability and optimized the design.',
      'The FEEDBACK card on dashboard. This is important, which aims to help customers connect Sonimod in time. Also, help staff realise the problems and provide better service for their customers..',
      'So, we want to draw users attention to the cards, but also keep visual harmonious in dashboard'
    ],
    iterations: [
      {
        index: '1',
        label: 'First version',
        image: reportBefore,
        alt: 'First version of the feedback report card',
        points: [
          { ok: true, parts: [['Highlight', 'b'], [' the “Report” title to remind']] },
          { ok: false, parts: [['support text and information layout is unreasonable, and text color contrast is on reverse.']] },
          { ok: null, parts: [['Users can hardly get the useful information at first glance']] }
        ]
      },
      {
        index: '2',
        label: 'Second version',
        image: reportSecond,
        alt: 'Second version of the feedback report card with background',
        points: [
          { ok: true, parts: [['Add background to draw users attention']] },
          { ok: false, parts: [['Too obvious in whole dashboard, break the visual harmonious']] }
        ]
      },
      {
        index: '3',
        label: 'Final version',
        image: reportFinal,
        alt: 'Final version of the feedback report card',
        points: [
          { ok: true, parts: [['Change the “Report” background, add light red to enhance but '], ['keep harmonious', 'b']] },
          { ok: true, parts: [['Rearrange the information layout:']] },
          { ok: null, parts: [['1.replace the “arrow” button with '], ['direct order number link to click', 'b'], [', cause users are more focus on which order when report happens. '], ['More intuitive', 'b']] },
          { ok: null, parts: [['2. decrease support text font size, add contrast on font size to enhance '], ['important information', 'b']] }
        ]
      }
    ],
    stateCards: {
      title: 'The robot state cards',
      intro: [
        {
          parts: [
            ['As on the “Robot management” page, all the cards are similar designed, and when users want to know more information, they need to hover or click, causes '],
            ['inefficiency', 'b'],
            [' in real work']
          ]
        }
      ],
      rows: [
        {
          name: 'Delivery Card',
          before: deliveryBefore,
          beforeAlt: 'Delivery card before the redesign',
          after: deliveryAfter,
          afterAlt: 'Delivery card with estimated and left time',
          notes: [
            { parts: [['1. Add time information making it intuitive']] },
            { parts: [['2. Add distance with numbers']] },
            { parts: [['3. Use font and color contrast to enhance '], ['vital information', 'b']] }
          ]
        },
        {
          name: 'Charging Card',
          before: chargingBefore,
          beforeAlt: 'Charging card before the redesign',
          after: chargingAfter,
          afterAlt: 'Charging card with battery level and charging state',
          notes: [
            { parts: [['1. Add '], ['illustration text', 'b'], [' to make it more clearly']] },
            { parts: [['2. Use icon to make it intuitive to users about the robot’s state']] }
          ]
        },
        {
          name: 'Fixing Card',
          before: fixBefore,
          beforeAlt: 'Fixing card before the redesign',
          after: fixAfter,
          afterAlt: 'Fixing card with fix period and contact person',
          notes: [
            { parts: [['1. Add fix period and start date to make it '], ['intuitive', 'b'], [' to users']] },
            { parts: [['2. Embedded the contact information with the person’s name. So, users can click to contact directly']] }
          ]
        }
      ]
    }
  }
}
