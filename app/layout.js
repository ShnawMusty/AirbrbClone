import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from './components/navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import RegisterModal from './components/modals/RegisterModal'

import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'

const font = Nunito({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Airbnb',
  description: 'Done by ShnawMusty',
}

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <LoginModal/>
        <RegisterModal/>
        <RentModal/>
        <SearchModal/>
        <Navbar currentUser={currentUser}/> 
        <div className='pt-28 pb-20'>
          {children}
        </div>
        </body>
    </html>
  )
}
