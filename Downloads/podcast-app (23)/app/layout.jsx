import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Podcast Explorer - Advanced Podcast Search & Discovery",
  description: "Discover podcasts with powerful search, filtering, and sorting capabilities",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header is now rendered in app/page.jsx to manage search state */}
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  )
}
