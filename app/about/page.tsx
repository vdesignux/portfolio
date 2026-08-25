import { Nav } from '@/components/Nav'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Vaibhavi Patankar — systems-driven product designer.',
}

export default function About() {
  return (
    <>
      <Nav />
      <main>
        <div className="page-section" style={{
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-16)',
        }}>
          <div style={{ maxWidth: 'var(--content)' }}>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 5vw, var(--text-4xl))',
              fontWeight: 450,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 'var(--space-6)',
            }}>
              Vaibhavi Patankar
            </h1>
            <p style={{ marginBottom: 'var(--space-3)' }}>
              Product designer with four years of experience specialising in
              systems thinking, workflow architecture, information architecture,
              and AI-integrated design. Based in Toronto.
            </p>
            <p style={{ marginBottom: 'var(--space-3)' }}>
              The work is mostly in the enterprise space — complex multi-role
              workflows where the hardest problem is usually not the interface
              but the model underneath it. What needs to be the object, what
              state it carries, what the permission model can actually express.
              The screens follow from that.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
              Currently open to product design roles and consulting engagements.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <a
                href="mailto:hello@vdesignux.com"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: 'var(--text-primary)',
                  color: 'var(--bg)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Get in touch
              </a>
              <a
                href="https://linkedin.com/in/vaibhavi-patankar"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
