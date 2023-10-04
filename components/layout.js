import Nav from './Nav/Index'
import Footer from './Footer/Index'
import Padder from './Shared/Padder/Index'

export default function Layout({ children }) {

  return (
    <>
      <Nav />
      {/* <div className="pt-[6rem]"> */}
      <Padder>
        <main>{children}</main>
      </Padder>
      {/* </div> */}
      <Footer />
    </>
  )
}
