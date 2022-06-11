import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.js'

const h = React.createElement

const Root = () => h(App)

requestIdleCallback(() => {
	ReactDOM.createRoot(document.getElementById('root')).render(h(Root))
})

