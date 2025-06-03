import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

const Estrucutre = ({ MainContent }: { MainContent: ReactNode }) => {
  return (
    <>
      <Header />
      {MainContent}
      <Footer />
    </>
  )
}

export default Estrucutre
