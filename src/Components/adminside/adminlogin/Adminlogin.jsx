import axios from 'axios'
import React, { useContext, useState } from 'react'
import AdminContext from '../../../contexts/AdminContext'
import { Card, Button } from 'react-bootstrap';
import messi1 from './../../userside/images/meesi2.jpeg'

function Adminlogin() {
             const {submithandler} = useContext(AdminContext)
  return (
    <>
    <div className="y container d-flex justify-content-center align-items-center">
            <div className="card">
                <Card.Body className="card-body">
                    <Card.Title>Login</Card.Title>
                    <Card.Img variant="top" src={messi1}></Card.Img>

                    {/* The original form wrapped in a card */}
                    <form onSubmit={submithandler}>
                        {/* First form element: username */}
                        <div className="elements">
                            <input
                                name="name"
                                type="text"
                                placeholder="username"
                                // Add any event handlers here if needed
                            />
                        </div>
                        {/* Second form element: password */}
                        <div className="elements">
                            <input
                                name="pass"
                                type="password"
                                placeholder="password"
                                // Add any event handlers here if needed
                            />
                        </div>
                        {/* Submit button */}
                        <Button type="submit" variant="primary" className="mt-1">
                            Login
                        </Button>
                    </form>
                </Card.Body>
            </div>
        </div>
    </>
)}

export default Adminlogin