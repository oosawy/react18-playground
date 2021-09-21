import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App.mjs'

const h = React.createElement

requestIdleCallback(() => {
	ReactDOM.hydrate(h(App), document.getElementById('root'))	
})

