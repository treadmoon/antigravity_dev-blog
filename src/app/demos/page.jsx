import Link from 'next/link';
import styles from './demos.module.css';

const DEMO_ITEMS = [
    {
        title: "Example 01",
        description: "A simple secondary route demonstration to show nested routing structure.",
        href: "/demos/example-1"
    },
    {
        title: "React 18: Concurrency",
        description: "Experience `useTransition` for keeping large list filtering responsive.",
        href: "/demos/react-18"
    },
    {
        title: "React 19: Optimistic UI",
        description: "Try `useOptimistic` for instant feedback on message submission.",
        href: "/demos/react-19"
    },
];

export const metadata = {
    title: "Demos | LangChain Demo",
    description: "Explore our interactive demos and examples.",
};

export default function DemosPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Demos & Examples</h1>
                <p className={styles.subtitle}>Explore interactive demonstrations and secondary routes.</p>
            </header>

            <div className={styles.grid}>
                {DEMO_ITEMS.map((demo, index) => (
                    <Link href={demo.href} key={index} className={styles.card}>
                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>{demo.title}</h2>
                            <p className={styles.cardDescription}>{demo.description}</p>
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.cardArrow}>Explore &rarr;</span>
                        </div>
                    </Link>
                ))}

                {/* Placeholder cards to fill grid visually if needed, or remove */}
                <div className={`${styles.card} glass`} style={{ borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>More demos coming soon...</p>
                </div>
            </div>
        </div>
    );
}
