import { Inter } from 'next/font/google'
import "./style/main.scss";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TODO application',
  description: 'Get Things Done',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
