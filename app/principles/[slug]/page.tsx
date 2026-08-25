import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { getPrinciples, getPrinciple, getProjects } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getPrinciples().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = getPrinciple(slug)
  if (!p) return {}
  return { title: p.statement }
}

const AUTHORITY_LABELS: Record<string, string> = {
  owned:    'Owned',
  proposed: 'Proposed',
  directed: 'Directed',
  inherited:'Inherited',
}

/** Minimal markdown → HTML for principle body text.
 *  Only used here because principle files are plain markdown, not MDX.
 *  Handles: ## headings, **bold**, paragraphs.
 */
function renderPrincipleBody(markdown: string): string {
  return markdown
    .replace(
      /^##\s+(.+)$/gm,
      '<h2>$1</h2>'
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (trimmed.startsWith('<h2>')) return trimmed
      return `<p>${trimmed.replace(/\n/g, ' ')}</p>`
    })
    .filter(Boolean)
    .join('\n')
}

export default async function PrinciplePage({ params }: Props) {
  const { slug } = await params
  const principle = getPrinciple(slug)
  if (!principle) notFound()

  const projects = getProjects()
  const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p]))
  const projectSlugs = [...new Set(principle.decisions.map((d) => d.project))]

  return (
    <>
      <Nav />
      <main>

        {/* ── Header ─────────────────────────────────────── */}
        <header className="page-section" style={{
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-8)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: 'var(--content)' }}>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-3)',
              maxWidth: 'none',
            }}>
              Principle
            </p>
            <h1 style={{
              fontSize: 'clamp(1.25rem, 4vw, var(--text-3xl))',
              fontWeight: 450,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              marginBottom: 'var(--space-4)',
            }}>
              {principle.statement}
            </h1>
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                Demonstrated in
              </span>
              {projectSlugs.map((ps) => {
                const proj = projectMap[ps]
                return proj ? (
                  <Link key={ps} href={`/work/${ps}`} style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: '99px',
                    padding: '2px 8px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}>
                    {proj.title}
                  </Link>
                ) : null
              })}
            </div>
          </div>
        </header>

        {/* ── Two-column body ────────────────────────────── */}
        <div className="page-section layout-two-col" style={{
          paddingTop: 'var(--space-8)',
          paddingBottom: 'var(--space-16)',
        }}>

          {/* Principle elaboration */}
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: renderPrincipleBody(principle.body) }}
          />

          {/* Decision rail */}
          <aside style={{ alignSelf: 'start' }}>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-3)',
            }}>
              {principle.decisions.length} decision{principle.decisions.length !== 1 ? 's' : ''}
            </p>
            <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
              {principle.decisions.map((d) => {
                const proj = projectMap[d.project]
                return (
                  <div key={d.ref} style={{
                    padding: 'var(--space-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    background: 'var(--bg)',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 'var(--space-2)',
                      marginBottom: '6px',
                    }}>
                      <span style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        fontFamily: 'var(--font-geist-mono)',
                      }}>
                        {d.ref}
                      </span>
                      <span style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border)',
                        borderRadius: '99px',
                        padding: '1px 6px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}>
                        {AUTHORITY_LABELS[d.authority] ?? d.authority}
                      </span>
                    </div>
                    <p style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 450,
                      lineHeight: 1.4,
                      marginBottom: proj ? '6px' : 0,
                      maxWidth: 'none',
                    }}>
                      {d.title}
                    </p>
                    {proj && (
                      <Link href={`/work/${d.project}`} style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                      }}>
                        {proj.title} →
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </aside>

        </div>
      </main>
    </>
  )
}
