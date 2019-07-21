import React from 'react'
import PropTypes from 'prop-types'

class Navigation extends React.Component {

  state = {
    opened: -1
  }

  static defaultProps = {
    lvl: 0,
    items: [],
    closeAll: false,
    openMenuHandler: null,
    closeMenuHandler: null,
    collapseMenuHandler: null
  }

  handleClickMenu = (e) => {
    e.preventDefault()
    this.handleCollapse()
    if (e.target.href !== null && e.target.href.search(/^https?:\/\//) !== -1) {
      window.location.href = e.target.href
    } else {
      this.context.router.history.push(e.target.href)
    }
  }

  handleTriggerMenu = (index) => {
    return (e) => {
      let opened = -1
      if (this.state.opened !== index) {
        opened = index
      }
      this.setState({opened})

      if (opened === -1) {
        this.props.closeMenuHandler()
      } else {
        this.props.openMenuHandler()
      }
    }
  }

  handleCollapse = () => {
    this.props.closeMenuHandler()
    this.setState({
      opened: -1
    })
    if (this.props.collapseMenuHandler !== null) {
      this.props.collapseMenuHandler()
    }
  }

  makeItems = (items) => {
    let lists = []
    for (let a = 0; a < items.length; a++) {
      let item = []
      let key = `menu-item-lvl` + this.props.lvl + `-` + a
      if (items[a].children !== undefined && items[a].children.length !== 0) {
        item.push(
          <span className="carret" onClick={this.handleTriggerMenu(a)} key={`li-span-` + key}>
            { this.state.opened === a && this.props.closeAll === false ? `-` : `+` }
          </span>
        )
      }

      item.push(
        <a href={items[a].url} onClick={this.handleClickMenu} key={`li-a-` + key}>
          {items[a].label}
        </a>
      )

      if (items[a].children !== undefined && items[a].children.length !== 0 && this.state.opened === a) {
        item.push(
          <Navigation
            key={key}
            openMenuHandler={this.props.openMenuHandler}
            closeMenuHandler={this.props.closeMenuHandler}
            className={`child-menu` + (this.state.opened === a && this.props.closeAll === false ? ` open` : ``)}
            collapseMenuHandler={this.handleCollapse}
            items={items[a].children}
            lvl={this.props.lvl + 1}
            closeAll={this.state.opened !== a}>
          </Navigation>
        )
      }
      lists.push(
        <li className={`menu-item-lvl-` + this.props.lvl + `-` + a} key={`li-` + key}>
        {item}
        </li>
      )
    }
    return lists
  }

  render = () => {
    return (
      <ul className={this.props.className}>
        {this.makeItems(this.props.items)}
      </ul>
    )
  }
}

Navigation.propTypes = {
  lvl: PropTypes.number,
  items: PropTypes.array,
  closeAll: PropTypes.bool,
  openMenuHandler: PropTypes.func.isRequired,
  closeMenuHandler: PropTypes.func.isRequired,
  collapseMenuHandler: PropTypes.func
}

export default Navigation
