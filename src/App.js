import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { StoreContext } from './store'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import Community from './pages/Community'
import socket from './utils/socket'
import Header from './components/Header'
import Bottombar from './components/Bottombar'

const App = () => {
  const { dispatchActiveChat } = useContext(StoreContext);

  useEffect(() => {

    socket.on('private-message-incoming', ({from, message}) => {
        dispatchActiveChat({type: 'RECEIVE_CHAT', payload: {from, message}});
    });

}, [])

  
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Register} />

        <PrivateRoute>
          <div className="main">
            <Header />
              <Route exact path="/" component={Main} />
              <Route exact path="/community" component={Community} />
              <Route exact path="/profile" component={Profile} />
            <Bottombar />
          </div>
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

const PrivateRoute = ({children, path}) => {
  const { stateUser } = useContext(StoreContext);

  return stateUser.access_token
    ? <Route path={path}>{children}</Route>
    : <Redirect to="/signin" />
}

export default App
