import React from 'react'
import PropTypes from 'prop-types'
import Navigation from '@/components/Navigation'

class Menu extends React.Component {

  static defaultProps = {
    results: []
  }

  render = () => {
    return (
      <div className="widget widget-menu">
        <div className="widget-title">Menu</div>
        <div className="widget-body">
          <Navigation items={this.props.results} className="dor"></Navigation>
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
  results: PropTypes.array
}

export default Menu
