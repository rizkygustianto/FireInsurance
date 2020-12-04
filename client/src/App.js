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
import AdminNavbar from './component/adminNavbar';
import AdminDashboard from './pages/admin/AdminDashboard'
import PendingRequests from './pages/admin/PendingRequests';
import AddFireInsurance from './pages/admin/AddFireInsurance';
import EditFireInsurance from './pages/admin/EditFireInsurance';

function App() {

  
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            
            {localStorage.getItem('role') === 'admin' ? 
              <Route component={adminContainer} />
              :
              <Route component={customerContainer} />
            }

          </Switch>
        </Router>
      </Provider>
    </div>
  );

  function adminContainer() {
    return (
      <div>
        <AdminNavbar />
        <AdminRoute path='/admin' exact>
          <AdminDashboard />
        </AdminRoute>
        <AdminRoute path='/admin/pending'>
          <PendingRequests />
        </AdminRoute>
        <AdminRoute path='/admin/add'>
          <AddFireInsurance />
        </AdminRoute>
        <AdminRoute path='/admin/insurance/fire/:id'>
          <EditFireInsurance />
        </AdminRoute>
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

function AdminRoute({ children, ...rest }) {
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
