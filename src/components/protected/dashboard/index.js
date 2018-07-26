import React, { Component } from 'react'
import { connect } from 'react-redux'
import md5 from 'md5'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import { ChatEngine } from '../../../config/chatConstants'
import './dashboard.css'

const toChannelName = (string) => {
  return `#${string.split('#').slice(-1)[0]}`
}

class Dashboard extends Component {
  state = {
    me: undefined,
    isReady: false
  }

  componentDidMount() {
    const now = new Date().getTime()
    const username = this.props.email
    const me = ChatEngine.users[username]
    if (me === undefined) {
      ChatEngine.connect(username, {signedOnTime: now})

      ChatEngine.on('$.ready', (data) => {
        let me = data.me
        this.setState({
          me,
          isReady: true
        })
        let lobby = new ChatEngine.Chat('lobby')
        console.log(me, ChatEngine.global, ChatEngine.chats)
      })
    } else {
      this.setState({
        me,
        isReady: true
      })
      
      console.log(me, ChatEngine.global, ChatEngine.chats)
    }

    ChatEngine.on('$.created.chat', (data, chat) => {
      this.forceUpdate()
    })

  }

  render () {
    const { isReady, me } = this.state

    if (!isReady) {
      return (
        <div className="flex-grow align-center">
          <Typography variant="title" className="text-center">Loading...</Typography>
        </div>
      )
    }
    return (
      <Grid container spacing={8} className="flex-grow">
        <Grid item sm={3} className="border-right d-flex flex-column">
          <div className="topSection d-flex align-center">
            <img src={`//0.gravatar.com/avatar/${md5(me.uuid)}?s=70`} alt={me.uuid} />
            <Typography variant="title" className="text-center ml-10">{me.uuid}</Typography>
          </div>
          <div className="flex-grow p-10">
            {Object.keys(ChatEngine.chats).map((chatId, index) => {
              const chat = ChatEngine.chats[chatId]
              if (chat.group === 'custom') {
                return (
                  <div className="p-10 c-pointer channel" key={index}>
                    <Typography variant="title" color="inherit">{toChannelName(chat.channel)}</Typography>
                  </div>
                )
              }
            })}
          </div>
          <div className="bottomSection d-flex align-center">
            <Button color="primary" fullWidth className="ml-10 mr-10">
              + Create a room
            </Button>
          </div>
        </Grid>
        <Grid item sm={9} className="d-flex flex-column">
          <div className="topSection d-flex align-center">
          </div>
          <div className="flex-grow">
          </div>
          <div className="bottomSection d-flex align-center">
            <TextField
              fullWidth
              id="message"
              placeholder="Type a Message..."
            />
            <Button variant="contained" color="primary" className="ml-10">
              Send
              <Icon>send</Icon>
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default connect(
  state => ({
    email: state.auth.get('email'),
  })
)(Dashboard)
