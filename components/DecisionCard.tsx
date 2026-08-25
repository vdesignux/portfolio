'use client'
import { useState } from 'react'
import type { Decision } from '@/lib/content'

const AUTHORITY_LABELS: Record<string, string> = {
  owned:    'Owned',
  proposed: 'Proposed',
  directed: 'Directed',
  inherited:'Inherited',
}

const AUTHORITY_COLORS: Record<string, string> = {
  owned:    'var(--text-primary)',
  proposed: 'var(--text-secondary)',
  directed: 'var(--text-tertiary)',
  inherited:'var(--text-tertiary)',
}

export function DecisionCard({ decision }: { decision: Decision }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        className="decision-card-btn"
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto auto',
          gap: 'var(--space-2)',
          alignItems: 'center',
          padding: 'var(--space-3)',
          background: open ? 'var(--bg-subtle)' : 'var(--bg)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 150ms',
        }}
      >
        {/* Ref */}
        <span
          className="decision-card-ref"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            fontVariantNumeric: 'tabular-nums',
            fontFamily: 'var(--font-geist-mono)',
            minWidth: '4rem',
            flexShrink: 0,
          }}
        >
          {decision.ref}
        </span>

        {/* Title */}
        <span
          className="decision-card-title"
          style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 450,
            color: 'var(--text-primary)',
            textAlign: 'left',
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {decision.title}
        </span>

        {/* Authority badge */}
        <span
          className="decision-card-authority"
          style={{
            fontSize: 'var(--text-xs)',
            color: AUTHORITY_COLORS[decision.authority] ?? 'var(--text-tertiary)',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: '99px',
            padding: '2px 8px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {AUTHORITY_LABELS[decision.authority] ?? decision.authority}
        </span>

        {/* Chevron */}
        <span style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
          transition: 'transform 150ms',
          transform: open ? 'rotate(180deg)' : 'none',
          flexShrink: 0,
        }}>
          ▾
        </span>
      </button>

      {open && (
        <div style={{
          padding: 'var(--space-4)',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg)',
        }}>
          {decision.expresses.length > 0 && (
            <div style={{
              display: 'flex',
              gap: 'var(--space-1)',
              marginBottom: 'var(--space-3)',
              flexWrap: 'wrap',
            }}>
              {decision.expresses.map((slug) => (
                <span key={slug} style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '99px',
                  padding: '2px 8px',
                }}>
                  ↗ {slug}
                </span>
              ))}
            </div>
          )}
          <div
            style={{
              fontSize: 'var(--text-sm)',
              lineHeight: 1.75,
              color: 'var(--text-primary)',
            }}
            dangerouslySetInnerHTML={{
              __html: decision.body
                .replace(/^##\s+(.+)$/gm, '<h3 style="font-size:var(--text-sm);font-weight:500;margin:1.25em 0 0.5em;color:var(--text-primary)">$1</h3>')
                .replace(/^###\s+(.+)$/gm, '<h4 style="font-size:var(--text-sm);font-weight:500;margin:1em 0 0.4em;color:var(--text-secondary)">$1</h4>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n\n/g, '</p><p style="margin:0.75em 0;max-width:none">')
                .replace(/^/, '<p style="margin:0;max-width:none">')
                .replace(/$/, '</p>')
            }}
          />
        </div>
      )}
    </div>
  )
}
