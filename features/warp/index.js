import React from 'react'
import { Warp, WarpProvider } from './warp.js'

const h = React.createElement

const Index = () => h('div', {},
  h('h1', {}, 'Videos'),
  h('a', { href: '/videos/1' }, 'Video 1'),
  h('div', {}, h(Video))
)

const Detail = () => h('div', {},
  h('a', { href: '/videos' }, 'Back to videos'),
  h('h1', {}, 'Video 1'),
  h(Video)
)

Index.getLayout = (route) => h(WarpProvider, {}, route)
Detail.getLayout = (route) => h(WarpProvider, {}, route)

export const routes = {
  '/videos': Index,
  '/videos/1': Detail,
}

const Video = () => h(Warp, {},
  h('video', {
    key: 'video-1',
    controls: true,
    width: '620',
    src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
  })
)
