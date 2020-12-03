import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import { getCustomerInvoices } from '../../store/actions';

export default function CustomerRequests() {
    const dispatch = useDispatch()

    const invoices = useSelector(state => state.customerInvoices)

    useEffect(() => {
        dispatch(getCustomerInvoices())
    }, [])

    return (
        <Container>
            <h1 className='text-center'>Daftar Pengajuan</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No. Polis</th>
                        <th>Jenis Penanggungan</th>
                        <th>No. Invoice</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices && invoices.map((element, key) => {
                        return (
                            <tr>
                                <td>{element.policyNumber}</td>
                                <td>{element.coverageType}</td>
                                <td>{element.invoiceNumber}</td>
                                <td>{element.status}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
        </Container>
    )
}