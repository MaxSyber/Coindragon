import './globals.css'
import { Josefin_Sans } from 'next/font/google'

const josefin_sans = Josefin_Sans({ subsets: ['latin'] })

import Navbar from './componets/Navbar';
import Footer from './componets/Footer';



export const metadata = {
  title: 'Coin Dragon',
  description: 'You personal crypto portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={josefin_sans.className}>

        <Navbar />
        
        {children}

        <Footer />
        </body>
    </html>
  )
}
