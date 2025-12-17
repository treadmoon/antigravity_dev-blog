import styles from './styles.module.css'

export default function BlogLayout({
    children,
}) {
    return (
        <div className={styles.blogContainer}>
            {children}
        </div>
    )
}
