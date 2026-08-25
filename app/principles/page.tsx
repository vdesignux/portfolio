import { Nav } from '@/components/Nav'
import { PrincipleIndexCard } from '@/components/PrincipleIndexCard'
import { getPrinciples, getProjects } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Principles',
  description: 'Design principles demonstrated across projects.',
}

export default function PrinciplesIndex() {
  const principles = getPrinciples()
  const projects = getProjects()
  const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p.title]))

  return (
    <>
      <Nav />
      <main>
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
              Principles
            </p>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, var(--text-4xl))',
              fontWeight: 450,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 'var(--space-3)',
            }}>
              Convictions demonstrated across projects.
            </h1>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              maxWidth: '52ch',
              lineHeight: 1.65,
            }}>
              A principle carries almost no content of its own. Its weight
              comes from what points at it — decisions made independently,
              on different projects, arriving at the same rule.
            </p>
          </div>
        </header>

        <div className="page-section" style={{
          paddingTop: 'var(--space-8)',
          paddingBottom: 'var(--space-16)',
        }}>
          <div style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: 'var(--content)' }}>
            {principles.map((p) => (
              <PrincipleIndexCard key={p.slug} principle={p} projectMap={projectMap} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
