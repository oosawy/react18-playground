import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.js'
import { BrowserRouter } from './router.js'

const h = React.createElement

const Root = () => h(BrowserRouter, {}, h(App))

requestIdleCallback(() => {
	ReactDOM.createRoot(document.getElementById('root')).render(h(Root))
})

