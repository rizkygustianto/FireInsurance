import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button' 

import { getOccupancyType } from '../../store/actions';

export default function AdminDashboard() {
    
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getOccupancyType())
    }, [])

    const insurance = useSelector(state => state.occupancyType)

    function handleEdit(id) {
        history.push(`/admin/insurance/fire/${id}`)
    }

    return (
        <Container>
            <h1 className='text-center'>Admin Home</h1>
            <h2 className='text-center'>Tipe Okupasi Asuransi Kebakaran</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tipe Okupasi</th>
                        <th>Rate Asuransi</th>
                        <th colSpan='2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {insurance && insurance.map((element, key) => {
                        return (
                            <tr>
                                <td>{element.occupationType}</td>
                                <td>{element.insuranceRate}</td>
                                <td><Button onClick={(e) => handleEdit(element._id)}>Edit</Button></td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
        </Container>
    )
}