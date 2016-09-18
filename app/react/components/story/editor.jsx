import React from 'react'
import $ from 'jquery'
import R from 'ramda'
import Editor from 'react-medium-editor'
import StoryLinksList from './links-list'
import API from '../../api'

const api = API.create()

export default class StoryEditor extends React.Component {
  constructor (props) {
    super(props)

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.saveDraft = this.saveDraft.bind(this)
    this.updateDraft = this.updateDraft.bind(this)
    this.publishDraft = this.publishDraft.bind(this)

    this.id = props.id
    this.state = {
      title: this.props.title,
      text: this.props.text,
      links: [],
      saving: false,
      lastSaved: this.props.lastSaved
    }
  }

  componentDidMount () {
    api.setHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
    this.handleTextChange(this.state.text)
  }

  processLink (i, link) {
    return {
      href: $(link).attr('href'),
      text: $(link).text()
    }
  }

  processLinks ($links) {
    return R.map(this.processLink, $links).toArray()
  }

  updateDraft () {
    api.updateDraft(this.id, {
      title: this.state.title,
      content: this.state.text
    }).then((response) => {
      this.setState({saving: false, })
    })
  }

  saveDraft () {
    clearInterval(this.timer)

    this.timer = setTimeout(() => {
      if (typeof this.id !== 'undefined') {
        this.setState({saving: true}, this.updateDraft)
      } else {
        api.createDraft({title: this.state.title, content: this.state.text}).then((response) => {
          this.id = response.data.id
        })
      }
    }, 250)
  }

  publishDraft () {
    clearInterval(this.timer)

    this.timer = setTimeout(() => {
      api.publishDraft(this.id, {
        title: this.state.title,
        content: this.state.text
      }).then((response) => {
        console.log(response)
      })
    }, 250)
  }


  handleTitleChange (event) {
    const title = event.target.value
    this.setState({title}, this.saveDraft)
  }

  handleTextChange (text) {
    const $links = $('<div/>').html(text).find('a')
    const links = this.processLinks($links)
    this.setState({ text, links }, this.saveDraft)
  }

  render () {
    const { title, text } = this.state
    const { user } = this.props

    return (
      <div>
        <div className="container columns">
          <div className="column is-8 is-offset-2">
            <div className="level story-header">
              <div className="level-left">
                <div className="level-item">
                  <img src={user.avatar.url} alt="" className="avatar avatar--medium" />
                </div>
                <div className="level-item">
                  <h3 className="story-author">
                    {user.full_name}
                  </h3>
                </div>
                <div className="level-item">
                  <span className="story-links-count">
                    {this.state.links.length} links
                  </span>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <span>{this.state.saving ? 'Saving...' : `Last saved: ${this.state.lastSaved}`}</span>
                </div>
                <div className="level-item">
                  <span className="story-date">
                    <a className="button is-medium" onClick={this.publishDraft}>Publish</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container columns">
          <div className="column is-8 is-offset-2">
            <div className="story-body">
              <div className="content">
                <div className="control">
                  <input
                    ref={(titleInput) => this.titleInput = titleInput}
                    type="text"
                    className="input is-large"
                    onChange={this.handleTitleChange}
                    value={title}
                    placeholder="Title..." />
                </div>
                <Editor
                  tag="div"
                  text={text}
                  className="textarea"
                  style={{
                    padding: '1rem',
                    height: '10rem'
                  }}
                  onChange={this.handleTextChange}
                  options={{
                    toolbar: { buttons: ['anchor'] },
                    placeholder: {
                      text: 'Write here...',
                      hideOnClick: true
                    },
                    spellcheck: false,
                    anchor: {
                      linkValidation: true
                    }
                  }} />
              </div>
            </div>
            <div className="story-links">
              <div className="content">
                <h5 className="heading">Links in this post</h5>
                <StoryLinksList links={this.state.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}