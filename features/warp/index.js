import React from 'react'

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

export const routes = {
  '/videos': Index,
  '/videos/1': Detail,
}

const Video = () => h('video', {
  controls: true,
  width: '620',
  src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
})
