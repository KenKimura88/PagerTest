import Immutable from 'immutable'

const initialState = Immutable.Map({
  email: '',
  authed: false
})


const actionsMap = {
  logout(state, action) {
    return state.merge({
      authed: false,
      email: ''
    })
  },
  login(state, action) {
    return state.merge({
      authed: true,
      email: action.data.user.email
    })
  },
  reset_password(state, action) {
    return state
  }
}

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
