import axios from 'axios';

export const login = ({ email, password }) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(
                'http://localhost:3000/login',
                {
                    email,
                    password,
                }
            ).then(({ data }) => {
                dispatch({
                    type: 'LOGIN',
                    payload: data
                })
                resolve();
            }).catch((error) => {
                reject(error);
            });
        })
    }
}

export function logout() {
    return ({
        type: 'LOGOUT'
    })
}

export const getUserProfile = (cb) => {
    return (dispatch) => {
        fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data, 'get user profile');
                dispatch({
                    type: 'UPDATE_USER_DATA',
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const editUserProfile = (payload,cb) => {
    return dispatch => {
        fetch(`http://localhost:3000/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.getItem('access_token')
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'edited user profile');
                cb(null)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getOccupancyType = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/insurance/fire', {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data, 'get occupancy');
                dispatch({
                    type: 'UPDATE_OCCUPANCY_TYPE',
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const createInvoice = (payload,cb) => {
    return dispatch => {
        fetch(`http://localhost:3000/invoice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.getItem('access_token')
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'created invoice');
                cb(null,data.insertedId)
            })
            .catch(err => {
                console.log(err)
                cb(err,null)
            })
    }
}

export const getCheckoutDetails = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/invoice/checkout/${id}`, {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data, 'get checkout details');
                dispatch({
                    type: 'UPDATE_CHECKOUT_DETAILS',
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const submitCheckout = (id,cb) => {
    return dispatch => {
        fetch(`http://localhost:3000/invoice/checkout/submit/${id}`, {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'submitted checkout');
                cb(null)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getCustomerInvoices = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/invoice', {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data, 'get customer invoices');
                dispatch({
                    type: 'UPDATE_CUST_INVOICES',
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getAdminPendingInvoices = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/admin/invoice`)
                .then(({ data }) => {
                    console.log(data, 'get admin pending invoice');
                    dispatch({
                        type: 'UPDATE_ADM_PENDING_INVOICE',
                        payload: data
                    })
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
        })
    }
}

export const adminApproveRequest = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/admin/invoice/approve/${id}`)
                .then(({ data }) => {
                    console.log(data, 'admin approve request');
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
        })
    }
}

export const adminRejectRequest = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/admin/invoice/reject/${id}`)
                .then(({ data }) => {
                    console.log(data, 'admin reject request');
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
        })
    }
}

export const adminAddInsuranceOccupancy = (payload) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:3000/admin/insurance/fire`, payload)
                .then(({ data }) => {
                    console.log(data, 'admin add occupancy insurance');
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
        })
    }
}

export const adminGetInsuranceOccupancyById = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/admin/insurance/fire/${id}`)
                .then(({ data }) => {
                    console.log(data, 'admin get insurance by id');
                    dispatch({
                        type: 'UPDATE_ADM_EDIT_INSURANCE_BYID',
                        payload: data
                    })
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
        })
    }
}

export const adminEditInsuranceOccupancyById = (id, payload) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:3000/admin/insurance/fire/${id}`, payload)
                .then(({ data }) => {
                    console.log(data, 'admin edit insurance by id');
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
        })
    }
}

// export function register(payload) {
//     return dispatch => {
//         fetch('http://localhost:3001/auth/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(payload)
//         })
//         .then(res => res.json())
//             .then(res => {
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
// }