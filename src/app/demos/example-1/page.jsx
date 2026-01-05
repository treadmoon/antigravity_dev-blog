import Link from 'next/link';

export const metadata = {
    title: "Example 01 | Demos",
    description: "A sample secondary route demonstration.",
};

export default function Example1Page() {
    return (
        <div style={{
            minHeight: '100vh',
            paddingTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
        }}>
            <div style={{
                maxWidth: '800px',
                width: '100%',
                padding: '2rem',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: 'var(--color-primary)'
                }}>
                    Example 01
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-muted)',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                }}>
                    This is a secondary route nested under <code>/demos</code>.
                    It demonstrates how Next.js App Router handles nested layouts and pages.
                </p>

                <div style={{
                    padding: '1.5rem',
                    background: 'var(--color-background)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '2rem'
                }}>
                    <strong>Current Path:</strong> <code style={{ color: 'var(--color-primary)' }}>/demos/example-1</code>
                </div>

                <Link href="/demos" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'var(--color-text-main)',
                    fontWeight: '500',
                    transition: 'color 0.2s'
                }}>
                    &larr; Back to Demos
                </Link>
            </div>
        </div>
    );
}
