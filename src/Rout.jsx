import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/usersidepages/Homepage/Homepage'
import Signuppage from './pages/usersidepages/Signup/Signuppage'
import Loginpage from './pages/usersidepages/Loginpage/Loginpage'
import Userprofilepage from './pages/usersidepages/userprofile/Userprofile'
import Editprofilepage from './pages/usersidepages/Editprofilepage/Editprofilepage'
import Adminloginpage from './pages/adminpages/Adminloginpage'
import Adminhomepage from './pages/adminpages/Adminhomepage'
import Userslisting from './pages/adminpages/Userslistingpage'
import Edituser from './Components/adminside/Userlist/Edituser'

function Rout() {
  return (
    <div>
             <Routes>
                <Route path='userprofile' element={<Userprofilepage/>}></Route>
                <Route exact  path='/' element={<Homepage/>}></Route>
                <Route path='signup' element={<Signuppage/>}></Route>
                <Route path='login' element={<Loginpage/>}></Route>
                <Route path='userlist' element={<Userslisting/>}></Route>
                <Route path='editprofile' element={<Editprofilepage/>}></Route>
                <Route path='adminlogin' element={<Adminloginpage/>}></Route>
                <Route path='adminhome' element={<Adminhomepage/>}></Route>
                <Route path='edituser/:id' element={<Edituser/>}></Route>



             </Routes>


    </div>
  )
}

export default Rout