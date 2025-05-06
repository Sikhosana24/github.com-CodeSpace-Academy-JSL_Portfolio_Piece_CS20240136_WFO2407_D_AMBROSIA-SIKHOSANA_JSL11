import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Your Name - Web Developer Portfolio",
  description: "Portfolio showcasing my skills in HTML, CSS, JavaScript, and React development",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 hidden md:flex">
                <a href="/" className="mr-6 flex items-center space-x-2 transition-all duration-300 hover:text-primary">
                  <span className="font-bold text-xl">YourName</span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <a href="/#about" className="transition-all duration-300 hover:text-primary text-foreground/60">
                    About
                  </a>
                  <a href="/#skills" className="transition-all duration-300 hover:text-primary text-foreground/60">
                    Skills
                  </a>
                  <a href="/#projects" className="transition-all duration-300 hover:text-primary text-foreground/60">
                    Projects
                  </a>
                  <a href="/#contact" className="transition-all duration-300 hover:text-primary text-foreground/60">
                    Contact
                  </a>
                </nav>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <nav className="flex items-center md:hidden">
                  <a
                    href="/"
                    className="mr-6 flex items-center space-x-2 transition-all duration-300 hover:text-primary"
                  >
                    <span className="font-bold">YourName</span>
                  </a>
                </nav>
              </div>
            </div>
          </header>
          {children}
          <footer className="w-full py-6 bg-background border-t">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Your Name. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
