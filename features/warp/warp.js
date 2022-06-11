import React, { useRef, useContext } from 'react'
import { createPortal } from 'react-dom'

const h = React.createElement

const WarpContext = React.createContext()

export const WarpProvider = ({ children }) => {
  const managerRef = useRef()
  if (!managerRef.current) managerRef.current = createWarpManager()
  const manager = managerRef.current

  return h(WarpContext.Provider, { value: manager }, children, h(WarpHost, { manager }))
}

const WarpHost = ({ manager: { portals } }) => {
  return [...portals.entries()].map(([key, portal]) => portal)
}

export const Warp = ({ children }) => {
  const manager = useContext(WarpContext)

  const key = React.Children.only(children).key
  const node = manager.with(key, children)

  return h('div', { ref: (el) => el && el.append(node) })
}

const createWarpManager = () => {
  const nodes = new Map()
  const portals = new Map()

  return {
    portals,
    with(key, children) {
      if (nodes.has(key)) {
        const node = nodes.get(key)

        // const portal = createPortal(children, node)
        // portals.set(key, portal)

        return node
      }

      const node = document.createElement('div')
      nodes.set(key, node)

      const portal = createPortal(children, node)
      portals.set(key, portal)

      return node
    }
  }
}
