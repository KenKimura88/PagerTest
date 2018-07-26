import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { auth } from '../actions/auth'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.auth(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <Grid container spacing={16} justify="center">
        <Grid item xs={6} sm={3}>
          <Card className="mt-10">
            <CardContent className="text-center">
              <Typography variant="title" color="inherit" className="text-center">
                Register
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
                  this.state.registerError &&
                    <Typography variant="subheading" color="error" className="text-center">
                      Error: {this.state.registerError}
                    </Typography>
                }
                <Button color="primary" type="submit" variant="raised">
                  Register
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
  dispatch => ({ dispatch, ...bindActionCreators({ auth }, dispatch) }),
)(Register)
