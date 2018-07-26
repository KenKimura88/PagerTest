import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ChatEngineCore from 'chat-engine'
import md5 from 'md5'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import { config } from '../../../config/chatConstants'
import { addMessage, addHistory, reset } from '../../../actions/chat'
import CreateRoom from './create-room'
import InviteUser from './invite-user'
import Message from './message'
import './dashboard.css'

const toChannelName = (string) => {
  return `#${string.split('#').slice(-1)[0]}`
}

class Dashboard extends Component {
  state = {
    me: undefined,
    isReady: false,
    open: false,
    inviteOpen: false,
    curChat: undefined,
    ChatEngine: undefined
  }

  componentDidMount() {

    const ChatEngine = ChatEngineCore.create(config)
    this.setState({ ChatEngine })

    const now = new Date().getTime()
    const username = this.props.email

    ChatEngine.connect(username, {signedOnTime: now}, 'auth-key')

    ChatEngine.on('$.created.me', (data, me) => {
      this.setState({
        me,
        isReady: true
      })

      me.direct.on('$.invite', (payload) => {
        new ChatEngine.Chat(payload.data.channel)
      })

      ChatEngine.pubnub.whereNow({
        uuid: username
      }, this.listPrevChannels)
    })

    ChatEngine.on('$.created.chat', (data, chat) => {
      this.forceUpdate()
    })

    ChatEngine.on('$.created.user', (data, chat) => {
      this.forceUpdate()
    })

  }

  componentWillUnmount() {
    this.props.reset()
    this.state.ChatEngine.disconnect()
  }

  listPrevChannels = (status, response) => {
    const { ChatEngine } = this.state
    if (status.statusCode === 200) {
      response.channels.forEach(channel => {
        if (channel.indexOf('chat-engine#chat#private.#') !== -1) {
          const name = channel.replace('chat-engine#chat#private.#', '')
          new ChatEngine.Chat(name, true)
        }
        if (channel.indexOf('chat-engine#chat#public.#') !== -1) {
          const name = channel.replace('chat-engine#chat#public.#', '')
          new ChatEngine.Chat(name)
        }
      })
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleCreate = (value, isPrivate) => {
    new this.state.ChatEngine.Chat(value, isPrivate)
    this.setState({ open: false })
  }

  handleInvite = (user) => {
    this.setState({ inviteOpen: true })
  }

  handleInviteClose = () => {
    this.setState({ inviteOpen: false })
  }

  handleInviteUser = (user) => {
    if (this.state.curChat && user) {
      this.state.curChat.invite(user)
    }
    this.setState({ inviteOpen: false })
  }

  switchChat = (curChat) => {
    if (curChat !== this.state.curChat) {
      if (this.state.curChat) {
        curChat.off('message', this.onMsg)
      }
      this.setState({ curChat })
      if (this.props.messages[curChat.channel] === undefined || !this.props.messages[curChat.channel].historyLoaded) {
        if (curChat.connected) {
          this.doSearch(curChat)
        } else {
          curChat.on('$.connected', () => {
            this.doSearch(curChat)
          })
        }
      }
      curChat.on('message', this.onMsg)
    }
  }

  doSearch = (curChat) => {
    curChat.search({
      reverse: true,
      event: 'message',
      limit: 50
    }).on('message', (data) => {
      this.props.addHistory(curChat.channel, data)
    })
  }

  onMsg = (payload) => {
    this.props.addMessage(this.state.curChat.channel, payload)
  }

  onSend = () => {
    const message = this.message.value
    const { curChat } = this.state
    if (curChat) {
      curChat.emit('message', {
          text: message
      })
    }
    this.message.value = ''
  }

  render () {
    const { isReady, me, inviteOpen, open, curChat, ChatEngine } = this.state

    if (!isReady) {
      return (
        <div className="flex-grow align-center">
          <Typography variant="title" className="text-center">Loading...</Typography>
        </div>
      )
    }
    return (
      <Grid container className="flex-grow">
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
                  <div className={`p-10 c-pointer channel ${chat === curChat ? 'active' : ''}`} key={index} onClick={() => this.switchChat(chat)}>
                    <Typography variant="title" color="inherit">{toChannelName(chat.channel)}</Typography>
                  </div>
                )
              }
            })}
          </div>
          <div className="bottomSection d-flex align-center">
            <Button color="primary" fullWidth className="ml-10 mr-10" onClick={this.handleClickOpen}>
              + Create a room
            </Button>
          </div>
          {open &&
            <CreateRoom open={open} handleClose={this.handleClose} handleCreate={this.handleCreate}/>
          }
        </Grid>
        <Grid item sm={9} className="d-flex flex-column">
          <div className="topSection d-flex align-center">
            {curChat &&
              <Fragment>
                <Typography variant="title" className="text-center flex-grow">{toChannelName(curChat.channel)}</Typography>
                <Button color="primary" variant="raised" className="ml-10 mr-10" onClick={this.handleInvite}>
                  Invite User
                </Button>
                <Typography variant="subheading" className="ml-10">Users: {Object.keys(curChat.users).length}</Typography>
                {inviteOpen &&
                  <InviteUser
                    open={inviteOpen}
                    handleClose={this.handleInviteClose}
                    handleInvite={this.handleInviteUser}
                    users={ChatEngine.global.users}
                    curUsers={curChat.users}
                  />
                }
              </Fragment>
            }
          </div>
          <div className="flex-grow p-10 scroll">
            {curChat && this.props.messages[curChat.channel] &&
              this.props.messages[curChat.channel].messages.map((message, index) => (
                <Message message={message} key={index} />
              ))
            }
          </div>
          <div className="bottomSection d-flex align-center">
            <TextField
              fullWidth
              id="message"
              placeholder="Type a Message..."
              className="ml-10"
              disabled={curChat === undefined}
              inputRef={(message) => this.message = message}
            />
            <Button variant="contained" color="primary" className="ml-10" disabled={curChat === undefined} onClick={this.onSend}>
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
    messages: state.chat.get('messages')
  }),
  dispatch => ({ dispatch, ...bindActionCreators({ addMessage, addHistory, reset }, dispatch) }),
)(Dashboard)
