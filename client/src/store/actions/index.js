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
        fetch('http://localhost:3000/admin/invoice', {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data, 'get admin pending invoices');
                dispatch({
                    type: 'UPDATE_ADM_PENDING_INVOICE',
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const adminApproveRequest = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/admin/invoice/approve/${id}`, {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data, 'admin approve invoice');
                
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const adminRejectRequest = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/admin/invoice/reject/${id}`, {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data, 'admin reject invoice');
                
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const adminAddInsuranceOccupancy = (payload,cb) => {
    return dispatch => {
        fetch(`http://localhost:3000/admin/insurance/fire`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.getItem('access_token')
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'added insurance occupation');
                cb(null)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const adminGetInsuranceOccupancyById = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/admin/insurance/fire/${id}`, {
            method: 'GET',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data, 'get insurance by id');
                dispatch({
                    type: 'UPDATE_ADM_EDIT_INSURANCE_BYID',
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const adminEditInsuranceOccupancyById = (id, payload, cb) => {
    return dispatch => {
        fetch(`http://localhost:3000/admin/insurance/fire/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.getItem('access_token')
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'edited insurance occupation');
                cb(null)
            })
            .catch(err => {
                console.log(err)
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