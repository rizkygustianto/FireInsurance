import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { getCheckoutDetails, submitCheckout } from '../../store/actions';


export default function Checkout() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getCheckoutDetails(id))
    }, [])

    const checkout = useSelector(state => state.checkoutDetails)

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(submitCheckout(id,(err) => {
            if (!err) {
                history.push('/')
            }
        }))
    }

    return (
        <Container>
            <h1 className='text-center'>Checkout</h1>
            <Table bordered hover>
                <tbody>
                    <tr>
                        <td>No. Invoice</td>
                        <td>{checkout.invoiceNumber}</td>
                    </tr>
                    <tr>
                        <td>Tipe Penanggungan</td>
                        <td>{checkout.coverageType}</td>
                    </tr>
                    <tr>
                        <td>Periode Penanggungan</td>
                        <td>{checkout.coveragePeriod}</td>
                    </tr>
                    <tr>
                        <td>Tipe Okupasi</td>
                        <td>{checkout.occupation}</td>
                    </tr>
                    <tr>
                        <td>Harga Properti</td>
                        <td>{checkout.propertyPrice}</td>
                    </tr>
                    <tr>
                        <td>Tipe Konstruksi</td>
                        <td>{checkout.construction}</td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td>{checkout.address}</td>
                    </tr>
                    <tr>
                        <td>Kota/Kabupaten</td>
                        <td>{checkout.city}</td>
                    </tr>
                    <tr>
                        <td>Provonsi</td>
                        <td>{checkout.district}</td>
                    </tr>
                    <tr>
                        <td>Daerah</td>
                        <td>{checkout.region}</td>
                    </tr>
                    <tr>
                        <td>Perluasan Penanggungan: Gempa Bumi</td>
                        <td>{checkout.earthquake ? 'Ya' : 'Tidak'}</td>
                    </tr>
                    <tr>
                        <td>Premi Dasar</td>
                        <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(checkout.basePremium)}</td>
                    </tr>
                    <tr>
                        <td>Biaya Administrasi</td>
                        <td>Rp. 10.000</td>
                    </tr>
                    <tr>
                        <td>Grand Total</td>
                        <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(checkout.insurancePremium)}</td>
                    </tr>
                </tbody>
            </Table>
            <Button onClick={handleSubmit}>Checkout</Button>
        </Container>
    )
}