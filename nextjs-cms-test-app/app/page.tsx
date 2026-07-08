import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/posts';

// Render on every request (SSR), matching the Astro app's output: 'server'.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      <h1>Panhinda Blog</h1>
      <p className="post-meta">
        A sample server-rendered blog and test harness for the Panhinda CMS.
      </p>

      <ul className="post-list" id="posts">
        {posts.map((post) => (
          <li className="post-card" key={post.slug}>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="post-meta">{formatDate(post.pubDate)}</p>
            <p className="desc">{post.description}</p>
            {post.tags.length > 0 && (
              <ul className="tags">
                {post.tags.map((tag) => (
                  <li className="tag" key={tag}>#{tag}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
