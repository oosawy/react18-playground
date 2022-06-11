import http from 'http'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { App } from './App.js'
import { StaticRouter } from './router.js'

const h = React.createElement

const Document = ({ children }) => (
	h('html', {},
		h('head', {},
			h('meta', { charSet: 'utf-8' }),
			h('meta', { name: 'viewport', content: 'width=device-width' })
		),
		h('body', {},
			h('div', { id: 'root' }, children),
			h('script', { type: 'importmap', dangerouslySetInnerHTML: {
				__html: JSON.stringify({ imports: {
					'react': 'https://esm.sh/react@18.1.0?dev',
					'react-dom/client': 'https://esm.sh/react-dom@18.1.0/client?dev'
				} })
			} }),
			h('script', { type: 'module', src: '/client.js' })
		)
	)
)

const renderApp = ({ location }) => h(Document, {}, h(StaticRouter, { location } , h(App)))

const server = http.createServer((req, res) => {
	console.log()
	console.log(req.method, req.url, req.headers['user-agent'])

	const url = new URL(req.url, `http://${req.headers.host}`)

	if (url.pathname.endsWith('.js')) {
		res.setHeader('Content-Type', 'text/javascript')
		fs.createReadStream(`./${url.pathname.slice(1)}`).pipe(res)
		return
	}

	const app = renderApp({ location: url.pathname })

	res.setHeader('Content-Type', 'text/html')

	const emulateBot = url.search === '?bot'
	const isBot = ['bot', 'Bot'].some(e => req.headers['user-agent'].includes(e))
	if (!isBot && !emulateBot) return res.end('<!DOCTYPE html>' + ReactDOM.renderToString(app))

	const { startWriting } = ReactDOM.pipeToNodeWritable(app, res, {
		onReadyToStream() {
			res.write('<!DOCTYPE html>')
			startWriting()
		}
	})
})

server.listen(4000)
