import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import { login } from '../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'

export default function Home() {

    return (
        <Container>
            <h1 className='text-center mt-5'>Home</h1>
        </Container>
    )
}