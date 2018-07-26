
export function addMessage (channel, message) {
  return (dispatch) => {
    dispatch({
      type: 'add_message',
      data: {
        channel,
        message
      }
    })
  }
}

export function addHistory (channel, message) {
  return (dispatch) => {
    dispatch({
      type: 'add_history',
      data: {
        channel,
        message
      }
    })
  }
}

export function reset () {
  return (dispatch) => {
    dispatch({
      type: 'reset',
    })
  }
}