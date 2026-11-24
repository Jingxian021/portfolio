const posterFiles = import.meta.glob(
  '../../assets/poster/**/*.png',
  { eager: true, import: 'default' }
)

function asset(folder, name) {
  const entry = Object.entries(posterFiles).find(([path]) =>
    path.endsWith(`/poster/${folder}/${name}`)
  )

  if (!entry) throw new Error(`Missing poster asset: ${folder}/${name}`)
  return entry[1]
}

const n = (name) => asset('nothing', name)
const s = (name) => asset('seven steps', name)
const c = (name) => asset('colorful buddha', name)
const p = (name) => asset('peaceful', name)
const a = (name) => asset('animal poster', name)
const t = (name) => asset('100teeth', name)

function grid(columns, images, captions = [], size = {}) {
  return { type: 'grid', columns, images, captions, ...size }
}

const tooth = (index) => t(index === 26 ? 'cover - Frame 26.png' : `Frame ${index}.png`)
const teeth = Array.from({ length: 50 }, (_, index) => tooth(index + 1))
const teethGroups = Array.from({ length: 5 }, (_, index) =>
  teeth.slice(index * 10, index * 10 + 10)
)

export const POSTER_PAGES = {
  nothing: {
    title: 'Nothing',
    hero: { src: n('A4 - 13.png'), alt: 'Sutra and Hieroglyphics cover poster' },
    intro: {
      title: 'SUTRA & HIEROGLYPHICS',
      paragraphs: [
        'This series of posters draws inspiration from Buddhist spirit and traditional Chinese calligraphy, which is a text composed of elegant lines, slashes, and dots.',
        'Traditional Chinese characters evolved from abstract shapes to create text that combines basic graphic elements to create diverse meanings. The Sutra, Buddha’s words, in Buddhist scriptures bring me peace, and the Chinese translation of the Buddhist scriptures conveys their meaning.',
        'I hope to convey the feelings these scriptures bring to me through shapes, shading, color, and fonts. I attempt to deconstruct pictographic characters into their most basic graphic units and integrate them with visual elements.'
      ]
    },
    blocks: [
      { type: 'heading', text: 'Elements', note: 'Namo Amitabha | 南无阿弥陀佛' },
      grid(2, [n('cover - A4 - 7.png'), n('A4 - 8.png'), n('A4 - 30.png'), n('A4 - 11.png'), n('A4 - 27.png'), n('A4 - 21.png')]),
      { type: 'heading', text: 'Components' },
      grid(2, [n('A4 - 31.png'), n('A4 - 34.png'), n('A4 - 35.png'), n('A4 - 37.png')]),
      { type: 'heading', text: 'Traration' },
      grid(2, [n('A4 - 17.png'), n('A4 - 36.png'), n('A4 - 23.png'), n('A4 - 33.png'), n('A4 - 32.png'), n('A4 - 15.png'), n('A4 - 9.png'), n('A4 - 10.png'), n('A4 - 28.png'), n('A4 - 12.png')])
    ],
    closing: {
      src: n('A4 - 14.png'),
      alt: "Buddha's Light Shines Universally poster",
      caption: "Buddha's Light Shines Universally"
    }
  },

  'seven-steps': {
    title: 'Seven Steps',
    intro: {
      title: 'SEVEN STEPS',
      paragraphs: [
        'These posters are inspired by the process of lotus flowering. It reminds me of peace and calm. Also a way to growing.',
        { text: '这些海报的灵感来源于莲花绽放的过程。它让我联想到平静与安宁，也是一种成长的方式。', desktopOnly: true }
      ]
    },
    blocks: [
      { type: 'media', src: s('Group 458.png'), alt: 'A pale lotus cloud', variant: 'cloud', width: 160, height: 122 },
      grid(2, [s('cover - A4 - 61.png'), s('A4 - 67.png')]),
      { type: 'media', src: s('Frame 427321375.png'), alt: 'Seven Steps colour palette', variant: 'palette', width: 1268, height: 153 },
      grid(2, [s('A4 - 66.png'), s('A4 - 65.png')])
    ]
  },

  'colorful-buddha': {
    title: 'Colorful Buddha',
    hero: { src: c('A4 - 58.png'), alt: 'Colorful Buddha cover poster' },
    intro: {
      kicker: '色不异空',
      title: 'COLORFUL BUDDHA',
      paragraphs: [
        'This poster series is inspired by the Buddhist saying, "Form is not different from emptiness, emptiness is not different from form." This means that everything we see and touch is essentially the product of conditions. Without any one condition, it would not exist.',
        'I hope to restructure Chinese characters through basic colors and graphics, while still presenting the original glyphs to convey their meaning.',
        '这一系列海报的灵感源自佛语“色不异空，空不异色”，即所有看得见、摸得着的东西，本质上都是因缘条件聚合而成的，缺少一个条件，它都不会存在。\n我希望通过基本颜色、图形将汉字重组，但依旧呈现原有的字形去解释其中的含义。'
      ]
    },
    blocks: [
      grid(2, [c('A4 - 40.png'), c('A4 - 60.png')]),
      grid(3, [c('A4 - 38.png'), c('cover - A4 - 39.png'), c('A4 - 44.png')]),
      grid(2, [c('A4 - 38.png'), c('cover - A4 - 39.png')]),
      grid(2, [c('A4 - 41.png'), c('A4 - 42.png')])
    ],
    closing: {
      src: c('Group 414.png'),
      alt: 'Colorful Buddhist flower symbol',
      caption: 'Namo Amitabha | 南无阿弥陀佛',
      symbol: true
    }
  },

  'animal-poster': {
    title: 'Animal Poster',
    intro: {
      title: 'ANIMALS',
      paragraphs: [
        'Inspiration comes from sculpture, using different texture to present.'
      ]
    },
    blocks: [
      grid(2, [a('A4 - 81.png'), a('A4 - 82.png')]),
      {
        type: 'media',
        src: a('cover - A4 - 83.png'),
        alt: 'Deer sculpture poster',
        variant: 'single',
        width: 1190,
        height: 1684
      }
    ]
  },

  '100teeth': {
    title: '100 Teeth',
    intro: {
      title: '100TEETH',
      paragraphs: [
        'This experience stems from having a tooth extracted. Really bad, but having fun in life.'
      ]
    },
    blocks: teethGroups.map((group) => grid(5, group, [], { width: 720, height: 720 }))
  },

  peaceful: {
    title: 'Peaceful',
    intro: {
      title: 'PEACEFUL',
      paragraphs: [
        'The inspiration comes from Shapes and Colours, which indicates a kind of joy.',
        'I hope to use modern geometric shapes to union, subtract, intersect, and exclude to illustrate the relationship learnt from Buddhism. Also, through vibrant colour to express the peaceful feelings and joy the old sayings bring to us.'
      ]
    },
    blocks: [
      { type: 'media', src: p('Frame 427321355.png'), alt: 'Five geometric colour studies', variant: 'shapes', width: 2463, height: 240 },
      grid(3, [c('A4 - 43.png'), c('A4 - 57.png'), c('A4 - 59.png')], ['如来', '波罗蜜多', '欢喜']),
      { type: 'media', src: p('Frame 427321366.png'), alt: 'Five basic geometric shapes', variant: 'shapes shapes--second', width: 2496, height: 185 },
      grid(2, [p('A4 - 47.png'), p('cover - A4 - 48.png')], ['', '须弥']),
      grid(2, [p('A4 - 46.png'), p('A4 - 49.png')]),
      grid(2, [p('A4 - 50.png'), p('A4 - 55.png')]),
      grid(3, [p('A4 - 56.png'), p('A4 - 51.png'), p('A4 - 52.png')]),
      grid(2, [p('A4 - 53.png'), p('A4 - 54.png')])
    ]
  }
}
