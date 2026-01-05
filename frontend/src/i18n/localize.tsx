import { observable } from '@legendapp/state'
import { useSelector } from '@legendapp/state/react'
import { useMemo } from 'react'

import en from './en.json'
import minecraft from './minecraft.json'
import ru from './ru.json'
import sims from './sims.json'
import warhammer from './warhammer.json'

export type Locale = 'en' | 'ru' | 'minecraft' | 'sims' | 'warhammer'
export type Dict = Record<string, string>

const dictionaries: Record<Locale, Dict> = {
  en: en as Dict,
  ru: ru as Dict,
  minecraft: minecraft as Dict,
  sims: sims as Dict,
  warhammer: warhammer as Dict
}

const STORAGE_KEY = 'vps-studio.locale.v1'

function loadInitialLocale(): Locale {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (
    raw === 'en' ||
    raw === 'ru' ||
    raw === 'minecraft' ||
    raw === 'sims' ||
    raw === 'warhammer'
  ) {
    return raw
  }
  return 'en'
}

export const i18nState$ = observable({
  locale: loadInitialLocale() as Locale,
  supportedLocales: ['en', 'ru', 'minecraft', 'sims', 'warhammer'] as Locale[]
})

i18nState$.locale.onChange(({ value }) => {
  localStorage.setItem(STORAGE_KEY, value)
})

export function setLocale(locale: Locale) {
  i18nState$.locale.set(locale)
}

export function useLocale() {
  const locale = useSelector(() => i18nState$.locale.get())
  const supportedLocales = useSelector(() => i18nState$.supportedLocales.get())
  return { locale, supportedLocales, setLocale }
}

export function localize(i18nKey: string, locale: Locale, fallback?: string) {
  const dict = dictionaries[locale] ?? dictionaries.en
  return dict[i18nKey] ?? fallback ?? dictionaries.en[i18nKey] ?? fallback ?? i18nKey
}

export function useLocalized(i18nKey: string, locale: Locale, fallback?: string): string {
  return useMemo(() => localize(i18nKey, locale, fallback), [i18nKey, locale, fallback])
}

export function I18N(props: { k: string; default: string }) {
  const { locale } = useLocale()
  const text = useLocalized(props.k, locale, props.default)
  return <>{text}</>
}


