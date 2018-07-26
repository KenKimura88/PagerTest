import React, { Component, Fragment } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/dashboard'

import { logout } from '../actions/auth'

function PrivateRoute ({component: Component, authed, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

class App extends Component {

  render() {
    const { authed, logout } = this.props
    return (
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          <div className="main">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="title" color="inherit" className="flex-grow">
                  Pager Chat Test App
                </Typography>
                <Button component={Link} to="/" color="inherit">
                  Home
                </Button>
                <Button component={Link} to="/dashboard" color="inherit">
                  Dashboard
                </Button>
                {authed ?
                  <Button to="/dashboard" color="inherit" onClick={logout}>
                    Logout
                  </Button>
                  : <Fragment>
                      <Button component={Link} to="/login" color="inherit">
                        Login
                      </Button>
                      <Button component={Link} to="/register" color="inherit">
                        Register
                      </Button>
                    </Fragment>
                }
              </Toolbar>
            </AppBar>
            <Grid container spacing={8} className="flex-grow">
              <Grid item xs={12} className="d-flex">
                <Switch>
                  <Route path='/' exact component={Home} />
                  <PublicRoute authed={authed} path='/login' component={Login} />
                  <PublicRoute authed={authed} path='/register' component={Register} />
                  <PrivateRoute authed={authed} path='/dashboard' component={Dashboard} />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </Grid>
            </Grid>
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default connect(
  state => ({
    authed: state.auth.get('authed'),
  }),
  dispatch => ({ dispatch, ...bindActionCreators({ logout }, dispatch) }),
)(App)
