import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import contentHelper from '@/services/content.helper'

class RecentComment extends React.Component {

  static defaultProps = {
    results: []
  }

  parseListItems = (items) => {
    let lists = []
    for (let a = 0; a < items.length; a++) {
      lists.push(<li key={`widget-recent-comment-` + a.toString()}>{items[a].name} on <Link to={contentHelper.getPermalink(items[a].post)}>{items[a].post.title}</Link></li>)
    }
    return lists
  }

  render = () => {
    return (
      <div className="widget widget-recent-comment">
        <div className="widget-title">Recent Comments</div>
        <div className="widget-body">
          <ul>{this.parseListItems(this.props.results)}</ul>
        </div>
      </div>
    )
  }
}

RecentComment.propTypes = {
  results: PropTypes.array
}

export default RecentComment
