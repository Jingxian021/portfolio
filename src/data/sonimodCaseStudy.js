/* Sonimod Official Site Design — case study data */
import cover from '../../assets/projects/sonimod official site/cover.png'
import researchTable from '../../assets/projects/sonimod official site/research table.png'
import personaElla from '../../assets/projects/sonimod official site/persona ella.png'
import personaMai from '../../assets/projects/sonimod official site/persona mai.png'
import personaMarco from '../../assets/projects/sonimod official site/persona marco.png'
import personaAll from '../../assets/projects/sonimod official site/persona.png'
import deliveryMap from '../../assets/projects/sonimod official site/delivery map.png'
import detailTestimony from '../../assets/projects/sonimod official site/detail and testimony.png'
import hoverCard from '../../assets/projects/sonimod official site/hover card.png'
import motionCard from '../../assets/projects/sonimod official site/motion card.png'
import checkIn from '../../assets/projects/sonimod official site/check in page.png'
import homePage from '../../assets/projects/sonimod official site/first screen.png'
import checkProcess from '../../assets/projects/sonimod official site/check process modal.png'
import orderDetail from '../../assets/projects/sonimod official site/detail.png'
import payment from '../../assets/projects/sonimod official site/payment modal.png'
import weather from '../../assets/projects/sonimod official site/weather modal.png'
import coachMark from '../../assets/projects/sonimod official site/coach mark.png'
import notFound from '../../assets/projects/sonimod official site/404 modal.png'

export const sonimodCaseStudy = {
  title: 'Sonimod Official Site Design',
  tags: ['Foodchain', 'toC', 'Web'],
  meta: [
    { label: 'Year', value: '2023' },
    { label: 'Client', value: 'Sonimod' },
    { label: 'Category', value: 'Case Study' },
    { label: 'Role', value: 'UIUX' },
    // { label: 'Team', value: 'Jessie / Bruce' }
  ],
  hero: {
    src: cover,
    alt: 'Sonimod official site cover',
    w: 1440,
    h: 800,
  },

  background: {
    id: 'sn-background',
    title: 'Background',
    body:
      'Considering the high traffic issue, bad user experience and low efficiency in food order market, Sonimod wants to provide a **robotic delivery technology** to address the problems.',
    arrow: 'left'
  },

  needs: {
    id: 'sn-needs',
    clientsPill: "Client's Needs",
    clientsItems: [
      'Improve customer satisfaction',
      'Promote robot delivery & reduce costs'
    ],
    customersPill: "Customers' Needs",
    customersItems: [
      'Concise order steps',
      'Customizable food',
      'Clear instruction',
    ]
  },

  research: {
    id: 'sn-research',
    title: 'Research',
    arrow: 'down',
    subTitle: 'Online Ethnography',
    method:
      'We conducted a user survey using online ethnography, focusing on Yelp and Zomato, and selected six typical customer reviews. When selecting samples, we selected users with more than 50 reviews and 20 followers, who were considered to be long-term users of the platform and trustworthy (excluding the possibility of automatic replies and malicious reviews).',
    resultTitle: 'Research Result',
    resultStat: {
      value: '60',
      suffix: 'of users are dissatisfied with the Yelp & Zomato\u2019s ordering services.'
    },
    painPoints: [
      'Complicated Order Process',
      'Easy To Make Mistakes',
      'Lack Of Effective Feedback',
      'Complex Interface'
    ],
    analysisTitle: 'Analysis',
    analysis: [
      'User wants **simple & friendly interface**',
      'User wants **detailed food information**',
      'User wants **simple order process**'
    ],
    jtbdTitle: 'Jobs-To-Be-Done',
    jtbdBody:
      'Based on the results of the user demand surveys from the market platform, we used **Jobs-To-Be-Done** to create user demand scenarios, gradually narrowed them, and summarized the parts that need improvement.',
    severityTitle: 'Severity Ratings',
    severityBody:
      'Use **Severity Rating** to evaluate the above issues, score them according to weight, and filter out the parts that need urgent improvement.',
    severityTable: { src: researchTable, alt: 'Severity ratings table', w: 990, h: 600 }
  },

  userProfile: {
    id: 'sn-profile',
    title: 'User Profile',
    arrow: 'left',
    overview: { src: personaAll, w: 990, h: 617, alt: 'Three personas overview — Ella, Marco and Mei' },
    personas: [
      { name: 'Ella', card: { src: personaElla, w: 400, h: 720, alt: 'Persona Ella — 18-year-old female, Chatswood NSW, high school student' } },
      { name: 'Marco', card: { src: personaMarco, w: 400, h: 720, alt: 'Persona Marco — 31-year-old male, Sydney NSW, freelancer & blogger' } },
      { name: 'Mei', card: { src: personaMai, w: 400, h: 720, alt: 'Persona Mei — 44-year-old female, Melbourne VIC, housewife' } }
    ]
  },

  strategy: {
    id: 'sn-strategy',
    title: 'Strategy',
    arrow: 'down',
    cards: [
      {
        dot: '#e53935',
        number: '01',
        title: 'Simplify Ordering Process',
        points: [
          'Sidebar filtering mechanism to improve search efficiency',
          'One-click shopping function to shorten the ordering process'
        ]
      },
      {
        dot: '#f9a825',
        number: '02',
        title: 'Provide Food Details To Customize',
        points: [
          'Customized food options',
          'Food label display to improve decision-making speed',
          'Rating system to provide reasonable reference & improve satisfaction'
        ]
      },
      {
        dot: '#fb8c00',
        number: '03',
        title: 'Instant Feedback',
        points: [
          '7/24 Help Center',
          'One-time QR code scanning',
          'Food allergen reminder'
        ]
      },
      {
        dot: '#43a047',
        number: '04',
        title: 'Robot Delivery',
        points: [
          'Real-time delivery tracking',
          'Delivery data display',
          'Delivery announcement reminder'
        ]
      }
    ]
  },

  strategy1: {
    id: 'sn-strategy1',
    number: '1',
    tone: 'cream',
    sub: 'Simplify Ordering Process',
    tailPair: true,
    images: [
      { src: homePage, alt: 'Home page' },
      { src: motionCard, alt: 'Motion card' },
      { src: orderDetail, alt: 'Details' },
      { src: payment, alt: 'Payment modal' },
      { src: notFound, w: 480, h: 600, alt: '404 modal' },
      { src: checkIn, alt: 'Check in page' },
      { src: checkProcess, alt: 'Check the progress' },
    ]
  },

  strategy2: {
    id: 'sn-strategy2',
    number: '2',
    sub: 'Food Customization',
    body: 'Provide different recommends according to users\u2019 preference',
    images: [
      { src: hoverCard, alt: 'Assistant agent' },
      { src: coachMark, alt: 'Coach mark' },
    ]
  },

  strategy3: {
    id: 'sn-strategy3',
    number: '3',
    // headAlign: 'left',
    sub: 'Instant Feedback',
    images: [
      { src: detailTestimony, alt: 'Detail and testimony' },
    ]
  },

  strategy4: {
    id: 'sn-strategy4',
    number: '4',
    sub: 'Robot Delivery',
    images: [
      { src: weather, w: 480, h: 600, alt: 'Weather modal' },
      { src: deliveryMap, w: 990, h: 600, alt: 'Delivery map' },
    ]
  }
}
