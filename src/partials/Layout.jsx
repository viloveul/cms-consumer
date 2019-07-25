import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MenuWidget from '@/widgets/Menu'
import RecentPostWidget from '@/widgets/RecentPost'
import RecentCommentWidget from '@/widgets/RecentComment'

const mapStateToProps = state => {
  return {
    widgets: state.site.widgets
  }
}

class Layout extends React.Component {

  state = {
    widgets: {
      Menu: MenuWidget,
      RecentPost: RecentPostWidget,
      RecentComment: RecentCommentWidget
    }
  }

  static defaultProps = {
    sidebar: true
  }

  loadSidebar = () => {
    if (this.props.sidebar === true) {
      let items = []
      for (let a = 0; a < this.props.widgets.length; a++) {
        let item = this.props.widgets[a]
        if (this.state.widgets[item.name] !== undefined) {
          items.push(React.createElement(this.state.widgets[item.name], {key: 'widget-' + a, results: item.results}))
        }
      }
      return items
    }
  }

  render = () => {
    let className = this.props.sidebar === true ? 'col-sm-8' : 'col-sm-12'

    return (
      <div className="container">
        <div className="row">
          <div className={className}>
            {this.props.children}
          </div>
          {this.props.sidebar === true && <div className="col-sm-4">{this.loadSidebar()}</div>}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  sidebar: PropTypes.bool
}

export default connect(mapStateToProps)(Layout)
