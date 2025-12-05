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
        <h1 className={styles.title}>Blog</h1>

        <div className={styles.postsContainer}>
          {posts.length === 0 ? (
            <p className={styles.noPosts}>No blog posts yet. Check back soon!</p>
          ) : (
            posts.map((post) => (
              <article key={post.slug} className={styles.postCard}>
                <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <time className={styles.postDate}>{post.date}</time>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                </Link>
              </article>
            ))
          )}
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            ← Home
          </Link>
        </nav>
      </div>
    </main>
  );
}
