import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import contentHelper from '@/services/content.helper'

class RecentPost extends React.Component {

  static defaultProps = {
    results: []
  }

  parseListItems = (items) => {
    let lists = []
    for (let a = 0; a < items.length; a++) {
      lists.push(<li key={`widget-recent-post-` + a.toString()}><Link to={contentHelper.getPermalink(items[a])}>{items[a].title}</Link></li>)
    }
    return lists
  }

  render = () => {
    return (
      <div className="widget widget-recent-post">
        <div className="widget-title">Recent Posts</div>
        <div className="widget-body">
          <ul>{this.parseListItems(this.props.results)}</ul>
        </div>
      </div>
    )
  }
}

RecentPost.propTypes = {
  results: PropTypes.array
}

export default RecentPost
