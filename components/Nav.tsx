'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',           label: 'Work'       },
  { href: '/principles', label: 'Principles' },
  { href: '/about',      label: 'About'      },
]

export function Nav() {
  const path = usePathname()

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
    }}>
      <nav style={{
        maxWidth: 'var(--content-xl)',
        margin: '0 auto',
        padding: '0 var(--space-4)',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          fontWeight: 500,
          letterSpacing: '-0.02em',
          fontSize: 'var(--text-sm)',
        }}>
          VP
        </Link>
        <ul style={{
          display: 'flex',
          gap: 'var(--space-3)',
          listStyle: 'none',
        }}>
          {links.map(({ href, label }) => {
            const active = href === '/'
              ? path === '/'
              : path.startsWith(href)
            return (
              <li key={href}>
                <Link href={href} style={{
                  fontSize: 'var(--text-sm)',
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: active ? 500 : 400,
                  transition: 'color 150ms',
                }}>
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
