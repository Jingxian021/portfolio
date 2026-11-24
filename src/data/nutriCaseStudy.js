// ---------- Nutri Notebook case study data ----------
// 版式参照 nutri - section 1~9，文案来自 content.md

import heroScene from '../../assets/projects/nutrinotebook/image 306.png'

// Background
import statSubHealth from '../../assets/projects/nutrinotebook/Frame 427320780.png'
import diaryTableA from '../../assets/projects/nutrinotebook/Frame 427321425 (1).png'
import diaryTableB from '../../assets/projects/nutrinotebook/Frame 427321426.png'
import cardEstimate from '../../assets/projects/nutrinotebook/Frame 427321384.png'
import cardForget from '../../assets/projects/nutrinotebook/Frame 427321383.png'
import cardHabit from '../../assets/projects/nutrinotebook/Frame 427321427.png'

// Persona
import goalsChart from '../../assets/projects/nutrinotebook/Frame 3788.png'
import personaCard from '../../assets/projects/nutrinotebook/Group 3762.png'
import frustrationChart from '../../assets/projects/nutrinotebook/Frame 3822.png'

// Strategy - 1 process
import processNow from '../../assets/projects/nutrinotebook/Group 4052.png'
import processBefore from '../../assets/projects/nutrinotebook/Group 4053.png'

// Strategy - 1 features
import featVoice from '../../assets/projects/nutrinotebook/Group 3822.png'
import featFlexible from '../../assets/projects/nutrinotebook/Group 4051.png'
import featAccuracy from '../../assets/projects/nutrinotebook/Group 4055 (1).png'
import featPhoto from '../../assets/projects/nutrinotebook/Group 3851.png'
import featCategorize from '../../assets/projects/nutrinotebook/recording.png'

// Usability test
import testVersions from '../../assets/projects/nutrinotebook/Group 3867.png'
import testPrompt from '../../assets/projects/nutrinotebook/Group 3868.png'

// Strategy - 2
import calMonth from '../../assets/projects/nutrinotebook/calendar month.png'
import calWeek from '../../assets/projects/nutrinotebook/calendarweek.png'
import recSalad from '../../assets/projects/nutrinotebook/image 498.png'
import recCereal from '../../assets/projects/nutrinotebook/image 499.png'
import recSmoothie from '../../assets/projects/nutrinotebook/image 500 (1).png'
import recBerries from '../../assets/projects/nutrinotebook/image 501.png'
import pieVitamins from '../../assets/projects/nutrinotebook/Group 4058.png'

// Strategy - 3
import habitHome from '../../assets/projects/nutrinotebook/thisis a table.png'
import habitSquare from '../../assets/projects/nutrinotebook/cardflow.png'
import habitHandheld from '../../assets/projects/nutrinotebook/image 301.png'

// Theme color
import colorTheme from '../../assets/projects/nutrinotebook/Group 3981.png'
import colorNormal from '../../assets/projects/nutrinotebook/Group 3984.png'
import colorMinor from '../../assets/projects/nutrinotebook/Group 3979.png'

export const nutriCaseStudy = {
  slug: 'nutri-notebook',
  title: 'Nutri Notebook Mobile App Design',
  tag: ['Health', 'Research', 'toC'],
  meta: [
    { label: 'Year', value: '2023' },
    { label: 'Client', value: 'NSW. Gov.' },
    { label: 'Category', value: 'Case Study' },
    { label: 'Role', value: 'UIUX Design' },
    { label: 'Team', value: 'Jessie / Morvan / Sue / Micheal / Pandy / Shruti / Savanarh' }
  ],
  hero: heroScene,

  // ---------- 1. Background (mint) ----------
  background: {
    chip: 'Background',
    stat: { src: statSubHealth, alt: '50% Gen-Z sub-health' },
    intro:
      'The NSW government hopes to help young people to build a healthy lifestyle, through enhancing their nutrition knowledge and establishing healthy eating habits.',
    diary: {
      title: 'Diary Study',
      lead: 'We’ve done the Diary Study to understand specific problems users might meet, and turn it into tables.',
      tables: [
        { src: diaryTableA, alt: 'Diary study table A' },
        { src: diaryTableB, alt: 'Diary study table B' }
      ],
      follow: 'By categorized and re-ordered data, we found the most important problems to our target user.',
      cards: [
        { src: cardEstimate, alt: 'hard to accurately estimate', size: 'lg' },
        { src: cardForget, alt: 'easy to forget to record', size: 'md' },
        { src: cardHabit, alt: 'hard to turn into a habit', size: 'sm' }
      ]
    }
  },

  // ---------- 2. Persona (white) ----------
  persona: {
    chip: 'Persona',
    lead: 'We’ve gained the surveys from target user, collected the effective data to conclude our persona.',
    goals: { src: goalsChart, alt: 'Goals: 65% regular diet, 25% build healthy lifestyle, 15% learn nutrition knowledge' },
    card: { src: personaCard, alt: 'Zola Walsh persona card' },
    quote:
      'Despite her organized nature, she struggles to establish a consistent healthy-eating routine because she lacks practical methods, finds traditional food-tracking too time-consuming, and quickly loses motivation when results are not immediately visible. Her primary goal is to integrate reliable nutrition knowledge into a simple, sustainable system that fits her busy work schedule and supports long-term wellness.',
    frustration: { src: frustrationChart, alt: 'Frustration: 60% lack time, 21% lack methods, 19% lack motivation' }
  },

  // ---------- 3. Strategy (white) ----------
  strategy: {
    chip: 'Strategy',
    items: [
      { index: '1', title: 'Help user quickly take record', points: ['AI assistant', 'Voice Input', 'Uploading Image'] },
      { index: '2', title: 'Help user increase nutrition knowledge', points: ['Recommend Articles', 'Set Calendar Remind'] },
      { index: '3', title: 'Help user build recording habit', points: ['Setting goals', 'Social connection'] }
    ]
  },

  // ---------- 4. Strategy - 1 process (light) ----------
  process: {
    chip: 'Strategy - 1',
    now: { title: 'What We’ve Done', src: processNow, alt: 'What we’ve done: open app, photo or voice input, check results, done' },
    before: { title: 'Previous Recording Process', src: processBefore, alt: 'Previous recording process: open app, take photo, search web, calculate serves, write down' },
    less: { left: 'LESS', right: ['STEPS,', 'TIME CONSUMING'] }
  },

  // ---------- 5. Strategy - 1 features (white) ----------
  features: [
    {
      title: '',
      body: '',
      images: [{ src: featVoice, alt: 'Voice recording concept', size: 'md' }],
      layout: 'center'
    },
    {
      title: 'Flexible Control',
      body: 'User can manually stop generation, and click to continue.',
      images: [{ src: featFlexible, alt: 'Flexible control: manually stop generation', size: 'md-sm' }],
      layout: 'center'
    },
    {
      title: 'Accuracy',
      body:
        'If input is ambiguous, AI assist will ask for more information to confirm, so that has improved the accuracy of generation result.',
      images: [{ src: featAccuracy, alt: 'AI clarification improves accuracy', size: 'lg' }],
      layout: 'center'
    },
    {
      title: 'Image Pick-up\nEasy Selecting',
      body: 'Using images to clear illustrate the food type, helping user quickly select and record their intake.',
      images: [{ src: featPhoto, alt: 'Photo pick-up component', size: 'sm' }],
      layout: 'pair-left'
    },
    {
      title: 'Categorize Nutrition',
      body: 'When recording, automatically categorize food in different types of nutrition. Help to accurately record.',
      images: [{ src: featCategorize, alt: 'Categorized serves confirmation', size: 'sm' }],
      layout: 'pair-right'
    }
  ],

  // ---------- 6. Usability Test (mint gradient) ----------
  usability: {
    chip: 'Usability Test',
    items: [
      {
        title: 'Card Sorting',
        body:
          'Using card-style design, displays nutritional intake in categories, and makes data clear at a glance.',
        note: 'Data visualization makes it easier for users to read information efficiently.',
        src: testVersions,
        alt: 'Version 1, version 2 and final card layout comparison — UV +20%'
      },
      {
        title: 'Added background prompt',
        body: 'Using background colour and shadow to highlight the latest recording.',
        note: 'Differentiated display to indicate information categories.',
        src: testPrompt,
        alt: 'Latest record highlighted with background and shadow',
        portrait: true
      }
    ]
  },

  // ---------- 7. Strategy - 2 (white + mint band) ----------
  calendar: {
    chip: 'Strategy - 2',
    phones: [
      { src: calMonth, alt: 'Monthly calendar view' },
      { src: calWeek, alt: 'Weekly calendar view' }
    ],
    blocks: [
      {
        title: 'Calendar',
        body:
          'Provide monthly and weekly recordings to help users check and review their status easily. Visualise the amount to show intake serves.'
      },
      {
        title: 'Accurate Reviewing',
        body:
          'Weekly Records show details in specific time and emphasize the amount of serves. Users can pick up valid information immediately.'
      }
    ],
    recommendTitle: 'Provide different recommendations according to users’ preference',
    recommend: [
      { src: recSmoothie, alt: 'Smoothies Health recommendation' },
      { src: recCereal, alt: 'Breakfast Cereal recommendation' },
      { src: recBerries, alt: 'Berries recommendation' }
    ],
    bandTitle: 'Details in nutrition display',
    bandCard: { src: recSalad, alt: 'Salad Greens detail card' },
    bandPie: { src: pieVitamins, alt: 'Vitamin intake pie chart' }
  },

  // ---------- 8. Strategy - 3 (white + gray band) ----------
  habit: {
    chip: 'Strategy - 3',
    blocks: [
      {
        title: 'Display Goals Achievement',
        body: 'Visualizing targets to remind users their process, which can motivate user to achieve their goals.'
      },
      {
        title: 'Share With Friends',
        body:
          'Through the friend sharing mechanism, users are encouraged to participate in nutrition knowledge learning, record, and establish good nutrition habits.'
      }
    ],
    home: { src: habitHome, alt: 'Home screen with health goals' },
    square: { src: habitSquare, alt: 'Square feed with emoji reactions' },
    emojiBody: 'Provides various emoji to allow users express their emotions, creating a good vibe for users.',
    handheld: { src: habitHandheld, alt: 'Hand holding phone showing Square feed' }
  },

  // ---------- 9. Theme Color (white) ----------
  theme: {
    chip: 'Theme Color',
    swatch: '#2f7d63',
    heading: 'Why we use healthy green (#003E9C)?',
    rows: [
      { label: 'Our Client', value: 'NSW Gov.', note: 'Reliable & professional' },
      { label: 'Our Target User', value: 'Youngsters', note: 'Individuality, rebellion, independence' },
      { label: 'Our Product', value: 'Health Category', note: 'Healthy, professional, & reliable' }
    ],
    notes: [
      {
        title: 'Theme',
        body: 'Choose deep green to represent health theme.',
        image: { src: colorTheme, alt: 'Theme: deep green' }
      },
      {
        title: 'Normal',
        body:
          'Increase grayscale and decrease saturation to reduce the eye strain caused by colors, thereby establishing a reliable and professional tool image.',
        image: { src: colorNormal, alt: 'Normal: green ramp with lower saturation' }
      },
      {
        title: 'Minor',
        body:
          'Increase brightness and color vibrancy to match the distinct personalities of young users.',
        image: { src: colorMinor, alt: 'Minor: brighter mint tones' }
      }
    ]
  }
}
