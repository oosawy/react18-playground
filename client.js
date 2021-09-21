import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

const h = React.createElement

const Root = () => h(BrowserRouter, {}, h(App))

requestIdleCallback(() => {
	ReactDOM.hydrate(h(Root), document.getElementById('root'))	
})

