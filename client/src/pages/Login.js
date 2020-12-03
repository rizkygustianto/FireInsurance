import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { login } from '../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()

    const isLogin = useSelector(state => state.isLogin)
    const role = useSelector(state => state.role)

    function handleLogin(event) {
        event.preventDefault()
        let payload = {
            email,
            password 
        }
        dispatch(login(payload)) 
    }

    return (
        <>
        {isLogin && role === 'customer' ? <Redirect to="/" /> : null}
        {isLogin && role === 'admin' ? <Redirect to="/admin" /> : null}
        <Container>
            <h1 className='text-center'>Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </>
    )
}