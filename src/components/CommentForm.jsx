import React from 'react'
import { connect } from 'react-redux'
import contentAction from '@/services/content.action'

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    send: (payload) => {
      dispatch(contentAction.sendComment(payload))
    }
  }
}

class CommentForm extends React.Component {

  static defaultProps = {
    postId: ''
  }

  state = {
    name: '',
    email: '',
    website: '',
    content: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let payload = {
      post_id: this.props.postId,
      name: this.state.name,
      email: this.state.email,
      website: this.state.website,
      content: this.state.content
    }
    this.props.send(payload)
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleChangeWebsite = (e) => {
    this.setState({
      website: e.target.value
    })
  }

  handleChangeContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  render = () => {
    return (
      <div className="comment-form">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="control-label col-md-2">Name</label>
            <div className="col-md-6">
              <input type="text" className="form-control input-sm" value={this.state.name ? this.state.name : this.props.user.name} onChange={this.handleChangeName}/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-md-2">Email</label>
            <div className="col-md-6">
              <input type="text" className="form-control input-sm" value={this.state.email ? this.state.email : this.props.user.email} onChange={this.handleChangeEmail}/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-md-2">Website</label>
            <div className="col-md-6">
              <input type="text" className="form-control input-sm" value={this.state.website} onChange={this.handleChangeWebsite}/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-md-2">Message</label>
            <div className="col-md-10">
              <textarea className="form-control input-sm" value={this.state.content} onChange={this.handleChangeContent}></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-10 col-md-offset-2">
              <button type="submit" className="btn btn-sm btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
