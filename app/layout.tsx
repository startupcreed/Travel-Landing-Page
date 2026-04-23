import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import GoogleTagManager from '@/components/GoogleTagManager'
import MetaPixel from '@/components/MetaPixel'
import { metadata } from '@/components/Seo'
import LeadPopupForm from '@/components/LeadPopupForm'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='overflow-x-hidden scroll-smooth'>
      <head>
        <link rel="canonical" href="https://keralatour.info/" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className='relative'>
        <GoogleTagManager />
        <MetaPixel />
        <div className='circle-pink hidden lg:block'/>
        <div className='circle-yellow hidden xl:block'/>
        <Navbar />
        <main className='relative overflow-hidden'>
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <LeadPopupForm />
      </body>
    </html>
  )
}
