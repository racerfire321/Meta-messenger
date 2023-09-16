import { Metadata } from 'next';
import './globals.css'
import Headers from './Headers'


export const metadata: Metadata = {
  title: 'Messenger',
  description:
    'This is a meta description. Welcome to Meta messenger demo .Login in with your Facebook Account',
};


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
