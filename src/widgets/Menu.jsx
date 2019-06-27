import React from 'react'
import PropTypes from 'prop-types'
import MenuComponent from '@/components/Menu'

class Menu extends React.Component {

  static defaultProps = {
    results: []
  }

  render = () => {
    return (
      <div className="widget widget-menu">
        <div className="widget-title">Menu</div>
        <div className="widget-body">
          <MenuComponent items={this.props.results} className="dor">
          </MenuComponent>
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
  results: PropTypes.array
}

export default Menu
