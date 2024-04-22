import React from 'react'
import { Route,Redirect } from 'react-router-dom'

const PrivateRout =({children, ...rest})=> {
    console.log("working")
  return (
   <Route {...rest}>{children}</Route>
  )
}

export default PrivateRout