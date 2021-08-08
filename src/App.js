import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Register} />

        <PrivateRoute>
          <Route exact path="/" component={Main} />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

const PrivateRoute = ({children, path}) => {
  const [isLogin, setIsLogin] = useState(false);
  
  return isLogin
    ? <Route path={path}>{children}</Route>
    : <Redirect to="/signin" />
}

export default App
