import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import styles from './layout.module.css'
import Footer from '@/components/common/Footer'
import Header from "@/components/common/Header"

const noto = Noto_Sans_JP({ weight: '500', subsets: ['latin'] })

export const metadata: Metadata = {
  title: "自己紹介カードジェネレータ",
  description: "単語を入力して自己紹介カードを作ろう！",
  openGraph: {
    images: ["https://self-introduction.moyotsukai.dev/ogimage.png"]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${noto.className} ${styles.container}`}>
        <Header />
        <main className={styles.content}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
