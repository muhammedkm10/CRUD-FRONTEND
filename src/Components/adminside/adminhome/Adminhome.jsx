import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';

function Adminhome() {
  const [admin, setAdmin] = useState(() => {
      const token = localStorage.getItem("Admintoken");
      
      if (token) {
          return JSON.parse(token);
      } else {
          return null;
      }
  });



  const handleLogout = () => {
      localStorage.removeItem("Admintoken");
      setAdmin(null);
  };

  return (
      <div>
          {/* Conditional rendering of the logout button */}
          {admin ? (
              <Button onClick={handleLogout}>Logout</Button>
          ) : (
              <h1>Welcome to the admin panel...</h1>
          )}
      </div>
  );
}

export default Adminhome;