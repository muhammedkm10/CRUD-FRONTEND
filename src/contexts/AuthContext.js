import { createContext,useState,useEffect } from "react";
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom';
import {base_url} from '../constants'


const AuthContext = createContext()

export default AuthContext



export const AuthProvider  = ({children}) =>{

    const [user,setUser] = useState(()=>localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')): null)
    const [authtoken,setAuthToken] = useState(()=>localStorage.getItem('authTokens')?jwtDecode(localStorage.getItem('authTokens')): null)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
   
    useEffect(() => {
        if (user) {
            console.log("useeffect"); 
        }
    }, [user]); 

    
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
                          if (response.status === 200){
                            const actoken = response.data.access;
                            const decoded = jwtDecode(actoken);
                            localStorage.setItem('authTokens',JSON.stringify(response.data))
                            setUser(decoded)
                          }
                          else{
                              console.log("error occured")
                          }
                      })
                      .then((response)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Login Successful',
                            text: 'Welcome back!'
                        });
                          navigate("/")

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

      let logout = ()=>{
        setUser(null)
        setAuthToken(null)
        localStorage.removeItem('authTokens')
        navigate('/login')

                
      }

      let updateToken =   () =>{
        axios.post(`${base_url}/token/refresh`,
    {"refresh":authtoken.refresh})
   .then((response)=>{
    if(response.status === 200){
        console.log(response.data)
        setAuthToken(response.data)
        setUser(jwtDecode(response.data.access))
        localStorage.setItem('authTokens',JSON.stringify(response.data))
    }else{
       logout()
    }
    
   })
    }

    useEffect(()=>{
       
        
        let four = 1000*60*400
        let interval = setInterval(()=>{
            console.log("refreshed")
            if(authtoken){
                updateToken()
            }
        }, four)
        return ()=> clearInterval(interval)
    },[authtoken,loading])
      


    
    let contextdata = {
        user,
        logout,
        setUser,
        submithandle,
        authtoken,

    }
    return(
        <AuthContext.Provider value={contextdata}>
            {children}
        </AuthContext.Provider>
    )
}