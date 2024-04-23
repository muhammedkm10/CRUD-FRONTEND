import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './navbar.css'
import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavScrollExample() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authTokens");
    
    if (token) {
        return JSON.parse(token);
    } else {
        return null;
    }
});
    let logout = ()=>{
      localStorage.removeItem('authTokens')
      console.log('logout')
      navigate('/login')
        }


  return (
    <Navbar expand="lg" className="bg-body-info">
      <Container fluid>
      <Link className="links1"to="/"><Navbar.Brand  className="links1" href="#">User Home</Navbar.Brand></Link> 
        <Navbar.Toggle className="toggle"aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div className='linkWrap'>
          {!user ?
           <Link className='links' to="/login">login</Link>:
           <div >
           <Link className='links' to="/userprofile">My profile</Link>
           <button className='button1' onClick={logout}>logout</button>
           </div>

           }
            </div>
           
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;