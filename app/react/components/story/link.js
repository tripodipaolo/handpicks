import React, { PropTypes } from 'react'
import $ from 'jquery'
import R from 'ramda'
import API from '../../api'

const api = API.create()

export default class StoryLink extends React.Component {
  constructor (props) {
    super(props)

    this.scrape = this.scrape.bind(this)

    this.state = {
      title: '',
      favicon: '',
      thumbnail: {
        src: ''
      },
      host: ''
    }
  }

  scrape () {
    const { url } = this.props

    api.scrapeLink(url).then((response) => {
      const { title, favicon, thumbnail, host } = response.data
      this.setState({title, favicon, thumbnail, host})
    })
  }

  componentDidMount () {
    this.scrape()
  }

  render () {
    const { url } = this.props
    const { title, favicon, thumbnail, host } = this.state

    return (
      <div className="story-link">
        <div className="columns is-gapless">
          <div className="column is-two-thirds">
            <div className="story-link-content">
              <h4>{title}</h4>
              <div className="media">
                <figure className="media-left is-24x24 image">
                  <img src={favicon} />
                </figure>
                <div className="media-content">
                  <a href={url}>{host}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-one-third story-link-thumbnail">
            <figure className="image">
              <img src={thumbnail.src} />
            </figure>
          </div>
        </div>
      </div>
    )
  }
}