import React from 'react'
import PropTypes from 'prop-types'

class Menu extends React.Component {

  state = {
    opened: -1
  }

  static defaultProps = {
    lvl: 0,
    items: [],
    closeAll: false
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

  handleTriggerMenu = () => {
    
  }

  handleCollapse = () => {

  }

  makeItems = (items) => {
    let lists = []
    for (let a = 0; a < items.length; a++) {
      let item = []
      let key = `menu-item-lvl` + this.props.lvl + `-` + a
      if (items[a].children !== undefined && items[a].children.length !== 0) {
        item.push(<span className="carret" key={`li-span-` + key}>{ this.state.opened === a && this.props.closeAll === false ? `-` : `+` }</span>)
      }
      item.push(<a href={items[a].url} onClick={this.handleClickMenu} key={`li-a-` + key}>{items[a].label}</a>)
      if (items[a].children !== undefined && items[a].children.length !== 0 && this.state.opened === a) {
        item.push(<Menu key={key} className={`child-menu` + (this.state.opened === a && this.props.closeAll === false ? ` open` : ``)} collapse={this.handleCollapse} items={items[a].children} lvl={this.props.lvl + 1} closeAll={this.state.opened !== a}></Menu>)
      }
      lists.push(<li className={`menu-item-lvl-` + this.props.lvl + `-` + a} key={`li-` + key}>{item}</li>)
    }
    return lists
  }

  render = () => {
    return (
      <ul className={this.props.className}>{this.makeItems(this.props.items)}</ul>
    )
  }
}

Menu.propTypes = {
  lvl: PropTypes.number,
  items: PropTypes.array,
  closeAll: PropTypes.bool
}

export default Menu
