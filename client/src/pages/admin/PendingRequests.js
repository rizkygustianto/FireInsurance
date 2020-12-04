import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { adminApproveRequest, adminRejectRequest, getAdminPendingInvoices } from '../../store/actions';

export default function PendingRequests() {
    const dispatch = useDispatch()

    const requests = useSelector(state => state.adminPendingInvoice)

    useEffect(() => {
        dispatch(getAdminPendingInvoices())
    }, [])

    function handleApprove(id) {
        dispatch(adminApproveRequest(id))
        dispatch(getAdminPendingInvoices())
    }

    function handleReject(id) {
        dispatch(adminRejectRequest(id))
        dispatch(getAdminPendingInvoices())
    }

    return (
        <Container>
            <h1 className='text-center'>Daftar Pengajuan</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No. Invoice</th>
                        <th>Alamat</th>
                        <th>Tipe Okupasi</th>
                        <th>Grand Total</th>
                        <th colSpan='2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests && requests.map((element, key) => {
                        return (
                            <tr>
                                <td>{element.invoiceNumber}</td>
                                <td>{element.address}</td>
                                <td>{element.occupation}</td>
                                <td>{element.insurancePremium}</td>
                                <td><Button onClick={(e) => handleApprove(element._id)}>Approve</Button></td>
                                <td><Button onClick={(e) => handleReject(element._id)}>Reject</Button></td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
        </Container>
    )
}