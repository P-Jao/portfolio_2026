export interface Screenshot {
  caption: string
  path: string
}

export interface Project {
  id: string
  folder: string
  title: string
  dates: string
  summary: string
  highlights: string[]
  role: string
  stack: string[]
  live: string | null
  source: string | null
  shots: Screenshot[]
}

export interface SocialLink {
  label: string
  href: string
  display: string
  icon: string
}

export interface SkillItem {
  key: string
  name: string
}

export interface SkillToken {
  c: string
  t: string
}

export interface SkillLine {
  n: number
  len: number
  skill: boolean
  toks: SkillToken[]
}

export interface SkillDefinition {
  id: string
  file: string
  lang: string
  color: string
  head: string[]
  tail: string[]
  format: (key: string, value: string, width: number, last: boolean) => string
  items: [key: string, value: string][]
}

export interface SkillFile {
  id: string
  file: string
  lang: string
  color: string
  firstLine: number
  items: SkillItem[]
  lines: SkillLine[]
}
