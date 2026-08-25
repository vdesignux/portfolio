import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const root = path.join(process.cwd(), 'content')

function getDir(type: string) {
  return path.join(root, type)
}

function readFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const slug = path.basename(filePath, '.mdx')
  return { slug, frontmatter: data, body: content }
}

function readAll(type: string) {
  const dir = getDir(type)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => readFile(path.join(dir, f)))
}

// ── Projects ───────────────────────────────────────────────────────────────

export type Project = {
  slug: string
  title: string
  subtitle: string
  domain: string
  role: string
  period: number
  status: string
  claim: string
  thesis: string
  authorityContext: string
  order: number
  published: boolean
  body: string
}

export function getProjects(): Project[] {
  return readAll('projects')
    .map(({ slug, frontmatter: f, body }) => ({
      slug,
      title: f.title ?? '',
      subtitle: f.subtitle ?? '',
      domain: f.domain ?? '',
      role: f.role ?? '',
      period: f.period ?? 0,
      status: f.status ?? '',
      claim: f.claim ?? '',
      thesis: f.thesis ?? '',
      authorityContext: f.authorityContext ?? '',
      order: f.order ?? 99,
      published: f.published ?? false,
      body,
    }))
    .filter((p) => p.published)
    .sort((a, b) => a.order - b.order)
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug)
}

// ── Decisions ──────────────────────────────────────────────────────────────

export type Decision = {
  slug: string
  ref: string
  title: string
  project: string
  status: string
  authority: 'owned' | 'proposed' | 'directed' | 'inherited'
  expresses: string[]
  relatedTo: string[]
  evidencedBy: string[]
  resolved: boolean
  published: boolean
  body: string
}

export function getDecisions(): Decision[] {
  return readAll('decisions').map(({ slug, frontmatter: f, body }) => ({
    slug,
    ref: f.ref ?? slug,
    title: f.title ?? '',
    project: f.project ?? '',
    status: f.status ?? '',
    authority: f.authority ?? 'owned',
    expresses: f.expresses ?? [],
    relatedTo: f.relatedTo ?? [],
    evidencedBy: f.evidencedBy ?? [],
    resolved: f.resolved ?? true,
    published: f.published !== false,
    body,
  }))
}

export function getDecisionsForProject(projectSlug: string): Decision[] {
  return getDecisions().filter((d) => d.project === projectSlug && d.published)
}

// ── Principles ─────────────────────────────────────────────────────────────

export type Principle = {
  slug: string
  statement: string
  order: number
  published: boolean
  body: string
  decisions: Decision[]
}

export function getPrinciples(): Principle[] {
  const decisions = getDecisions()
  return readAll('principles')
    .map(({ slug, frontmatter: f, body }) => ({
      slug,
      statement: f.statement ?? '',
      order: f.order ?? 99,
      published: f.published !== false,
      body,
      decisions: decisions.filter(
        (d) => d.expresses.includes(slug) && d.published
      ),
    }))
    .filter((p) => p.published)
    .sort((a, b) => a.order - b.order)
}

export function getPrinciple(slug: string): Principle | undefined {
  return getPrinciples().find((p) => p.slug === slug)
}

// ── Iterations ─────────────────────────────────────────────────────────────

export type Iteration = {
  slug: string
  title: string
  project: string
  premise: string
  outcome: string
  body: string
}

export function getIteration(slug: string): Iteration | undefined {
  const all = readAll('iterations')
  const found = all.find((i) => i.slug === slug)
  if (!found) return undefined
  return {
    slug: found.slug,
    title: found.frontmatter.title ?? '',
    project: found.frontmatter.project ?? '',
    premise: found.frontmatter.premise ?? '',
    outcome: found.frontmatter.outcome ?? '',
    body: found.body,
  }
}
