import React from 'react'
import PropTypes from 'prop-types'

class Search extends React.Component {

  state = {
    searchValue: ''
  }

  static defaultProps = {
    placeholder: 'Put Keyword..'
  }

  handleSubmitForm = (e) => {
    e.preventDefault()
    if (this.state.searchValue.length > 0) {
      this.props.handler(this.state.searchValue)
    }
  }

  handleChange = (e) => {
    this.setState({searchValue: e.target.value})
  }

  render = () => {
    return (
      <div className={this.props.className}>
        <form onSubmit={this.handleSubmitForm}>
          <div className="search-form">
            <input type="text" className="form-control" value={this.state.searchValue} onChange={this.handleChange} placeholder={this.props.placeholder}/>
          </div>
          <div className="search-button">
            <button type="submit" className="btn btn-info">Search</button>
          </div>
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  handler: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default Search