import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Panhinda Blog',
  description: 'A sample SSR blog built with Next.js, test harness for the Panhinda CMS.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="site-header">
          <div className="container">
            <Link className="site-title" href="/">Panhinda Blog</Link>
            <nav className="site-nav">
              <Link href="/">Home</Link>
              <Link href="/#posts">Posts</Link>
            </nav>
          </div>
        </header>
        <main>
          <div className="container">{children}</div>
        </main>
        <footer className="site-footer">
          <div className="container">
            &copy; {new Date().getFullYear()} Panhinda Blog &middot; Built with Next.js (SSR)
          </div>
        </footer>
      </body>
    </html>
  );
}
