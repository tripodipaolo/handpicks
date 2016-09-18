import RWR from 'react-webpack-rails'
RWR.run()

import StoryEditor from './components/story/editor'
import StoryLinksList from './components/story/links-list'
import BrowserLinksList from './components/story/browser-links-list'
RWR.registerComponent('StoryEditor', StoryEditor)
RWR.registerComponent('StoryLinksList', StoryLinksList)
RWR.registerComponent('BrowserLinksList', BrowserLinksList)
