import React, { useState, useRef, useContext, useLayoutEffect, useTransition } from 'react'

const h = React.createElement

const RouterContext = React.createContext()

export const StaticRouter = ({ children, location = '/' }) => {
  return h(RouterContext.Provider, { value: { location } }, children)
}

export const BrowserRouter = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const url = new URL(window.navigation.currentEntry.url)
    return url.pathname
  })

  const [isPending, startTransition] = useTransition()
  const pendingRef = useRef()

  useLayoutEffect(() => {
    const navigate = (e) => {
      const url = new URL(e.destination.url)
      const pending = new Promise(resolve => { pendingRef.current = resolve })
      startTransition(() => setLocation(url.pathname))

      e.transitionWhile(pending)
    }

    window.navigation.addEventListener('navigate', navigate)
    return () => {
      window.navigation.removeEventListener('navigate', navigate)
    }
  }, [])

  useLayoutEffect(() => {
    if (pendingRef.current && !isPending) {
      pendingRef.current()
      pendingRef.current = null
    }
  }, [isPending])

  return h(RouterContext.Provider, { value: { location } }, children)
}

export const Switch = ({ routes }) => {
  const { location } = useContext(RouterContext)

  const Route = routes[location] ?? (() => h('p', {}, '404'))

  return h(Route)
}
