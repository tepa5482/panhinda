import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h1>404 &mdash; Page not found</h1>
      <p className="post-meta">That post doesn&apos;t exist (or has wandered off).</p>
      <p>
        <Link href="/">&larr; Back to all posts</Link>
      </p>
    </>
  );
}
