import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import redux
import { Provider, useSelector } from 'react-redux'
import store from './store/index'

// import pages
import Login from './pages/Login';
import Home from './pages/customer/CustomerDashboard';
import CustomerNavbar from './component/customerNavbar';
import RequestForm from './pages/customer/RequestForm';
import CustomerRequests from './pages/customer/MyRequest';
import EditProfile from './pages/customer/EditProfile'
import Checkout from './pages/customer/Checkout';

function App() {

  
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            
            {/* Customer */}

            <Route component={customerContainer} />

            {/* Admin */}
            <Route component={adminContainer} />

          </Switch>
        </Router>
      </Provider>
    </div>
  );

  function adminContainer() {
    return (
      <div>
        {/* <Route path='/admin' component={} />
        <Route path='/admin/pending' component={} />
        <Route path='/admin/add-insurance' component={} />
        <Route path='/admin/edit-insurance/:id' component={} /> */}
      </div>
    )
  }

  function customerContainer() {
    return (
      <div>
        <CustomerNavbar />
        <PrivateRoute path='/' exact>
          <Home />
        </PrivateRoute>
        <PrivateRoute path='/request'>
          <RequestForm />
        </PrivateRoute>
        <PrivateRoute path='/my-request'>
          <CustomerRequests />
        </PrivateRoute>
        <PrivateRoute path='/bio'>
          <EditProfile />
        </PrivateRoute>
        <PrivateRoute path='/checkout/:id'>
          <Checkout />
        </PrivateRoute>
        {/* <PrivateRoute path='/request-form' exact>
          
        </PrivateRoute>
        <PrivateRoute path='/checkout/:id' exact>
          
        </PrivateRoute>
        <PrivateRoute path='/my-request' exact>
          
        </PrivateRoute>
        <PrivateRoute path='/bio' exact>
          
        </PrivateRoute> */}
    </div>
    )
  }
}

function PrivateRoute({ children, ...rest }) {
  useSelector((state) => state.isLogin)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('access_token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
