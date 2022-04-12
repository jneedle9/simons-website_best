import Header from "./Header"



function Layout({children}) {
    return (
       <div className='overall-grid-container'> 
          <Header/>
            {children}
      </div>
    )
  }
  
  export default Layout