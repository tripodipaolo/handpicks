import React from 'react'
import $ from 'jquery'
import { map, find, findIndex, propEq } from 'ramda'
import Browser from './browser'

export default class BrowserLinksList extends React.Component {
  constructor (props) {
    super(props)

    this.buildBrowser = this.buildBrowser.bind(this)
    this.buildLinks = this.buildLinks.bind(this)
    this.openLink = this.openLink.bind(this)
    this.openBrowser = this.openBrowser.bind(this)
    this.closeBrowser = this.closeBrowser.bind(this)

    this.state = {
      currentLinkId: this.props.links[0].id,
      open: false
    }
  }

  componentDidMount () {
    $('.story-body a').on('click', (e) => {
      e.preventDefault()
      const url = $(e.target).attr('href')
      const link = find(propEq('url', url), this.props.links)
      this.openLink(link.id)
    })
  }

  findLink (id) {
    return find(propEq('id', id), this.props.links)
  }

  openBrowser () {
    this.setState({open: true})
  }

  closeBrowser () {
    this.setState({open: false})
  }

  buildBrowser () {
    if (this.state.open) {
      return <Browser links={this.props.links}
                      currentLinkId={this.state.currentLinkId}
                      onClose={this.closeBrowser} />
    }

    return null
  }

  openLink (currentLinkId) {
    this.setState({currentLinkId}, this.openBrowser)
  }

  buildLinks () {
    let openLink
    return map((link) => {
      openLink = () => this.openLink(link.id)
      return (
        <div key={`link-${link.id}`} className="story-link">
          <div className="columns is-gapless">
            <div className="column is-two-thirds">
              <div className="story-link-content">
                <h4 className="clickable" onClick={openLink}>{link.title}</h4>
                {link.host}
              </div>
            </div>
            <div className="column is-one-third story-link-thumbnail">
              <figure className="clickable image" onClick={openLink}>
                <img src={link.thumbnail_url} />
              </figure>
            </div>
          </div>
        </div>
      )
    }, this.props.links)
  }

  render () {
    const browser = this.buildBrowser()
    const links = this.buildLinks()

    return (
      <div>
        {browser}
        {links}
      </div>
    )
  }
}