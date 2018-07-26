import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import configureStore from './configureStore'
import App from './components'
import './index.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
