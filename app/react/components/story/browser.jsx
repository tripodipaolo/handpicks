import React from 'react'
import { map, find, findIndex, propEq } from 'ramda'

export default class Browser extends React.Component {
  constructor (props) {
    super(props)

    this.buildContent = this.buildContent.bind(this)
    this.openPrevLink = this.openPrevLink.bind(this)
    this.openNextLink = this.openNextLink.bind(this)
    this.currentLink = this.currentLink.bind(this)

    this.state = {
      currentLinkId: this.props.currentLinkId
    }
  }

  findLink (id) {
    return find(propEq('id', id), this.props.links)
  }

  openBrowser (callback = () => {}) {
    this.setState({open: true}, callback)
  }

  buildContent () {
    const link = this.findLink(this.state.currentLinkId)
    if (link.embeddable) {
      return <iframe frameBorder="0" src={link.url} frameborder="0" />
    } else {
      return (
        <section className="hero is-fullheight has-text-centered">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                This site is not viewable inside HandPicks :(
              </h1>
              <h2 className="subtitle">
                <a href={link.url} target="_blank">Open in a new tab</a>
              </h2>
            </div>
          </div>
        </section>
      )
    }
  }

  openLink (currentLinkId) {
    this.openBrowser(() => this.setState({currentLinkId}))
  }

  currentLink () {
    return find(propEq('id', this.state.currentLinkId), this.props.links)
  }

  currentLinkIndex () {
    return findIndex(propEq('id', this.state.currentLinkId), this.props.links)
  }

  openPrevLink () {
    const prevLinkIndex = this.currentLinkIndex() - 1
    this.openBrowser(() => this.setState({currentLinkId: this.props.links[prevLinkIndex].id}))
  }

  openNextLink () {
    const nextLinkIndex = this.currentLinkIndex() + 1
    this.openBrowser(() => this.setState({currentLinkId: this.props.links[nextLinkIndex].id}))
  }

  render () {
    const content = this.buildContent()
    const link = this.currentLink()

    return (
      <div className="links-browser">
        <div className="columns links-browser-header">
          <div className="column is-4">
            <span className="link-browser-title">{link.title}</span>
            <span className="link-browser-host">{link.host}</span>
          </div>
          <div className="column is-4 has-text-centered">
            <span className="link-browser-link" onClick={this.openPrevLink}>&lt;</span>
            <span>{this.currentLinkIndex() + 1} / {this.props.links.length}</span>
            <span className="link-browser-link" onClick={this.openNextLink}>&gt;</span>
          </div>
          <div className="column is-4 has-text-right">
            <span className="link-browser-link" onClick={this.props.onClose}>✕</span>
          </div>
        </div>
        {content}
      </div>
    )
  }
}