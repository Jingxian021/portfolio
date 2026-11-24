import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (v) => v })

const STORAGE_KEY = 'jg-lang'

export const pick = (value, lang) => {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] ?? value.en ?? ''
}

const readLang = () => {
  // 界面暂时只显示英文；copy.js 的 zh 内容保留，恢复双语时改回原逻辑即可
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    document.documentElement.dataset.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch (err) {
      // 存不进去不影响使用
    }
  }, [lang])

  const t = useCallback((value) => pick(value, lang), [lang])
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
