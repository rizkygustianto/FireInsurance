const initialState = {
    isLogin: false,
    user: '',
    role: '',
    occupancyType: [],
    checkoutTrxId: '',
    checkoutDetails: {},
    customerInvoices: [],
    adminPendingInvoice: [],
    adminEditInsuranceById: {},
    userProfile: {}
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('access_token', action.payload.access_token)
            localStorage.setItem('username', action.payload.username)
            let newState = {
                ...state,
                isLogin: true,
                user: action.payload.name,
                role: action.payload.role
            }
            return newState

        case 'LOGOUT':
            localStorage.removeItem('access_token')
            return {
                ...state,
                isLogin: false,
                user: '',
                role: ''
            }

        case 'UPDATE_OCCUPANCY_TYPE':
            return {
                ...state,
                occupancyType: action.payload
            }

        case 'UPDATE_CHECKOUT_TRX_ID':
            return {
                ...state,
                checkoutTrxId: action.payload
            }

        case 'UPDATE_CHECKOUT_DETAILS':
            return {
                ...state,
                checkoutDetails: action.payload
            }

        case 'UPDATE_CUST_INVOICES':
            return {
                ...state,
                customerInvoices: action.payload
            }

        case 'UPDATE_ADM_PENDING_INVOICE':
            return {
                ...state,
                adminPendingInvoice: action.payload
            }

        case 'UPDATE_ADM_EDIT_INSURANCE_BYID':
            return {
                ...state,
                adminEditInsuranceById: action.payload
            }

        case 'UPDATE_USER_DATA':
            return {
                ...state,
                userProfile: action.payload
            }
        
        default:
            return state
    }
}

export default reducer