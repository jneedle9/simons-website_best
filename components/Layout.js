import Header from "./Header"
import Head from "next/head"
import Footer from "./Footer"


function Layout({children}) {
    return (
      <div className='overall-grid-container'>
        <Header/>
          {children}
        <Footer/>          
      </div>
    )
  }
  
  export default Layout