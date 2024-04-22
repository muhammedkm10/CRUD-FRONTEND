import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../../constants';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import FillExample from '../adminnavbar/Adminnavbar';

function Edituser() {
    const [user,setUser] = useState({})
    const [username,setUsername] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const { id } = useParams();
    const navigate = useNavigate()


    useEffect(()=>{
       
        axios.get(`${base_url}/adduser/edit/${id}`)
        .then((response)=>{
            setUsername(response.data.username)
            setPhone(response.data.phone)
            setEmail(response.data.email)
            setUser(response.data)

        })
        .catch((error)=>console.log(error))
    },[])

//    edit user function

   function edituser(e){
    e.preventDefault()
    const formdata  = new FormData()
    const details = {
        username:e.target.username.value,
        email:e.target.email.value,
        phone:e.target.phone.value,
    }
    if (
        !details.username ||
        !details.email ||
        !details.phone 
    ){
       
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'enter the data'
        });
        return;

    }
    else{
        
        if (details.phone.length  !== 10){
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: 'enter a valid phone number'
            });
            return;

        }
        formdata.append('id',user.id)
        formdata.append('username',username)
        formdata.append('phone',phone)
        formdata.append('email',email)
   
      
       axios.put(`${base_url}/adduser`,formdata)
       .then((response)=>{
           if(response.data === 'updated'){
               Swal.fire({
                   icon: 'success',
                   title: 'success',
                   text: 'updated succesfully'
           })
           navigate('/userlist')
       }
           else if(response.data === 'already'){
               Swal.fire({
                   icon: 'error',
                   title: 'error',
                   text: 'change the name'
           })
           }
       })
       .catch((error)=>console.log(error))

    }
     
   }

  return (
    <>
    <FillExample/>
    <div className="container">
    <Card className="form-wrapper">
            <Card.Title>Edit User</Card.Title>
            <form onSubmit={edituser}>
                {/* Name input */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Name</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" className="form-control" id="username" required />
                </div>
                {/* Email input */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} name="email" type="email" className="form-control" id="email" required />
                </div>
                {/* Phone input */}
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onChange={(e) => setPhone(e.target.value)} value={phone} name="phone" type="tel" className="form-control" id="phone" required />
                </div>
                {/* Submit button */}
                <Button type="submit" variant="primary">Edit</Button>
            </form>
    </Card>
</div>
</>


  )
}

export default Edituser