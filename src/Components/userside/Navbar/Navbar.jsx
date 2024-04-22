import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './navbar.css'
import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';

function NavScrollExample() {
  const {user,logout} = useContext(AuthContext)
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
           <Link className='links' onClick={logout}>logout</Link>
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