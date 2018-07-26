import Immutable from 'immutable'

const initialState = Immutable.Map({

})


const actionsMap = {
}

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
