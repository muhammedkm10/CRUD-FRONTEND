import {  createContext, useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { base_url } from "../constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AdminContext = createContext()
export default AdminContext
export  const AdminsideProvider = ({children})=>{

    const [admin,setAdmin] = useState(()=>localStorage.getItem("Admintoken")?JSON.parse(localStorage.getItem('Admintoken')):null)
    const [adminToken,setAdmintoken] = useState(()=>localStorage.getItem("Admintoken")?jwtDecode(localStorage.getItem('Admintoken')):null)
    

    const navigate = useNavigate()
    function submithandler(e){
        const details = {
            username:e.target.name.value,
            password:e.target.pass.value
        }
    
     e.preventDefault()
     axios.post(`${base_url}/adminlogin`,details)
     .then((response)=>{
         console.log(response.data)
         if (response.data === "currect"){
             
             axios.post(`${base_url}/api/token`,details)
             .then((response)=>{
                if(response.status === 200){
                    
                   localStorage.setItem('Admintoken',JSON.stringify(response.data))
                }
             }).then((response)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'succes',
                    text: 'you login in '
                });
                 navigate('/adminhome')

             })
             
         }
         else if(response.data === "incurrect"){
             Swal.fire({
                 icon: 'error',
                 title: 'error',
                 text: 'password is incurrect'
             });
         }
         else if(response.data === "notadmin"){
             Swal.fire({
                 icon: 'error',
                 title: 'error',
                 text: 'You are not an admin of this page......!'
             });
         }
         else if(response.data === "nomatch"){
             Swal.fire({
                 icon: 'error',
                 title: 'error',
                 text: 'Username is incurrect'
             });
         }
     })
     .catch((error)=>console.log(error))
         
    }



    let details = {
        submithandler,
        admin,
        adminToken
    }
    return(
        <AdminContext.Provider value={details}>
            {children}
        </AdminContext.Provider>
    )
}



