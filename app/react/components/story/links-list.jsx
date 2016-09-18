import React from 'react'
import StoryLink from './link'
import R from 'ramda'
export default class StoryLinksList extends React.Component {
  render () {
    const { links } = this.props

    let list = null
    if (links.length) {
      list = R.map((link) => {
        return <StoryLink key={link.href} url={link.href} />
      }, links)
    } else {
      list = (
        <section className="hero story-links-list story-links-list--empty">
          <div className="hero-body">
            <div className="container">
              <h2 className="has-text-centered">Links will show up here</h2>
            </div>
          </div>
        </section>
      )
    }
    return (
      <div>{list}</div>
    )
  }
}