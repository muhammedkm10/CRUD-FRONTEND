import axios from 'axios'
import React, { useEffect, useState ,useContext} from 'react'
import { base_url } from '../../../constants'
import AuthContext from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import './profile.css'
import Card from 'react-bootstrap/Card';
import image from './../images/user_avatar.jpeg'

function UserProfile() {
    const {logout} = useContext(AuthContext)
    const [user,setUser] = useState(()=>localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')): null)
    const [userDetails,setUserDetails] = useState({})
    useEffect(()=>{
        if (user){
            fetchuserdata()
        }
    },[])
    function fetchuserdata(){
       console.log("inside of the fetch")
       axios.get(`${base_url}/userdata`,{
        'headers': {
            'Authorization': `Bearer ${user.access}`
        }
    })
    .then((response)=>{
        if(response.status === 200){
               theme(response.data)
             
        }
        else if(response.status === 401){
            logout()
        }
    })
    
    }
    function theme(data){
        setUserDetails(data)
    }

  return (
    <div>
        <div>
            <div className="container-fluid  u my-5">
                <div className="row py-5">
                    <div className="wrapper ">
                        <div className="image-wrapper">
                          
                           {userDetails.image ?<Card.Img variant="top" className="image rounded-pill"src={`${base_url}${userDetails.image}`} />:<Card.Img variant="top" className="image rounded-pill"src={image} />}
                         
                        </div>
                        <div className="details ">
                       <Card.Title  className='li'>Name  <span>      </span>:      {userDetails.username}</Card.Title>
                        <Card.Title className='li'>Phone     :   {userDetails.phone}</Card.Title>
                        <Card.Title className='li'> email     :     {userDetails.email}</Card.Title>
                        <div className='my-4'>
                        <Link className="j "to="/editprofile">edit profile</Link>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}

export default UserProfile