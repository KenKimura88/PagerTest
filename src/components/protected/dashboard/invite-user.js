import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

class CreateRoom extends Component {
  state = {
    user: '',
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const {open, handleClose, handleInvite, users, curUsers} = this.props
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Invite User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select User to Invite
          </DialogContentText>

          <FormControl fullWidth>
            <InputLabel htmlFor="users">Users</InputLabel>
            <Select
              value={this.state.user}
              onChange={this.handleChange}
              inputProps={{
                name: 'user',
                id: 'user',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.keys(users).filter(x => !Object.keys(curUsers).includes(x)).map((id, index) => (
                <MenuItem value={users[id]} key={index}>{id}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleInvite(this.state.user)} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default CreateRoom
