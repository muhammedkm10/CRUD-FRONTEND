import React, { useEffect, useState } from 'react'
import { base_url } from '../../../constants'
import axios from 'axios'
import Button from '@mui/material/Button'; // Importing Button component from MUI
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Userlist.css'
import {Card} from 'react-bootstrap';
import image from './../../userside/images/user_avatar.jpeg'

function Users() {
    const [users,setUsers] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate  = useNavigate()

    useEffect(()=>{
        const  details = {
            string : ""
        }
        axios.get(`${base_url}/adminlogin`,{ params: details })
        .then((response)=>setUsers(response.data))
        .catch((error)=> console.log(error))

    },[isModalOpen])

    function submithandling(e){
        e.preventDefault()
        const  details = {
            string : e.target.search.value
        }

        axios.get(`${base_url}/adminlogin`,{ params: details })
        .then((response)=>setUsers(response.data))
        .catch((error)=> console.log(error))

        
    }

    // fuction to add the user
    function adduser(e){
                e.preventDefault()
                const details = {
                    username:e.target.name.value,
                    email:e.target.email.value,
                    phone:e.target.phone.value,
                    password:e.target.pass.value
                }
                if (
                    !details.username ||
                    !details.email ||
                    !details.phone ||
                    !details.password 
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

                    axios.post(`${base_url}/adduser`,details)
                    .then((response)=>{
                        if (response.data === 'added'){
                            Swal.fire({
                                icon: 'success',
                                title: 'success',
                                text: 'User  added successfully'
                            });
                            navigate('/userlist')
                            setModalOpen(false)
    
                        }
                        if (response.data === 'userisalreadythere'){
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: 'user is already exists'
                            });
                        }
                        if (response.data === 'enter'){
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: 'enter the data'
                            });
                        }
                    })

                }
               
    }

    // function to delete the user
    
    function deleteuser(id){
        alert("do you want to delele the user ?")
        axios.delete(`${base_url}/adduser/${id}`)
        .then((response)=>{
            if(response.data === 'deleted'){
               
                Swal.fire({
                    icon: 'success',
                    title: 'success',
                    text: 'User is deleted successfully'
                });
                const  details = {
                    string : ""
                }
                axios.get(`${base_url}/adminlogin`,{ params: details })
                .then((response)=>setUsers(response.data))
                .catch((error)=> console.log(error))
               
            }
        })
    }




    // Function to close the modal


    const closeModal = () => {
        setModalOpen(false);
    };



  return (
   <>
    {!isModalOpen &&
     <div>
     <form onSubmit={submithandling}>

        <div className="container search-wrap mt-4">
         <div className="row">
         <div className="col-md-6">
            <input className='col-md-8' type="text" name='search' />
            <button className="btn btn-info col-md-4" type='submit'>search</button>
        </div>
        <div className="col-md-6">
            <button className="btn btn-success" onClick={() => setModalOpen(!isModalOpen)}> <i className="fa fa-plus" aria-hidden="true"></i>Add User</button>
        </div>
          
            </div>
        </div> 
     
     </form>
  
    </div>
    }  


    <div className="container userslisting">
        <div className="row">
        {   
          !isModalOpen&&(        
          users.map((user)=>(

            <div className='col-md-3 m-5  card-body2'>
            {user.image ?(
                <Card.Img variant="top" src={`${base_url}/${user.image}`} alt='' />
            ):<Card.Img variant="top" src={image} alt='' />} 
            <div className="contents1">
                <Card.Title>Name: {user.username}</Card.Title>
                <Card.Text>
                    <h5 className='email'>Email : {user.email}</h5>
                    <h5>Phone : {user.phone}</h5>
                </Card.Text>
                <div className="button-continer1">
                <Link to={`/edituser/${user.id}`} className="edit">Edit User</Link>
                <button className="delete"variant="danger" onClick={() => deleteuser(user.id)}>Delete</button>
                </div>

                </div>
                </div>
          ))
        )}
        </div>
    </div>
  
         
                
           






     {isModalOpen && (
        <div className="container">
        <form onSubmit={adduser}>
            <div className="form-group">
                <input type="text" name='name' className="form-control mb-3" placeholder="Name" />
            </div>
            <div className="form-group">
                <input type="email" name='email' className="form-control mb-3" placeholder="Email" />
            </div>
            <div className="form-group">
                <input type="tel" name='phone' className="form-control mb-3" placeholder="Phone" />
            </div>
            <div className="form-group">
                <input type="password" name='pass' className="form-control mb-3" placeholder="Password" />
            </div>
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
            </div>
        </form>
    </div>
    
            )}
   </>
  )
}


export default Users


