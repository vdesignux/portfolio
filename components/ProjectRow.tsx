'use client'
import Link from 'next/link'
import type { Project } from '@/lib/content'

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 'var(--space-3)',
        alignItems: 'center',
        padding: 'var(--space-3) var(--space-4)',
        background: 'var(--bg)',
        transition: 'background 150ms',
        textDecoration: 'none',
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
      onMouseOut={(e) => (e.currentTarget.style.background = 'var(--bg)')}
    >
      {/* Left — index + title + claim */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', minWidth: 0 }}>
        <span style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
          fontVariantNumeric: 'tabular-nums',
          paddingTop: '3px',
          flexShrink: 0,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontSize: 'var(--text-base)',
            fontWeight: 500,
            marginBottom: '2px',
            letterSpacing: '-0.01em',
            color: 'var(--text-primary)',
            maxWidth: 'none',
            lineHeight: 1.3,
          }}>
            {project.title}
          </p>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            maxWidth: 'none',
            lineHeight: 1.4,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {project.claim}
          </p>
        </div>
      </div>

      {/* Right — year + domain tag */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '4px',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          {project.period}
        </span>
        <span
          className="project-row-meta-tag"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            background: 'var(--bg-subtle)',
            padding: '2px 8px',
            borderRadius: '99px',
            border: '1px solid var(--border)',
            whiteSpace: 'nowrap',
          }}
        >
          {project.domain}
        </span>
      </div>
    </Link>
  )
}
