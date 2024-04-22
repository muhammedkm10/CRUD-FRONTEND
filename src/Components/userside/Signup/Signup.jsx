import React, { useState } from 'react'
import './signup.css'
import axios from 'axios'
import { base_url } from '../../../constants'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import messi1 from './../images/messi1.jpeg'



function Signup() {
    const [username,setUsername] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate()


    function submithandle(e){
      e.preventDefault()
       const details = { 
        name:e.target.username.value,
        phone:e.target.phone.value,
        email:e.target.email.value,
        password:e.target.pass.value,

       }
       if (
        !details.name ||
        !details.phone ||
        !details.email ||
        !details.password
    )
       {
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'enter the credentials'
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
        axios.post(`${base_url}/userlist`,details)
        .then((response)=> {
         if(response.data === 'already'){
             Swal.fire({
               icon: 'error',
               title: 'error',
               text: 'The user is alredy present....!'
           });
           }
           if(response.data === 'needed'){
             Swal.fire({
               icon: 'error',
               title: 'error',
               text: 'Enter every data...'
           });
           }
         
         if(response.data === 'created'){
           Swal.fire({
             icon: 'success',
             title: 'succes',
             text: 'Account created successfully'
         });
         navigate('/login')
         }
         
        })
        .catch((error)=>console.error(error))
       }
       
    }
  return (
    <div className="y container d-flex justify-content-center align-items-center">
    <div className="card">
        <Card.Body className="card-body">
        <Card.Title>Sign Up</Card.Title>

        <Card.Img variant="top" src={messi1} />
            <form onSubmit={submithandle}>
                <div className="elements">
                    <input
                        type="text"
                        placeholder="name"
                        onChange={(e) => setUsername(e.target.value)}
                        name='username'
                    />
                </div>
                <div className="elements">
                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                    />
                </div>
                <div className="elements">
                    <input
                        type="number"
                        placeholder="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        name='phone'
                        className='phone'
                    />
                </div>
                <div className="elements">
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        name='pass'
                    />
                </div>
                <Button type="submit" variant="primary" className="mt-1">
                    Sign Up
                </Button>
            </form>
        </Card.Body>
    </div>
</div>
  )
}

export default Signup