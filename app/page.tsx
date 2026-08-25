import { Nav } from '@/components/Nav'
import { ProjectRow } from '@/components/ProjectRow'
import { PrincipleCard } from '@/components/PrincipleCard'
import { getProjects, getPrinciples } from '@/lib/content'
import Link from 'next/link'

export default function Home() {
  const projects = getProjects()
  const principles = getPrinciples()

  return (
    <>
      <Nav />
      <main>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="page-section" style={{
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-12)',
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
              Product Designer · Toronto
            </p>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 6vw, var(--text-5xl))',
              fontWeight: 450,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 'var(--space-4)',
            }}>
              Transforming complexity
              <br />and clutter into clarity
              <br />and intention.
            </h1>
            <p style={{
              fontSize: 'clamp(var(--text-base), 2vw, var(--text-lg))',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: '52ch',
            }}>
              Systems-driven product designer with four years of experience
              in workflow architecture, information architecture, and
              AI-integrated design — specialising in 0→1 products that
              reduce cognitive load at scale.
            </p>
          </div>
        </section>

        {/* ── Work ─────────────────────────────────────────── */}
        <section className="page-section" style={{ paddingBottom: 'var(--space-16)' }}>
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-4)',
            maxWidth: 'none',
          }}>
            Selected work
          </p>
          <div style={{
            display: 'grid',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}>
            {projects.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
          </div>
        </section>

        {/* ── Principles ────────────────────────────────────── */}
        <section className="page-section" style={{ paddingBottom: 'var(--space-16)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 'var(--space-4)',
          }}>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              maxWidth: 'none',
            }}>
              Principles
            </p>
            <Link href="/principles" style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              flexShrink: 0,
            }}>
              All →
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-2)',
          }}>
            {principles.map((p) => <PrincipleCard key={p.slug} principle={p} />)}
          </div>
        </section>

      </main>
    </>
  )
}
