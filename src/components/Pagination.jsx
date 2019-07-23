import qs from 'qs'
import React from 'react'
import PropTypes from 'prop-types'
import ReactPagination from 'rc-pagination'
import { withRouter } from 'react-router-dom'

class Pagination extends React.Component {

  static defaultProps = {
    currentPage: 1,
    totalItems: 1,
    pageSize: 10
  }

  handlePageChange = (current, size) => {
    let q = {}
    if (this.props.location.search.length > 1) {
      q = qs.parse(this.props.location.search.substr(1))
    }
    q.page = current
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: '?' + qs.stringify(q)
    })
  }

  itemHandler = (current, type) => {
    let str = ''
    switch (type) {
      case 'prev':
        str = 'Prev'
        break
      case 'next':
        str = 'Next'
        break
      default:
        str = current.toString()
    }
    return (
      <span>{str}</span>
    )
  }

  render = () => {
    return (
      <ReactPagination
        className="pagination"
        showTitle={false}
        hideOnSinglePage={true}
        total={this.props.totalItems}
        onChange={this.handlePageChange}
        current={this.props.currentPage}
        pageSize={this.props.pageSize}
        itemRender={this.itemHandler}
      ></ReactPagination>
    )
  }
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  currentPage: PropTypes.number
}

export default withRouter(Pagination)
