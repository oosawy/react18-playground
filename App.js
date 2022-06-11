import React, {Fragment, Suspense, useState} from 'react'

const h = React.createElement

const Content = ({ resource }) => (
	h(Fragment, {},
		h('div', {}, resource.read()),
		h('div', {},
			h('title', {}, resource.read()),
			h('meta', { name: 'twitter:card', content: 'summary' }),
			h('meta', { name: 'twitter:site', content: '@nytimesbits' }),
			h('meta', { name: 'twitter:creator', content: '@nickbilton' }),
			h('meta', { property: 'og:url', content: 'http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/' }),
			h('meta', { property: 'og:title', content: 'A Twitter for My Sister' }),
			h('meta', { property: 'og:description', content: 'In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling.' }),
			h('meta', { property: 'og:image', content: 'http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg' }),
		)
	)
)

const Index = () => {
	const [resource] = useState(() => createResource())

	return (
		h(Fragment, {},
			h('a', { href: '/about' }, 'About'),
			h(Suspense, { fallback: h('p', {}, 'loading...') },
				h(Content, { resource })
			),
		)
	)
}

const About = () => h('p', {}, 'This is a PoC of simple and straightforward React framework!')

export const App = () => h(Index)

const createResource = () => {
	console.log('LOADING')
	const timeout = new Promise(r => setTimeout(r, 1000))
	const resource = {
		resolved: false,
		read() {
			if (!this.resolved) throw timeout
			return 'hello world'
		}
	}
	timeout.then(() => resource.resolved = true)

	return resource
}

