import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { logout } from '../store/actions';

export default function CustomerNavbar() {
    const dispatch = useDispatch()

    function handleLogout(event) {
        event.preventDefault()
        dispatch(logout()) 
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Asuransi Kebakaran</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link><Link to='/' exact>Home</Link></Nav.Link>
                <Nav.Link><Link to='/request'>Buat Pengajuan</Link></Nav.Link>
                <Nav.Link><Link to='/my-request'>Daftar Pengajuan</Link></Nav.Link>
                <Nav.Link><Link to='/bio'>Edit Profil</Link></Nav.Link>
                <Nav.Link><Link to='/login' onClick={handleLogout}>Logout</Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}