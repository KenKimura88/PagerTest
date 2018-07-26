import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

class CreateRoom extends Component {
  state = {
    isPrivate: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {open, handleClose, handleCreate} = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Channel Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel Name"
            fullWidth
            inputRef={(channel) => this.channel = channel}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.isPrivate}
                onChange={this.handleChange('isPrivate')}
                value="isPrivate"
              />
            }
            label="Is Private?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleCreate(this.channel.value, this.state.isPrivate)} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default CreateRoom
