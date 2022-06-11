import React, { useRef, useContext, useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

const h = React.createElement

const WarpContext = React.createContext()

export const WarpProvider = ({ children }) => {
  const [portals, setPortals] = useState({})

  const manager = {
    add(key, children) {
      const node = portals[key]?.node ?? document.createElement('div')
      setPortals(prev => ({ ...prev, [key]: { node, children } }))
      return node
    }
  }

  return h(WarpContext.Provider, { value: manager }, children, h(WarpHost, { portals }))
}

const WarpHost = ({ portals }) => {
  return Object.values(portals).map(({ node, children }) => createPortal(children, node))
}

export const Warp = ({ children }) => {
  const manager = useContext(WarpContext)

  const ref = useRef()

  useLayoutEffect(() => {
    const key = React.Children.only(children).key
    const node = manager.add(key, children)
    ref.current?.append(node)
  }, [children])

  return h('div', { ref })
}
