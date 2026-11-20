export type Lang = 'en' | 'de' | 'fr' | 'it' | 'es' | 'pt' | 'nl' | 'pl'

export type Messages = {
  name: string
  five_hour: string
  seven_day: string
  spend_limit: string
  day: string
  session: string
  usageToast: (label: string, pct: number) => string
  themeCurrent: (name: string) => string
  themeChange: string
  themeUnknown: (name: string) => string
  themeSet: (name: string) => string
  hintState: (state: string) => string
  hintChange: string
  hintTight: (label: string, pct: number) => string
  langCurrent: (name: string) => string
  langChange: string
  langUnknown: (code: string) => string
  langSet: (name: string) => string
}

const CHANGE_LANG = '/usage-band lang <code|auto>'

export const MESSAGES: Record<Lang, Messages> = {
  en: {
    name: 'English',
    five_hour: '5h',
    seven_day: '7d',
    spend_limit: 'spend',
    day: 'd',
    session: 'session',
    usageToast: (l, p) => `${l} usage at ${p}%`,
    themeCurrent: n => `Current theme: ${n}`,
    themeChange: 'Change with /usage-band <name>',
    themeUnknown: n => `Unknown theme: ${n}`,
    themeSet: n => `Bar theme: ${n}`,
    hintState: s => `Model hint: ${s}`,
    hintChange: 'Change with /usage-band hint on|off',
    hintTight: (l, p) => `${l} at ${p}% and ahead of the clock: consider a lighter model`,
    langCurrent: n => `Language: ${n}`,
    langChange: `Change with ${CHANGE_LANG}`,
    langUnknown: c => `Unknown language: ${c}`,
    langSet: n => `Language: ${n}`,
  },
  de: {
    name: 'Deutsch',
    five_hour: '5h',
    seven_day: '7T',
    spend_limit: 'Ausgaben',
    day: 'T',
    session: 'Sitzung',
    usageToast: (l, p) => `${l}-Nutzung bei ${p}%`,
    themeCurrent: n => `Aktuelles Design: ${n}`,
    themeChange: 'Ändern mit /usage-band <Name>',
    themeUnknown: n => `Unbekanntes Design: ${n}`,
    themeSet: n => `Design der Leiste: ${n}`,
    hintState: s => `Modellhinweis: ${s}`,
    hintChange: 'Ändern mit /usage-band hint on|off',
    hintTight: (l, p) => `${l} bei ${p}% und dem Zeitplan voraus: ein leichteres Modell erwägen`,
    langCurrent: n => `Sprache: ${n}`,
    langChange: `Ändern mit ${CHANGE_LANG}`,
    langUnknown: c => `Unbekannte Sprache: ${c}`,
    langSet: n => `Sprache: ${n}`,
  },
  fr: {
    name: 'Français',
    five_hour: '5h',
    seven_day: '7j',
    spend_limit: 'dépenses',
    day: 'j',
    session: 'session',
    usageToast: (l, p) => `Utilisation ${l} à ${p} %`,
    themeCurrent: n => `Thème actuel : ${n}`,
    themeChange: 'Changer avec /usage-band <nom>',
    themeUnknown: n => `Thème inconnu : ${n}`,
    themeSet: n => `Thème de la barre : ${n}`,
    hintState: s => `Suggestion de modèle : ${s}`,
    hintChange: 'Changer avec /usage-band hint on|off',
    hintTight: (l, p) => `${l} à ${p} % et en avance sur le rythme : envisagez un modèle plus léger`,
    langCurrent: n => `Langue : ${n}`,
    langChange: `Changer avec ${CHANGE_LANG}`,
    langUnknown: c => `Langue inconnue : ${c}`,
    langSet: n => `Langue : ${n}`,
  },
  it: {
    name: 'Italiano',
    five_hour: '5h',
    seven_day: '7g',
    spend_limit: 'spesa',
    day: 'g',
    session: 'sessione',
    usageToast: (l, p) => `Utilizzo ${l} al ${p}%`,
    themeCurrent: n => `Tema attuale: ${n}`,
    themeChange: 'Cambia con /usage-band <nome>',
    themeUnknown: n => `Tema sconosciuto: ${n}`,
    themeSet: n => `Tema della barra: ${n}`,
    hintState: s => `Suggerimento modello: ${s}`,
    hintChange: 'Cambia con /usage-band hint on|off',
    hintTight: (l, p) => `${l} al ${p}% e in anticipo: valuta un modello più leggero`,
    langCurrent: n => `Lingua: ${n}`,
    langChange: `Cambia con ${CHANGE_LANG}`,
    langUnknown: c => `Lingua sconosciuta: ${c}`,
    langSet: n => `Lingua: ${n}`,
  },
  es: {
    name: 'Español',
    five_hour: '5h',
    seven_day: '7d',
    spend_limit: 'gasto',
    day: 'd',
    session: 'sesión',
    usageToast: (l, p) => `Uso de ${l} al ${p}%`,
    themeCurrent: n => `Tema actual: ${n}`,
    themeChange: 'Cambia con /usage-band <nombre>',
    themeUnknown: n => `Tema desconocido: ${n}`,
    themeSet: n => `Tema de la barra: ${n}`,
    hintState: s => `Sugerencia de modelo: ${s}`,
    hintChange: 'Cambia con /usage-band hint on|off',
    hintTight: (l, p) => `${l} al ${p}% y por delante del ritmo: considera un modelo más ligero`,
    langCurrent: n => `Idioma: ${n}`,
    langChange: `Cambia con ${CHANGE_LANG}`,
    langUnknown: c => `Idioma desconocido: ${c}`,
    langSet: n => `Idioma: ${n}`,
  },
  pt: {
    name: 'Português',
    five_hour: '5h',
    seven_day: '7d',
    spend_limit: 'gasto',
    day: 'd',
    session: 'sessão',
    usageToast: (l, p) => `Uso de ${l} em ${p}%`,
    themeCurrent: n => `Tema atual: ${n}`,
    themeChange: 'Altere com /usage-band <nome>',
    themeUnknown: n => `Tema desconhecido: ${n}`,
    themeSet: n => `Tema da barra: ${n}`,
    hintState: s => `Sugestão de modelo: ${s}`,
    hintChange: 'Altere com /usage-band hint on|off',
    hintTight: (l, p) => `${l} em ${p}% e adiantado em relação ao ritmo: considere um modelo mais leve`,
    langCurrent: n => `Idioma: ${n}`,
    langChange: `Altere com ${CHANGE_LANG}`,
    langUnknown: c => `Idioma desconhecido: ${c}`,
    langSet: n => `Idioma: ${n}`,
  },
  nl: {
    name: 'Nederlands',
    five_hour: '5h',
    seven_day: '7d',
    spend_limit: 'uitgaven',
    day: 'd',
    session: 'sessie',
    usageToast: (l, p) => `${l}-gebruik op ${p}%`,
    themeCurrent: n => `Huidig thema: ${n}`,
    themeChange: 'Wijzig met /usage-band <naam>',
    themeUnknown: n => `Onbekend thema: ${n}`,
    themeSet: n => `Thema van de balk: ${n}`,
    hintState: s => `Modelsuggestie: ${s}`,
    hintChange: 'Wijzig met /usage-band hint on|off',
    hintTight: (l, p) => `${l} op ${p}% en voor op schema: overweeg een lichter model`,
    langCurrent: n => `Taal: ${n}`,
    langChange: `Wijzig met ${CHANGE_LANG}`,
    langUnknown: c => `Onbekende taal: ${c}`,
    langSet: n => `Taal: ${n}`,
  },
  pl: {
    name: 'Polski',
    five_hour: '5h',
    seven_day: '7d',
    spend_limit: 'wydatki',
    day: 'd',
    session: 'sesja',
    usageToast: (l, p) => `Zużycie ${l}: ${p}%`,
    themeCurrent: n => `Bieżący motyw: ${n}`,
    themeChange: 'Zmień poleceniem /usage-band <nazwa>',
    themeUnknown: n => `Nieznany motyw: ${n}`,
    themeSet: n => `Motyw paska: ${n}`,
    hintState: s => `Podpowiedź modelu: ${s}`,
    hintChange: 'Zmień poleceniem /usage-band hint on|off',
    hintTight: (l, p) => `${l}: ${p}% i przed harmonogramem: rozważ lżejszy model`,
    langCurrent: n => `Język: ${n}`,
    langChange: `Zmień poleceniem ${CHANGE_LANG}`,
    langUnknown: c => `Nieznany język: ${c}`,
    langSet: n => `Język: ${n}`,
  },
}

export const LANGS = Object.keys(MESSAGES) as Lang[]

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && Object.hasOwn(MESSAGES, value)

// The system language when the plugin has a translation for it, else English.
export const detectLang = (): Lang => {
  try {
    const base = new Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2).toLowerCase()
    return isLang(base) ? base : 'en'
  } catch {
    return 'en'
  }
}
