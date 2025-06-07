import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Invoice Dashboard',
  description: 'Manage invoices easily',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-body antialiased`}
      >
        {children}
        <footer className="flex items-center justify-between px-6 py-4 text-sm">
          {/* 左側 */}
          <div className="text-secondary-68 font-normal">
            © 2022, Made by{' '}
            <a href="#" className="text-primary-main">
              ABC
            </a>
          </div>
          {/* 右側連結 */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-primary-main font-normal hover:underline"
            >
              License
            </a>
            <a
              href="#"
              className="text-primary-main font-normal hover:underline"
            >
              More Themes
            </a>
            <a
              href="#"
              className="text-primary-main font-normal hover:underline"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-primary-main font-normal hover:underline"
            >
              Support
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
