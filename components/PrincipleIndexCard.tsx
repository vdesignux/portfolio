'use client'
import Link from 'next/link'
import type { Principle, Project } from '@/lib/content'

export function PrincipleIndexCard({
  principle,
  projectMap,
}: {
  principle: Principle
  projectMap: Record<string, string>
}) {
  const projectSlugs = [...new Set(principle.decisions.map((d) => d.project))]
  return (
    <Link href={`/principles/${principle.slug}`} style={{
      display: 'block',
      padding: 'var(--space-4)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      textDecoration: 'none',
      transition: 'border-color 150ms',
    }}
    onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
    onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <p style={{
        fontSize: 'var(--text-base)',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        lineHeight: 1.4,
        marginBottom: 'var(--space-2)',
        maxWidth: 'none',
      }}>
        {principle.statement}
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
        {projectSlugs.map((slug) => (
          <span key={slug} style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: '99px',
            padding: '2px 8px',
          }}>
            {projectMap[slug] ?? slug}
          </span>
        ))}
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', maxWidth: 'none' }}>
        {principle.decisions.length} decision{principle.decisions.length !== 1 ? 's' : ''}
      </p>
    </Link>
  )
}
