import Immutable from 'immutable'

const initialState = Immutable.Map({
  messages: {}
})


const actionsMap = {
  add_message(state, action) {
    let messages = state.get('messages')
    if (messages[action.data.channel] === undefined) {
      messages[action.data.channel] = {
        historyLoaded: false,
        messages: [action.data.message]
      }
    } else {
      messages[action.data.channel].messages.push(action.data.message)
    }
    messages = Object.assign({}, messages)
    return state.set('messages', messages)
  },
  add_history(state, action) {
    let messages = state.get('messages')
    if (messages[action.data.channel] === undefined) {
      messages[action.data.channel] = {
        historyLoaded: true,
        messages: [action.data.message]
      }
    } else {
      messages[action.data.channel].historyLoaded = true
      messages[action.data.channel].messages.unshift(action.data.message)
    }
    messages = Object.assign({}, messages)
    return state.set('messages', messages)
  },
  reset(state, action) {
    return initialState;
  }
}

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
