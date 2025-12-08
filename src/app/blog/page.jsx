import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogBackground from "@/components/BlogBackground";
import styles from "./page.module.css";
import StarryBackground from "@/components/StarryBackground";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className={styles.main}>
      <StarryBackground className={styles.backgroundCanvas} />
      <BlogBackground className={styles.backgroundCanvas} />
      <div className={styles.container}>
        <h1 className={styles.title}>blog</h1>

        <div className={styles.postsContainer}>
          {
            posts.map((post) => (
              <article key={post.slug} className={styles.postCard}>
                <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <time className={styles.postDate}>{post.date}</time>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                </Link>
              </article>
            ))
          }
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            ← home
          </Link>
        </nav>
      </div>
    </main>
  );
}
