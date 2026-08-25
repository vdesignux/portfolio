import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Nav } from '@/components/Nav'
import { getProject, getProjects, getDecisionsForProject } from '@/lib/content'
import { DecisionCard } from '@/components/DecisionCard'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.title, description: project.thesis }
}

// ── MDX component overrides ────────────────────────────────────────────────
// These match the component names used in the MDX files.
// Styled via CSS classes so they inherit the prose rhythm.

const components = {
  // Image placeholder — becomes a real <figure> once images exist
  Figure: ({
    src,
    alt,
    caption,
  }: {
    src?: string
    alt?: string
    caption?: string
  }) => (
    <figure>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ''}
          style={{ width: '100%', borderRadius: 'var(--radius)', display: 'block' }}
        />
      ) : (
        <div style={{
          height: '220px',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
            {alt ?? 'Image'}
          </span>
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  ),

  // Artifact embed placeholder
  Artifact: ({ slug }: { slug: string }) => (
    <div className="prose-block">
      Artifact — {slug}
    </div>
  ),

  // Provenance / aside callout
  Callout: ({
    children,
    type: _type,
  }: {
    children?: React.ReactNode
    type?: string
  }) => <aside>{children}</aside>,

  // Inline decision reference — rendered in the decisions section below the body
  Decision: (_props: Record<string, unknown>) => null,

  // Iteration trail placeholder
  Iteration: ({ slug }: { slug: string }) => (
    <div className="prose-block">
      Iteration — {slug}
    </div>
  ),
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const decisions = getDecisionsForProject(slug)

  return (
    <>
      <Nav />
      <main>

        {/* ── Case study header ──────────────────────────── */}
        <header className="page-section" style={{
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-8)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: 'var(--content)' }}>

            {/* Meta tags */}
            <div style={{
              display: 'flex',
              gap: '6px',
              marginBottom: 'var(--space-4)',
              flexWrap: 'wrap',
            }}>
              <Tag>{project.domain}</Tag>
              <Tag>{project.period}</Tag>
              {project.status && <Tag>{project.status}</Tag>}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(1.5rem, 5vw, var(--text-4xl))',
              fontWeight: 450,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 'var(--space-3)',
            }}>
              {project.title}
            </h1>

            {/* Thesis — the single-sentence argument */}
            <p style={{
              fontSize: 'clamp(var(--text-base), 2.5vw, var(--text-xl))',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              maxWidth: '52ch',
              marginBottom: 'var(--space-5)',
            }}>
              {project.thesis}
            </p>

            {/* Authority context — what was given vs. what was owned */}
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-tertiary)',
              padding: '10px var(--space-3)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              lineHeight: 1.55,
              maxWidth: 'none',
              display: 'block',
            }}>
              {project.authorityContext}
            </p>

          </div>
        </header>

        {/* ── Case study body ────────────────────────────── */}
        <div className="page-section" style={{
          paddingTop: 'var(--space-8)',
          paddingBottom: 'var(--space-8)',
        }}>
          <article className="prose" style={{ maxWidth: 'var(--content)' }}>
            <MDXRemote source={project.body} components={components as any} />
          </article>
        </div>

        {/* ── Decision records ───────────────────────────── */}
        {decisions.length > 0 && (
          <section className="page-section" style={{
            paddingTop: 'var(--space-8)',
            paddingBottom: 'var(--space-16)',
            borderTop: '1px solid var(--border)',
          }}>
            <div style={{ maxWidth: 'var(--content)' }}>
              <p style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-4)',
                maxWidth: 'none',
              }}>
                Decision records · {decisions.length}
              </p>
              <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
                {decisions.map((d) => (
                  <DecisionCard key={d.ref} decision={d} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
    </>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)',
      background: 'var(--bg-subtle)',
      border: '1px solid var(--border)',
      borderRadius: '99px',
      padding: '3px 10px',
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}
