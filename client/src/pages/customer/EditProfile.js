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
    
    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
    }, [user])

    function handleSubmit(event) {
        event.preventDefault()
        let payload = {
            email,
            name
        }
        dispatch(editUserProfile(payload,(err) => {
            if (!err) {
                history.push('/')
            }
        }))
    }

    return (
        <Container>
            <h1 className='text-center'>Edit Profile</h1>
            <Form onSubmit={handleSubmit}>
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