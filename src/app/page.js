import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h4 className={styles.title}>
            Elevate Your <br />
            Web Experience
          </h4>
          <p className={styles.subtitle}>
            A premium foundation for your next project, featuring a modern design system,
            fluid animations, and a rich color palette.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/blog" className={`${styles.button} ${styles.primaryButton}`}>
              Get Started
            </Link>
            <Link href="https://nextjs.org" target="_blank" className={`${styles.button} ${styles.secondaryButton}`}>
              Documentation
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Modern Design</h3>
            <p className={styles.featureDesc}>
              Built with a focus on aesthetics and user experience, utilizing modern CSS features.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Responsive</h3>
            <p className={styles.featureDesc}>
              Looks stunning on any device, from mobile phones to high-resolution desktops.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Dark Mode</h3>
            <p className={styles.featureDesc}>
              Seamlessly switches between light and dark themes based on system preferences.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 LangChain Demo. All rights reserved.</p>
      </footer>
    </div>
  );
}

