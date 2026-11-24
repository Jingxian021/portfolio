import noteCover from '../../assets/projects/note editor/note editor cover.png'
import appPanel from '../../assets/projects/note editor/bg the app.png'
import functionsPanel from '../../assets/projects/note editor/bg function support.png'
import goodNotes from '../../assets/projects/note editor/good notes icon.png'
import notability from '../../assets/projects/note editor/notability icon.png'
import oneNote from '../../assets/projects/note editor/onenote icon.png'
import positioningAcademic from '../../assets/projects/note editor/academic focused.png'
import positioningCollege from '../../assets/projects/note editor/college based.png'
import searchabilityData from '../../assets/projects/note editor/data-01.png'
import leftHandData from '../../assets/projects/note editor/data-02.png'
import takingNotesData from '../../assets/projects/note editor/data-taking notes.png'
import reviewingNotesData from '../../assets/projects/note editor/reviewing notes.png'
import writingPapersData from '../../assets/projects/note editor/data writing papers.png'
import scenario1Avatar from '../../assets/projects/note editor/scenario-1 avatar.png'
import scenario2Avatar1 from '../../assets/projects/note editor/scenario-2 avatar-1.png'
import scenario2Avatar2 from '../../assets/projects/note editor/scenario-2 avatar-2.png'
import scenario2Avatar3 from '../../assets/projects/note editor/scenario-2 avatar-3.png'
import scenario3Avatar1 from '../../assets/projects/note editor/scenario-3 avatar-1.png'
import scenario3Avatar2 from '../../assets/projects/note editor/scenario-3 avatar-2.png'
import voiceRecording from '../../assets/projects/note editor/voice recording-1280.png'
import voiceNoting from '../../assets/projects/note editor/voice-noting-390.png'
import voiceTool from '../../assets/projects/note editor/voice-tool-390.png'
import voiceNoteTaking from '../../assets/projects/note editor/voice note taking.png'
import voiceEditable from '../../assets/projects/note editor/voice-recordings-card-390.png'
// import voiceBackground from '../../assets/projects/note editor/voice background.webp'
import aiAgent from '../../assets/projects/note editor/ai agent.png'
import overCapacity from '../../assets/projects/note editor/OverCapacity_PopupCard.png'
import wrongSpelling from '../../assets/projects/note editor/wrong spelling.png'
import tooNoisy from '../../assets/projects/note editor/TooNoise_PopupCard.png'
import immersiveRecording from '../../assets/projects/note editor/Immersive recording.png'
import closeupRecording from '../../assets/projects/note editor/closeup recording.png'
import solution2 from '../../assets/projects/note editor/Solution2.png'
import pressOne from '../../assets/projects/note editor/gesture press one finger.png'
import pressTwo from '../../assets/projects/note editor/gesture press two fingers.png'
import rotation from '../../assets/projects/note editor/gesture rotation.png'
import clickOne from '../../assets/projects/note editor/gesture click one finger.png'
import clickTwo from '../../assets/projects/note editor/gesture click two fingers.png'
import zoomIn from '../../assets/projects/note editor/zoom in.png'
import zoomOut from '../../assets/projects/note editor/zoom out.png'
import coachMark from '../../assets/projects/note editor/coach mark.png'
import fileShowcase from '../../assets/projects/note editor/file showcase.png'
import folderShowcase1 from '../../assets/projects/note editor/folder showcase-1.png'
import folderShowcase2 from '../../assets/projects/note editor/folder showcase-2.png'
import fileManage from '../../assets/projects/note editor/file manage.png'
import notesManage from '../../assets/projects/note editor/notes manage.png'
import insertFiles from '../../assets/projects/note editor/insert files.png'
import inFileSearch from '../../assets/projects/note editor/in file search.png'
import solution4a from '../../assets/projects/note editor/Solution4-01.png'
import solution4b from '../../assets/projects/note editor/Solution4-02.png'
import designTokens from '../../assets/projects/note editor/design system.png'
import spacingTokens from '../../assets/projects/note editor/spacing.png'
import radiusTokens from '../../assets/projects/note editor/radius.png'
import icons from '../../assets/projects/note editor/icons.png'
import noFiles from '../../assets/projects/note editor/no files.png'
import noWifi from '../../assets/projects/note editor/no wifi.png'
import noProjects from '../../assets/projects/note editor/no projects.png'
import noPermission from '../../assets/projects/note editor/no permission.png'

export const noteEditorStudy = {
  slug: 'note-editor',
  title: 'Note Editor SaaS Design',
  documentTitle: 'Note Editor SaaS Design — Jessie Guan',
  tags: ['SaaS', 'toC'],
  meta: [
    { label: 'Year', value: '2025' },
    { label: 'Client', value: 'Kspark' },
    { label: 'Category', value: 'Tool' },
    { label: 'Role', value: 'UIUX' },
    { label: 'Team', value: 'Jesse / Alex / William' }
  ],
  hero: {
    src: noteCover,
    alt: 'Note Editor file dashboard on a tilted tablet'
  },

  about: {
    lede: 'This is a **multifunction SaaS application, including note editor, md docs, and whiteboard**. It aims to assist college students and professors’ research and study work. The using scenario will be in the lectures and tutorials to take notes, in the discussions to discuss, and in the study & research session to review notes.',
    panels: [
      {
        src: appPanel,
        alt: 'The App: notes hand-written editor, docs multi-formation document, and whiteboard discussion canvas'
      },
      {
        src: functionsPanel,
        alt: 'Functions support: infinite canvas, traditional pages, AI assistant, multi-user collaboration, multi-formation noting, and discussion'
      }
    ]
  },

  competitors: {
    groups: [
      {
        label: 'Direct Competitors',
        tone: 'direct',
        items: [
          {
            name: 'Good Notes',
            logo: goodNotes,
            group: 'direct',
            features: ['whiteboard', 'pdf annotation', 'project planning', 'handwritten note taking', 'across platform'],
            focus: 'Collaboration faced,\nhand written based',
            model: 'Subscription Model\nPaid Templates',
            share: '35% - 45%'
          },
          {
            name: 'Notability',
            logo: notability,
            group: 'direct',
            features: ['study material', 'handwritten note taking', 'audio transcript', 'collaboration', 'across platform'],
            focus: 'Study faced,\nhand written based',
            model: 'Subscription Model',
            share: '10%'
          }
        ]
      },
      {
        label: 'Possible Competitors',
        tone: 'possible',
        items: [
          {
            name: 'OneNote',
            logo: oneNote,
            group: 'possible',
            features: ['Text note taking', 'annotation', 'collaboration', 'audio', 'across platform'],
            focus: 'Study faced,\ntext based',
            model: 'windows native for free',
            share: '16% - 20%'
          }
        ]
      }
    ],
    conclusion: ['we need to create different value of product', 'academic scenario has huge potential'],
    ethnography: {
      title: 'Online Ethnography',
      copy: 'I’ve done the **Online Ethnography** to find some feedback from our competitors’ real users. The results showed some problems as below',
      cards: [
        { src: searchabilityData, alt: 'Poor Searchability: 78.1 percent of users' },
        { src: leftHandData, alt: 'Unfriendly to left-hand users: 20.3 percent' }
      ]
    },
    positioning: {
      title: 'Product Positioning',
      cards: [
        {
          src: positioningAcademic,
          alt: 'Positioning 1 — Academic focused: Math and Chemistry dataset, AI tech support'
        },
        {
          src: positioningCollege,
          alt: 'Positioning 2 — College based: lecture scenario, study scenario'
        }
      ]
    }
  },

  research: {
    lede: 'Wrapped up all the information that collected from the research, we concluded the users’ need.',
    painsTitle: 'Pain Points',
    pains: [
      {
        title: 'Taking Notes',
        label: 'Scenario 1',
        stat: takingNotesData,
        tone: 'sky',
        avatars: [scenario1Avatar],
        lines: ['**Hard to record** all the information, when listening the lectures']
      },
      {
        title: 'Reviewing Notes',
        label: 'Scenario 2',
        stat: reviewingNotesData,
        tone: 'white',
        avatars: [scenario2Avatar1, scenario2Avatar2, scenario2Avatar3],
        lines: [
          'Lot of content, **difficult to review & check**',
          'Hard to find **specific content**',
          '**Manage files** burns me out'
        ]
      },
      {
        title: 'Writing Papers',
        label: 'Scenario 3',
        stat: writingPapersData,
        tone: 'mint',
        avatars: [scenario3Avatar1, scenario3Avatar2],
        lines: [
          '**Formulas are difficult to use** directly from handwritten notes',
          'Difficult to text formulas in'
        ]
      }
    ],
    needsTitle: 'Needs',
    needs: [
      'Speedy note-taking to follow classes.',
      'Use it as freely as paper writing.',
      'File management & Content search',
      {
        text: 'Making use of notes efficiently & directly',
        children: ['A. Reviewing notes', 'B. Using Formulas']
      }
    ],
    credit: 'credit: with product team'
  },

  swot: {
    analysisTitle: 'Analysis',
    items: [
      {
        title: 'Strength',
        tone: 'strength',
        body: 'Based on Sunia’s strength - research in chemistry & math, fluent technology in **OCR**, our strength is **academic professional assistant tool** with strong **dataset**.'
      },
      {
        title: 'Weakness',
        tone: 'weakness',
        body: 'Sunia used to be a 2B faced company, **lack of brand awareness** in 2C market. Besides, competitors have already well-known in this area and **owned loyal users**.'
      },
      {
        title: 'Opportunity',
        tone: 'opportunity',
        body: 'Entering the market from one aspect we are skillful at, such as **academic dataset**'
      },
      {
        title: 'Threat',
        tone: 'threat',
        body: 'bloom of AI reduce the value of hand-written tool market. How could we make use of AI to strength the value of our products is important.'
      }
    ],
    ideaTitle: 'Possible Idea',
    ideaLines: ['Focused on academic area to maximize the strength', 'Collaborate with colleges to promote products'],
    credit: 'credit: with product team'
  },

  strategy: {
    hmwTitle: 'How Might We',
    hmws: [
      'help user to speed up their note-taking accurately & usefully?',
      'adapt both left & right hand users?',
      'help user to efficiently manage files & improve searchability?',
      'help user improve efficiency?'
    ],
    title: 'Strategy',
    items: [
      'Use **Voice recording** & **AI assistant** to help user speed up note-taking and improve efficiency',
      'Design **Customizable** & **movable toolbar** to make it adaptive to different users',
      'Designed **Multi-structured file system** to help user efficiently and easily manage their files',
      'Use **Smart OCR** to enhance hand-written formulas'
    ]
  },

  solution1: {
    question: 'help user to speed up their note-taking accurately and usefully?',
    bullets: [
      'Added **Voice Recording**, helping users directly translate the voice into text notes.',
      'We also used **voice to call the AI assistant**, free users’ hands to improve efficiency.'
    ],
    voice: {
      src: voiceRecording,
      alt: 'Voice recording field notes, voice noting toolbar, and editable recordings'
    },
    voiceMobile: [
      { src: voiceNoting, alt: 'Field studies note transcribed from a voice recording' },
      { src: voiceTool, alt: 'Voice noting toolbar with undo, redo, and clear' },
      { src: voiceEditable, alt: 'Editable voice recording with speaker, time, and text controls' }
    ],
    reliabilityTitle: 'How to increasing reliability _&_ reducing cognitive load?',
    reliabilityBullets: [
      '**font weight** to illustrate **content confidence**',
      '**icons** to show source'
    ],
    ai: {
      src: aiAgent,
      alt: 'AI assistant summarising note content and inserting material from a local dataset or into a file'
    },
    locate: {
      src: voiceNoteTaking,
      alt: 'Precisely locating transcribed content inside a handwritten note, with the recording mode explained'
    }
  },

  edge: {
    pill: 'What we have done for the edge cases?',
    cards: [
      {
        tone: 'gray',
        title: '1. over capacity to record',
        paragraphs: [
          'when it reaches the capacity, it will automatically open a new record. Pop-up to inform user. It solve the interruption of clicking to open a new one.',
          '**with the device vibrates to notify users, in case of users don’t view at screen**'
        ],
        figures: [{ src: overCapacity, alt: 'Over Capacity popup explaining that a new recording opens automatically' }]
      },
      {
        tone: 'white',
        title: '2. Background noise',
        paragraphs: [
          'self-supervised and self recognized to modify and use “lines” and “signals” to tag the location to tell users what happened'
        ],
        figures: [{ src: wrongSpelling, alt: 'Unrecognised words flagged in the transcript' }],
        subheading: 'If sound exceeds 60–65 dB',
        paragraphsAfter: [
          '(or when the noise level matches the voice level, or when noise is louder than the speech) show user it cannot be recognized and advice user change to a more quiet environment'
        ],
        figuresAfter: [{ src: tooNoisy, alt: 'Noisy environment warning popup' }]
      },
      {
        tone: 'sky',
        title: '3. Voice function calling confliction',
        paragraphs: [
          'only allow recording when it’s recording, auto shut down the other voice calling functions. Give users the instruction to inform them other functions will be closed when recording'
        ],
        figures: [{ src: immersiveRecording, alt: 'Immersive Recording popup explaining voice function restrictions' }]
      },
      {
        tone: 'gray',
        title: '4. When user need write',
        paragraphs: [
          'Voice recording is just a way to support. Of course we set another mode to allow users writing and the recording will work in behind to finally give users the script.'
        ],
        figures: [{ src: closeupRecording, alt: 'Background recording timer and completion controls' }]
      }
    ]
  },

  solution2: {
    question: 'adapt both left and right hand users?',
    bullets: [
      'We set the toolbar **movable** and this can adapt all the preferred users. Make the interface clear and adaptable'
    ],
    figure: {
      src: solution2,
      alt: 'Movable toolbar around the canvas and customisable toolbar layout'
    },
    gestureTitle: 'We designed the gestures for touch screen, making it easy to use and also match users’ mindset',
    gestures: [
      { key: 'press-one', image: pressOne, text: 'One finger press the toolbar (500ms) to activate it to move' },
      { key: 'click-one', image: clickOne, text: 'One finger twice click the screen to withdraw content' },
      { key: 'press-two', image: pressTwo, text: 'Two fingers press (500ms) toolbar to call out the hidden menu to customize the functions showed in toolbar' },
      { key: 'click-two', image: clickTwo, text: 'Two fingers twice click the screen to cancel the withdraw' },
      { key: 'rotation', image: rotation, text: 'Two fingers to rotate the canvas' },
      { key: 'zoom-in', image: zoomIn, text: 'Two fingers pinch on screen to shrink the canvas' },
      { key: 'zoom-out', image: zoomOut, text: 'Two fingers slide on screen to enlarge the canvas' }
    ],
    coach: {
      image: coachMark,
      alt: 'Coach mark reading: try two fingers press toolbar, customize it',
      text: 'Design Coach Mark for new users',
      credit: 'Collaborated with other designers',
    }
  },

  solution3: {
    question: 'help users efficiently manage files & improve searchability?',
    bullets: [
      'We designed collection bar to deliver different options, it creates an **efficient** & **manageable homepage**.',
      'We also visually presented the files hierarchy to **reduce the users cognitive load** and improve work efficiency'
    ],
    showcase: {
      src: fileShowcase,
      alt: 'Environment Cases file preview'
    },
    manageCopy: 'We designed folders & files that can be organized in order. So that users can easily manage their files.',
    folders: [
      { src: folderShowcase1, alt: 'Tut-02-9001 folder preview' },
      { src: folderShowcase2, alt: 'Workshop Study Case folder with folders and files' }
    ],
    formation: {
      src: fileManage,
      alt: 'File Formation: collection bar and file hierarchy on the Note Editor home'
    },
    features: [
      {
        title: 'In file management',
        copy: 'In the file, we also allow users to change single page order for better sequence.',
        figure: { src: notesManage, alt: 'Reordering individual pages inside a file' }
      },
      {
        title: 'In file links',
        copy: 'It allows users embed files. This helps to **categorize** and manage **files clearly**.',
        figure: { src: insertFiles, alt: 'Embedded file links and an oversized file error state' },
        gesture: {
          image: pressTwo,
          text: 'Two fingers press (500ms) anywhere blank on the screen (in file) to call the menu to insert files.'
        }
      },
      {
        title: 'In file search',
        copy: 'We designed the search function embedded, helping users to easily locate specific content. Except highlighting the key words, we added the **location image** as a support to find content.',
        figure: { src: inFileSearch, alt: 'In-file keyword search with highlighted results and page location previews' }
      }
    ]
  },

  solution4: {
    question: 'help user improve efficiency?',
    copy: 'We added **OCR function** in the toolkit, and it appeared immediately when pinching, easy to find but cost no more space. This helps users translate their notes or scriptures into standard formation, and can be used into formal essays directly. It hugely **reduce the working** and **rewriting time**.',
    figures: [
      { src: solution4a, alt: 'Smart OCR converting a handwritten formula into an editable professional format' },
      { src: solution4b, alt: 'Split screen to review notes after OCR conversion' }
    ]
  },

  system: {
    lede: 'Improve work efficiency for 75%, helpful to across-platform design, adaptive for different theme',
    tokensTitle: 'Design Tokens',
    tokens: { src: designTokens, alt: 'Design token tables for colour, typography, radius, and shadows' },
    spacing: { src: spacingTokens, alt: 'Spacing scale from 4 to 100, support across platforms' },
    radius: { src: radiusTokens, alt: 'Radius scale from R1·4 to R6·100' },
    iconsTitle: 'Icons',
    iconsCopy: 'We use the 24 X 24 px as the base, allowing dev team to scale easily to match across platform and responsive design.',
    icons: { src: icons, alt: 'Note Editor 24-pixel interface icon family' },
    emptyStates: [
      { src: noWifi, alt: 'It seems Wi-fi is gone, try to reconnect' },
      { src: noFiles, alt: 'Oops, no files currently, Create now!' },
      { src: noProjects, alt: 'There isn’t any projects, go to create one' },
      { src: noPermission, alt: 'You don’t have the permission. Apply to view!' }
    ]
  }
}
