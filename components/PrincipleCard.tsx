'use client'
import Link from 'next/link'
import type { Principle } from '@/lib/content'

export function PrincipleCard({ principle }: { principle: Principle }) {
  return (
    <Link href={`/principles/${principle.slug}`} style={{
      display: 'block',
      padding: 'var(--space-3)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      textDecoration: 'none',
      transition: 'border-color 150ms',
    }}
    onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
    onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.5, maxWidth: 'none' }}>
        {principle.statement}
      </p>
      <p style={{
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)',
        marginTop: 'var(--space-1)',
        maxWidth: 'none',
      }}>
        {principle.decisions.length} decision{principle.decisions.length !== 1 ? 's' : ''}
      </p>
    </Link>
  )
}
