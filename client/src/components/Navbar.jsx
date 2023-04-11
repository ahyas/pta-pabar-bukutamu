import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBCollapse
} from 'mdb-react-ui-kit';
import {  NavLink } from 'react-router-dom';
import { googleLogout} from "@react-oauth/google"

export default function Navbar({role_id}) {
  const [showBasic, setShowBasic] = useState(false)
  const logout = () => {
    if(window.confirm("Anda yakin ingin keluar dari aplikasi ini?")){
        googleLogout();
        localStorage.removeItem("user");
        window.location.reload()
    }
  };

  if(role_id===1){
    return (
      <MDBNavbar expand='lg' light bgColor='light' style={{"marginBottom":"20px"}}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
              <img
                src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
                height='30'
                alt=''
                loading='lazy'
              />
              <b>Buku tamu</b>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
  
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
              </MDBNavbarItem>
  
              <MDBNavbarItem>
                <NavLink className="nav-link" to="/verifikasi">
                  Verifikasi
                </NavLink>
              </MDBNavbarItem>
  
            </MDBNavbarNav>
            <p>{}</p>
            <MDBBtn onClick={logout} className='me-1' color='danger'>Logout</MDBBtn>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }else{
    return (
      <MDBNavbar expand='lg' light bgColor='light' style={{"marginBottom":"20px"}}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
                <img
                  src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
                  height='30'
                  alt=''
                  loading='lazy'
                />
                <b>Buku tamu</b>
            </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
  
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
              </MDBNavbarItem>
  
              <MDBNavbarItem>
                <NavLink className="nav-link" to="/list">
                  Riwayat
                </NavLink>
              </MDBNavbarItem>
  
            </MDBNavbarNav>

            <MDBBtn onClick={logout} className='me-1' color='danger'>Logout</MDBBtn>
            
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }
}