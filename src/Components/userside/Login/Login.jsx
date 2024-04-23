import './login.css'
import React, { useContext, useState } from 'react'
import AuthContext from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import messi1 from './../images/messi1.jpeg'
function Login() {
     
  
    const {submithandle} = useContext(AuthContext)

    
  return (
    <div className="y container d-flex justify-content-center align-items-center">

    <div className='card'>
    
    <Card.Body className='card-body'>
    <Card.Title>Login...</Card.Title>

    <Card.Img className=''variant="top" src={messi1} />
        <form onSubmit={submithandle}>
            <div className='elements'>
                <input name="username" type="text" id="username" placeholder='username' />
            </div>
            <div className='elements'>
                <input name="pass" type="password" id="password" placeholder='password' />
            </div>
            <Button type='submit'className='mt-1' variant='primary'>Login</Button>
            
        </form>
        <div className='mt-3'>
        <span className='dia '>no account?     </span><a href=""  className='dia' ><Link className='dia' to="/signup"><span className='signuplink'>Sign Up</span></Link></a>
        </div>
    </Card.Body>
    
</div>
</div>
  )
}

export default Login