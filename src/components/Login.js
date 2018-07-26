import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { login, resetPassword } from '../actions/auth'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class Login extends Component {
  state = { loginMessage: null }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <Grid container spacing={16} justify="center">
        <Grid item xs={6} sm={3}>
          <Card className="mt-10">
            <CardContent className="text-center">
              <Typography variant="title" color="inherit" className="text-center">
                Login
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <TextField
                    id="email-input"
                    label="Email"
                    type="email"
                    margin="normal"
                    inputRef={(email) => this.email = email}
                  />
                </div>
                
                <div>
                  <TextField
                    id="password-input"
                    label="Password"
                    type="password"
                    margin="normal"
                    inputRef={(pw) => this.pw = pw}
                  />
                </div>
                {
                  this.state.loginMessage &&
                  <div>
                    <Typography variant="subheading" color="error" className="text-center">
                      Error: {this.state.loginMessage}
                    </Typography>
                    <Button color="primary" onClick={this.resetPassword}>
                      Forgot Password?
                    </Button>
                  </div>
                }

                <Button color="primary" type="submit" variant="raised">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default connect(
  state => ({
    
  }),
  dispatch => ({ dispatch, ...bindActionCreators({ login, resetPassword }, dispatch) }),
)(Login)
