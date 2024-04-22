import React from 'react'
import UserProfile from './../../../Components/userside/Profile/UserProfile'
import NavScrollExample from '../../../Components/userside/Navbar/Navbar'
import Footer from '../../../Components/userside/Footer'

function Userprofilepage() {
  return (
    <div>
      <NavScrollExample/>
      <UserProfile/>
      <Footer/>
    </div>
  )
}

export default Userprofilepage