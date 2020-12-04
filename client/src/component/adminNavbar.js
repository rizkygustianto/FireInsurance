import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { logout } from '../store/actions';

export default function AdminNavbar() {
    const dispatch = useDispatch()
    const history = useHistory()

    function handleLogout(event) {
        event.preventDefault()
        dispatch(logout(err => {
            history.push('/login')
        })) 
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link><Link to='/admin' >Home</Link></Nav.Link>
                <Nav.Link><Link to='/admin/pending'>Pending Invoice</Link></Nav.Link>
                {/* <Nav.Link><Link to='/admin/occupation'>Occupation Type</Link></Nav.Link> */}
                <Nav.Link><Link to='/admin/add'>Add Occupation Type</Link></Nav.Link>
                <Nav.Link><span onClick={handleLogout}>Logout</span></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}