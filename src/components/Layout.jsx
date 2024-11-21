import React from 'react'
import { Outlet } from 'react-router-dom'
import NavScrollExample from './Navbar'


const Layout = () => {

 
  return (
    <div>
        <header>
            <NavScrollExample />            
        </header>
        <main>
      <Outlet />
      </main>
      <footer>
        <p>Hack Academy Copyright <i className="bi bi-c-circle"></i></p>
      </footer>
    </div>
  )
}

export default Layout
