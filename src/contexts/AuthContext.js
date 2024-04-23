import { createContext,useState,useEffect } from "react";
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom';
import {base_url} from '../constants'


const AuthContext = createContext()

export default AuthContext



export const AuthProvider  = ({children}) =>{

   
    const navigate = useNavigate()
   
   
    
      function submithandle (e){
          
              e.preventDefault()
              const details = {
                  username:e.target.username.value,
                  password:e.target.pass.value
              }
              axios.post(`${base_url}/login`,details) 
              .then((response)=>{
                if (response.data === "incurrect"){
                  Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Enter the  currect password'
                  });
              }
                 else if(response.data === "authenticated"){
                      
                  
                      axios.post(`${base_url}/api/token`,details)
                      .then((response)=>{
                        if(response.status === 200){
                    
                            localStorage.setItem('authTokens',JSON.stringify(response.data))
                         }
                      })
                      .then((response)=>{
                         Swal.fire({
                             icon: 'success',
                             title: 'succes',
                             text: 'you login in '
                         });
                          navigate('/')
         
                      })
                      
  
                  }
                  else if (response.data === "notfound"){
                      Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Enter the  currect username or password'
                      });
                  }
                      
                  
              })
              .catch((error)=>console.log(error))       
      }

    

//       let updateToken =   () =>{
//         axios.post(`${base_url}/token/refresh`,
//     {"refresh":authtoken.refresh})
//    .then((response)=>{
//     if(response.status === 200){
//         console.log(response.data)
//         setAuthToken(response.data)
//         setUser(jwtDecode(response.data.access))
//         localStorage.setItem('authTokens',JSON.stringify(response.data))
//     }else{
//        logout()
//     }
    
//    })
//     }

    // useEffect(()=>{
       
        
    //     let four = 1000*60*400
    //     let interval = setInterval(()=>{
    //         console.log("refreshed")
    //         if(authtoken){
    //             updateToken()
    //         }
    //     }, four)
    //     return ()=> clearInterval(interval)
    // },[authtoken,loading])
      


    
    let contextdata = {
        submithandle,
    }
    return(
        <AuthContext.Provider value={contextdata}>
            {children}
        </AuthContext.Provider>
    )
}