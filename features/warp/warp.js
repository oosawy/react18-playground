import React, { useRef, useContext, useSyncExternalStore } from 'react'
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
  const state = useSyncExternalStore(portals.listen, portals.getState, portals.getState)

  return state.map(([key, portal]) => portal)
}

export const Warp = ({ children }) => {
  const manager = useContext(WarpContext)

  const key = React.Children.only(children).key
  const node = manager.with(key, children)

  return h('div', { ref: (el) => el && el.append(node) })
}

const createWarpManager = () => {
  const nodes = new Map()
  const portals = new SyncMap()

  return {
    portals,
    with(key, children) {
      if (nodes.has(key)) return nodes.get(key)

      const node = document.createElement('div')
      nodes.set(key, node)

      const portal = createPortal(children, node)
      portals.set(key, portal)

      return node
    }
  }
}

class SyncMap extends Map {
  #lisners = new Set()
  #cache

  getState = () => {
    return this.#cache || (this.#cache = [...this.entries()])
  }

  listen = () => {
    this.#lisners.add(this)

    return () => {
      this.#lisners.delete(this)
    }
  }

  #notify() {
    this.#cache = null
    this.#lisners.forEach(listener => listener())
  }

  set(key, value) {
    super.set(key, value)
    this.#notify()
    return this
  }
}
