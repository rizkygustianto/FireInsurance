import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { adminAddInsuranceOccupancy } from '../../store/actions';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

export default function AddFireInsurance() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [occupation, setOccupation] = useState('')
    const [rate, setRate] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        let payload = {
            occupationType: occupation,
            insuranceRate: rate
        }
        dispatch(adminAddInsuranceOccupancy(payload, (err) => {
            if (!err) {
                history.push('/admin')
            }
        }))
    }

    return (
        <Container>
            <h1 className='text-center'>Tambah Tipe Okupasi Asuransi Kebakaran</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Tipe Okupasi</Form.Label>
                    <Form.Control type="text" placeholder="eg; Rumah" onChange={(e) => setOccupation(e.target.value)} value={occupation} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Rate Premi</Form.Label>
                    <Form.Control type="number" placeholder="" onChange={(e) => setRate(e.target.value)} value={rate} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}