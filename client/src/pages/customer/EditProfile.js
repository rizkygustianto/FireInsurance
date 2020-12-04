import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { editUserProfile, getUserProfile } from '../../store/actions';

export default function EditProfile() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const user = useSelector(state => state.userProfile)

    // let userTemp = {}
    
    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    useEffect(() => {
        // userTemp = user
        // console.log(userTemp, 'payload edit');
        setName(user.name)
        setEmail(user.email)
    }, [user])

    function handleSubmit(event) {
        event.preventDefault()
        let payload = {
            name,
            email,
            password: user.password,
            role: user.role
        }
        dispatch(editUserProfile(payload,(err) => {
            if (!err) {
                history.push('/')
            }
        }))
    }

    return (
        <Container>
            <h1 className='text-center mt-5'>Edit Profile</h1>
            <Form onSubmit={handleSubmit} className='mt-5'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} value={name} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}