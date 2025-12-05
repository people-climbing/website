import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import BlogBackground from "@/components/BlogBackground";
import styles from "./page.module.css";
import StarryBackground from "@/components/StarryBackground";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <StarryBackground className={styles.backgroundCanvas} />
      <BlogBackground className={styles.backgroundCanvas} />
      <div className={styles.container}>
        <article className={styles.article}>
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <time className={styles.date}>{post.date}</time>
          </header>

          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            ← Home
          </Link>
        </nav>
      </div>
    </main>
  );
}
