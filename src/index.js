import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { PubSubClient } from './lib/PubSubClient'
import { Identity } from './lib/Identity'

import { CanvasProvider } from './components'

ReactDOM.render(
  <React.StrictMode>
    <CanvasProvider>
      <App />
    </CanvasProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

const identity = new Identity('User' + Math.random())
const client = new PubSubClient(() => console.log('handler'))
client.connect(identity.friendlyName, identity.clientId)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
