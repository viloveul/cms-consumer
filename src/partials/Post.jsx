import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import initial from '@/services/content.initial'
import contentHelper from '@/services/content.helper'

class PostContent extends React.Component {

  static defaultProps = {
    isSingular: false,
    detail: {...initial.post}
  }

  entryMeta = () => {
    if (contentHelper.isFormatPost(this.props.detail) === true) {
      return (
        <div className="tags-links">
          {
            this.props.detail.tags.map((tag, index) => {
              // console.log(tag)
              return <Link to={contentHelper.getTagLink(tag)} key={index}>{ tag.title }</Link>
              // return tag.title
            })
          }
        </div>
      )
    }
  }

  entryFooter = () => {
    if (this.props.isSingular === false) {
      return (
        <Link to={contentHelper.getPermalink(this.props.detail)}>
          Read more...
        </Link>
      )
    }
  }

  render = () => {
    return (
      <div className="content-wrapper">
        <header className="entry-header">
          <h2 className="entry-title">{ this.props.detail.title }</h2>
          <div className="posted">
            Posted <span className="by"> by <Link to={contentHelper.getAuthorLink(this.props.detail.author)}>{ this.props.detail.author.name }</Link></span> at <span className="at">{ contentHelper.getPostFormatedDate(this.props.detail) }</span>
          </div>
          {this.entryMeta()}
        </header>

        <div className="entry-content" dangerouslySetInnerHTML={{__html: this.props.isSingular === true ? this.props.detail.content : this.props.detail.description }}></div>

        <footer className="entry-footer">{this.entryFooter()}</footer>
      </div>
    )
  }
}

PostContent.propTypes = {
  detail: PropTypes.object,
  isSingular: PropTypes.bool
}

export default PostContent
