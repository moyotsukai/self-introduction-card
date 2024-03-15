import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import styles from './layout.module.css'
import Footer from '@/components/common/Footer'

const noto = Noto_Sans_JP({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: "自己紹介カードジェネレータ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${noto.className} ${styles.container}`}>
        <main className={styles.content}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
