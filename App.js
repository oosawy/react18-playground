import React, {Fragment, Suspense, useState} from 'react'
import { Switch } from './router.js'
import { routes as warpRoutes } from './features/warp/index.js'

const h = React.createElement

const createResource = () => {
	console.log('LOADING')
	let resolve
	const timeout = new Promise(r => resolve = r)
	timeout.then(() => resource.resolved = true)
	const resource = {
		loading: false,
		resolved: false,
		read() {
			if (this.resolved) return 'hello world'
			if (!this.loading) setTimeout(resolve, 1000)
			throw timeout
		}
	}

	return resource
}

const initialResource = createResource()

const Index = () => {
	const [resource] = useState(initialResource)

	return (
		h(Fragment, {},
			h('a', { href: '/about' }, 'About'),
			h(Suspense, { fallback: h('p', {}, 'loading...') },
				h(Content, { resource })
			),
		)
	)
}

const Content = ({ resource }) => h('p', {}, resource.read())

const aboutResource = createResource()

const About = () => {
	const [resource] = useState(aboutResource)

	return (
		h('div', {},
			h('p', {}, resource.read()),
			h('a', { href: '/' }, 'Back to top')
		)
	)
}

const routes = {
	'/': Index,
	'/about': About,

	...warpRoutes,
}

export const App = () => h(Suspense, { fallback: 'loading...' }, h(Switch, { routes }))
