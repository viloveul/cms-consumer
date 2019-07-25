import React from 'react'
import PropTypes from 'prop-types'
import initial from '@/services/content.initial'

class CommentContent extends React.Component {

  static defaultProps = {
    detail: {
      ...initial.comment
    }
  }

  render = () => {
    return (
      <div className="comment">
        <div className="comment-wrapper">
          <div className="comment-header">
            <h4>{ this.props.detail.name }</h4>
            <small>{ this.props.detail.created_at }</small>
          </div>
          <div className="comment-body">
            { this.props.detail.content }
          </div>
        </div>
      </div>
    )
  }
}

CommentContent.propTypes = {
  detail: PropTypes.object
}

export default CommentContent
