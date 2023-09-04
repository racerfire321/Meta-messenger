import './globals.css'
import Headers from './Headers'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html >
      <body >
        <Headers/>
        {children}</body>
    </html>
  )
}
