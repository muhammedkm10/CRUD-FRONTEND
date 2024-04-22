import React, { useEffect,useState } from 'react'
import './editprofile.css'
import axios from 'axios'
import { base_url } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button'



function Editprofile() {
    const [user,setUser] = useState(()=>localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')): null)
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [imageUrl, setImageUrl] = useState(null);


    const [image,setImage] = useState(null)
    const Navigate = useNavigate()

    useEffect(()=>{ 
        if (user){
            fetchdata()
    }
     },[])
    console.log(user)
    function fetchdata(){
        console.log("inside of fetch")
        axios.get(`${base_url}/userdata`,{
            'headers':{
                'Authorization': `Bearer ${user.access}`
            }
        })
        .then((response)=>{
            if(response.status === 200){
                const { username, email, phone,image } = response.data;
                setUsername(username);
                setEmail(email);
                setPhone(phone);
                setImage(image)
         }
        })
        .catch((error)=>console.log(error))
    }
    

    function submithandler(e){
               e.preventDefault()
               const details = { 
                name:e.target.username.value,
                phone:e.target.phone.value,
                email:e.target.email.value,
        
               }
               console.log(details.name)

               if (
                !details.name ||
                !details.phone ||
                !details.email
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
                const formdata = new FormData()
                formdata.append('username',username)
                formdata.append('phone',phone)
                formdata.append('email',email)
                if (image){
                 formdata.append('image',image)
                }
                console.log(formdata)
 
                axios.put(`${base_url}/login`,formdata,{
                 headers:{
                     'Authorization': `Bearer ${user.access}`,
                     'Content-Type': 'multipart/form-data',
                 }
                })
                .then((response)=>{
                 if(response.data === "updated"){
                     Swal.fire({
                         icon: 'success',
                         title: 'success',
                         text: 'your profile updated successfully....!'
                     });
                     Navigate("/userprofile")
                 }
                 
                 else{
                     Swal.fire({
                         icon: 'error',
                         title: 'error',
                         text: 'some error occured try again...!'
                     });
                     Navigate("/editprofile")
                 }
                })
                .catch((error)=>console.log(error))
            }
               
              
               
               
    }
    function handleFileChange(e){
             setImage(e.target.files[0])
             const file = e.target.files[0]; // Get the selected file
        if (file) {
            // Set the file in state
            setImage(file);

            // Create a URL for the file and set it in state
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    }
    
  return (
    <>
    <div>
   

    <div className="container justify-content-center my-5">
        <div className="row ">
            <div className="card-wrapper">
            <Card.Body className='card-body1'>
                <Card.Title className='my-3'>Edit Your profile here</Card.Title>
                <img className='img-fluid'src={`${base_url}/${image}`} alt="" />
           
        <form onSubmit={submithandler}>
            <div className='itmes my-3'>
                <input value={username}  name="username"onChange={(e)=>setUsername(e.target.value)}type="text" />
            </div>
            <div className='itmes my-3'>
                <input value={email} name='email' onChange={(e)=>setEmail(e.target.value)}type="email" />
            </div >
            <div className='itmes my-3'>
                <input value={phone} className='phone'  name="phone"onChange={(e)=>setPhone(e.target.value)} type="number" />
            </div>
            <div className='itmes my-3'>
            <div>
            {/* Styled file input */}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="custom-file-input"
                id="fileInput"
            />
            <label htmlFor="fileInput" className="custom-file-label">
                Choose an image
            </label>
        </div>
            {imageUrl && (
                <div style={{ marginTop: '10px' }}>
                    <img className='img-fluid' src={imageUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
            )}
            </div>
            <Button type="submit">save</Button>
        </form>
            </Card.Body>

            </div>
        </div>
    </div>
      





    </div>
    </>
    )
}

export default Editprofile