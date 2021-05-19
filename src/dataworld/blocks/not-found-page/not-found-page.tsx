import HeaderLinks from 'app/modules/introduce/components/header-links.component'
import Header from 'app/modules/introduce/components/header.component'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import Footer from '../footer/footer.component'
import './not-found-page.scss'

export default function NotFoundPage() {
  const user = useSelector((state: RootState) => state.auth.user)
  return (
    <>
      {user.accountId === '' && (
        <Header
          brand='Data world'
          rightLinks={<HeaderLinks />}
          fixed
          color='dark'
        />
      )}
      <img
        className='h-mt-100 img-not-found'
        src={`${process.env.PUBLIC_URL}/images/not-found-page.jpg`}
        alt='Not found'
      />
      <Footer />
    </>


  )
}