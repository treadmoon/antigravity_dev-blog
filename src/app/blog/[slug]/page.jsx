import Link from 'next/link'
import styles from '../styles.module.css'

/**
 * generateStaticParams is the entry point for "Dynamic Routes + Static Generation" in Next.js App Router.
 * Next.js will generate static HTML pages at build time based on the number of params objects returned.
 */
export async function generateStaticParams() {
    return [
        { slug: '1' },
        { slug: '2' },
    ]
}

export default async function Page(props) {
    const { params, searchParams } = props
    const { slug } = await params
    const { name } = (await searchParams)

    // Simulating fetching data based on slug, in a real app this would be an API call
    const title = slug === '1' ? "震惊，台风来了还下班" : "不会吧不会吧，居然还有人不会！";
    const date = "December 17, 2024";
    const author = name || "Anonymous";

    return (
        <article className={styles.article}>
            <Link href="/blog" className={styles.backLink}>
                ← Back to Blog
            </Link>

            <header>
                <h1 className={styles.articleTitle}>{title}</h1>
                <div className={styles.articleMeta}>
                    <time>{date}</time> • 5 min read • By {author}
                </div>
            </header>

            <div className={styles.content}>
                <p>
                    This is a demonstration of the blog post layout. It uses a centered column
                    optimized for readability, with carefully selected font sizes and line heights.
                </p>

                <h2>The Importance of Good Design</h2>
                <p>
                    Design is not just about how things look, but how they work. A good user interface
                    guides the user through the content effortlessly.
                </p>

                <ul>
                    <li>Clear typography hierarchy</li>
                    <li>Sufficient whitespace</li>
                    <li>Responsive on all devices</li>
                </ul>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2>Conclusion</h2>
                <p>
                    By focusing on these core principles, we can build web applications that
                    are both beautiful and functional.
                </p>
            </div>
        </article>
    )
}