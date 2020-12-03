import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createInvoice, getOccupancyType } from '../../store/actions';

export default function RequestForm() {
    const history = useHistory()
    const dispatch = useDispatch()

    const occupancyType = useSelector(state => state.occupancyType)

    const [occupancy, setOccupancy] = useState('')
    const [period, setPeriod] = useState(0)
    const [propertyPrice, setPropertyPrice] = useState(0)
    const [construction, setConstruction] = useState(0)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [region, setRegion] = useState('')
    const [earthquake, setEarthquake] = useState(false)

    useEffect(() => {
        dispatch(getOccupancyType())
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        let payload = {
            coveragePeriod: period,
            occupation: occupancy,
            propertyPrice: propertyPrice,
            construction: construction,
            address: address,
            city: city,
            district: district,
            region: region,
            earthquake: earthquake
        }
        dispatch(createInvoice(payload, ((err, id) => {
            if (id) {
                history.push(`/checkout/${id}`)
            }
        })))
    }

    return (
        <Container>
            <h1 className='text-center'>Asuransi Kebakaran</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Tipe Okupansi</Form.Label>
                    <Form.Control as="select" onChange={(e) => setOccupancy(e.target.value)} value={occupancy}>
                        <option>--- Pilih Tipe Okupansi ---</option>
                        {occupancyType.map((element, key) => {
                            return (
                            <option value={element.occupationType} key={key}>{element.occupationType}</option>
                            )
                        })}
                    
                    {/* <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option> */}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Jangka Waktu Pertanggungan</Form.Label>
                    <Form.Control as="select" onChange={(e) => setPeriod(e.target.value)} value={period}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Harga Bangunan</Form.Label>
                    <Form.Control type="number" placeholder="Dalam rupiah" onChange={(e) => setPropertyPrice(e.target.value)} value={propertyPrice} required />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Tipe Konstruksi</Form.Label>
                    <Form.Control as="select" onChange={(e) => setConstruction(e.target.value)} value={construction}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Alamat Objek Pertanggungan</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(e) => setAddress(e.target.value)} value={address} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Provinsi</Form.Label>
                    <Form.Control type="text" placeholder="contoh: Banten" onChange={(e) => setDistrict(e.target.value)} value={district} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Kota/Kabupaten</Form.Label>
                    <Form.Control type="text" placeholder="contoh: Jakarta Selatan" onChange={(e) => setCity(e.target.value)} value={city} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Daerah</Form.Label>
                    <Form.Control type="text" placeholder="contoh: Jawa Timur" onChange={(e) => setRegion(e.target.value)} value={region} required />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Gempa Bumi" onChange={(e) => setEarthquake(e.target.checked)} value={earthquake} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}