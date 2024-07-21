import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import navStyle from './nav.module.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/Contextfile';

function NavbarTop() {

let {logout,  condata} = useAuth()
// console.log(userdata);

  return (
    <Navbar expand="lg" className="bg-body-dark" bg="secondary" data-bs-theme="dark">
    <Container fluid='md'>
      <Navbar.Brand href="#home">
        <img className={navStyle.logoimg} src="https://cdn-icons-png.flaticon.com/128/1162/1162456.png" alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        {
          condata?.isLogged==false ?
          <NavLink className={navStyle.link} to="/register">Register</NavLink>
          :
          ''
        }

       {
          condata?.isLogged==false ?
          <NavLink className={navStyle.link} to="/">Login </NavLink>
          :
          ''
      }

{
 condata?.isLogged==true ? 
<NavLink className={navStyle.link} to="/store">Store</NavLink>
  :
  ''
}
          
          {
          condata?.isLogged==true ?
          <NavLink className={navStyle.link} to="/dashboard">Dashboard</NavLink>
          :
          ''
      }
        {/* dropdown */}
      {
        condata?.userdata===null?
        ''
        :
        <NavDropdown className={navStyle.drop} title={condata?.userdata?.fullName} id="basic-nav-dropdown">
        <NavDropdown.Item href="#"className='text-center fs-5'onClick={()=>logout()} >Logout</NavDropdown.Item>
      </NavDropdown>
      }
        {/* dropdown */}

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarTop