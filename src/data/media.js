// 素材索引：用 glob 自动收集，文件名变化时不需要改代码

const photoFiles = import.meta.glob(
  '../../assets/photos/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
)

const CATEGORY_RULES = [
  { key: 'still', folderHint: '静物' },
  { key: 'museum', folderHint: '博物馆' },
  { key: 'architecture', folderHint: '建筑' },
  { key: 'landscape', folderHint: '风景' }
]

const basename = (path) => path.split('/').pop()

const categoryOf = (path) => {
  const hit = CATEGORY_RULES.find((rule) => path.includes(rule.folderHint))
  return hit ? hit.key : 'landscape'
}

// 每张图的真实宽高比（width/height），用于散点场布局计算，避免加载后才知道比例造成抖动。
// 找不到时回退到 1.5（最常见的横图比例），CSS 用 object-fit: cover 兜底，不会变形只会轻微裁切。
const PHOTO_RATIOS = {
  'DSC00485 1.png': 1.5,
  'DSC00487 1.png': 1.53,
  'DSCN5026 1.png': 1.33,
  'DSCN5957 1.png': 1.12,
  'DSCN5967 1.png': 0.71,
  'IMG_3188 - 副本 1.png': 0.75,
  'IMG_4339 1.png': 1.37,
  'IMG_4459 1.png': 0.63,
  'IMG_4571 1.png': 1.48,
  'IMG_4574 1.png': 1.42,
  'IMG_6836 1.png': 0.75,
  'IMG_6838 1.png': 1.33,
  'IMG_6849 1.png': 0.75,
  'DSC00033.jpg': 1.5,
  'DSC00369.jpg': 1.5,
  'DSC04623.jpg': 1.5,
  'DSCN5813.jpg': 0.75,
  'IMG_4533 - 副本.jpg': 1.33,
  'IMG_4931.jpg': 1.33,
  'IMG_6828.jpg': 0.75,
  'DSC09739.jpg': 1.5,
  'DSC09742.jpg': 1.5,
  'DSC00003.jpg': 1.5,
  'DSC00293.jpg': 1.5,
  'DSC00454.jpg': 1.5,
  'DSC03679.jpg': 1.5,
  'DSC03749.jpg': 1.5,
  'DSC06254.jpg': 1.5,
  'DSC06262.jpg': 1.82,
  'DSC06578.jpg': 1.5,
  'DSC06742.jpg': 1.5,
  'DSC06743.jpg': 1.5,
  'DSC09879.jpg': 0.67,
  'DSC09899.jpg': 1.5,
  'DSCN4496.jpg': 1.33,
  'IMG_4843.jpg': 1.55
}

const ratioOf = (path) => PHOTO_RATIOS[basename(path)] ?? 1.5

export const photos = Object.entries(photoFiles)
  .map(([path, src]) => ({
    src,
    name: basename(path).replace(/\.[^.]+$/, ''),
    category: categoryOf(path),
    ratio: ratioOf(path)
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN', { numeric: true }))

const posterFiles = import.meta.glob(
  '../../assets/poster/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
)

// 暂时不展示的系列（还没排版），需要恢复时从这里移除 slug 即可
const HIDDEN_SERIES = ['tooth-poster']

const SERIES_META = [
  { slug: '100teeth', title: '100 Teeth' },
  { slug: 'animal-poster', title: 'Animal Poster', folder: 'animal poster' },
  { slug: 'font-design', title: 'Font Design Colorful', folder: 'Font_design_coloful' },
  { slug: 'nothing', title: 'Nothing', folder: 'nothing' },
  { slug: 'seven-steps', title: 'Seven Steps', folder: 'seven steps' },
  { slug: 'colorful-buddha', title: 'Colorful Buddha', folder: 'colorful buddha' },
  { slug: 'peaceful', title: 'Peaceful', folder: 'peaceful' },
  { slug: 'tooth-poster', title: 'Tooth Poster', folder: 'Tooth Poster' },
  { slug: 'seeda', title: 'SeeDAO New Year', prefix: 'SeeDAO' }
]

const filesBySeries = Object.entries(posterFiles).reduce((acc, [path, src]) => {
  const parts = path.split('/')
  const parent = parts[parts.length - 2]
  const key = parent === 'poster' ? basename(path).replace(/\.[^.]+$/, '') : parent
  if (!acc[key]) acc[key] = []
  acc[key].push({ path, src })
  return acc
}, {})

Object.values(filesBySeries).forEach((list) => {
  list.sort((a, b) => basename(a.path).localeCompare(basename(b.path), 'en', { numeric: true }))
})

const resolveSeries = (meta) => {
  const direct = filesBySeries[meta.folder || meta.slug]
  if (direct) return direct
  if (meta.prefix) {
    const hit = Object.entries(filesBySeries).find(([key]) => key.startsWith(meta.prefix))
    if (hit) return hit[1]
  }
  return []
}

export const posterSeries = SERIES_META.map((meta) => {
  const resolved = resolveSeries(meta)
  const images = resolved.map((item) => item.src)
  // 优先选文件名含 "cover" 的那张作为封面
  const coverItem = resolved.find((item) =>
    basename(item.path).toLowerCase().includes('cover')
  )
  const cover = coverItem ? coverItem.src : (images[0] ?? null)
  const hasPage = ['nothing', 'seven-steps', 'colorful-buddha', 'peaceful', '100teeth', 'animal-poster'].includes(meta.slug)
  return { ...meta, images, cover, count: images.length, hasPage }
}).filter(
  (series) => series.count > 0 && !HIDDEN_SERIES.includes(series.slug)
)
