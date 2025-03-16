import "./globals.css"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import Loader from "./loader"
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "IPRMS",
  description: "Integrated Patient Record Management System",
}

export default function RootLayout({
  children
}) {
  return (
    (<html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <Suspense fallback={<Loader />}>
          {children}
          </Suspense>
        {/* </ThemeProvider> */}
      </body>
    </html>)
  );
}

