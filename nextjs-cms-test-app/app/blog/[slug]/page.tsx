import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, formatDate } from '@/lib/posts';

// Render on every request (SSR), matching the Astro app's output: 'server'.
export const dynamic = 'force-dynamic';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <Link className="back-link" href="/">&larr; Back to all posts</Link>

      <header className="post-header">
        <h1>{post.title}</h1>
        <p className="post-meta">
          {formatDate(post.pubDate)} &middot; by {post.author}
        </p>
        {post.tags.length > 0 && (
          <ul className="tags">
            {post.tags.map((tag) => (
              <li className="tag" key={tag}>#{tag}</li>
            ))}
          </ul>
        )}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
