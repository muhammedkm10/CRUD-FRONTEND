import React from 'react'
import NavScrollExample from '../../../Components/userside/Navbar/Navbar'
import { useContext } from 'react'
import Home from '../../../Components/userside/home/Home'
import Footer from '../../../Components/userside/Footer'

function Homepage() {
  return (
    <div>
        <NavScrollExample/>
        <Home/>
        <Footer/>
       
    </div>
  )
}

export default Homepage