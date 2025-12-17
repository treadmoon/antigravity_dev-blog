import styles from './styles.module.css'
import Link from 'next/link'

const posts = [
  {
    id: 1,
    title: "震惊，台风来了还下班",
    excerpt: "Exploring the unexpected consequences of severe weather on corporate culture and remote work policies.",
    date: "Dec 17, 2024",
    readTime: "5 min read",
    slug: "1"
  },
  {
    id: 2,
    title: "不会吧不会吧，居然还有人不会！",
    excerpt: "A deep dive into common development pitfalls and how to avoid them with modern practices.",
    date: "Dec 16, 2024",
    readTime: "8 min read",
    slug: "2"
  },
  {
    id: 3,
    title: "The Future of AI in Web Development",
    excerpt: "How large language models are reshaping the way we build and interact with web applications.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    slug: "1"
  }
]

export default function Page() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Latest Updates</h1>
        <p className={styles.subtitle}>Insights, thoughts, and trends from our team.</p>
      </header>

      <div className={styles.grid}>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}${post.id === 1 ? '?name=kill' : ''}`} key={post.id} className={styles.card}>
            <div>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
            </div>
            <div className={styles.cardMeta}>
              <span>{post.date}</span>
              <span className={styles.readMore}>Read Post →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

