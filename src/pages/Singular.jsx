import React from 'react'
import Post from '@/partials/Post'
import { connect } from 'react-redux'
import Layout from '@/partials/Layout'
import Comment from '@/partials/Comment'
import CommentForm from '@/components/CommentForm'
import Pagination from '@/components/Pagination'
import contentAction from '@/services/content.action'

const mapStateToProps = state => {
  return {
    pagination: state.site.pagination,
    post: state.content.post,
    data: state.content.comments.data,
    meta: state.content.comments.meta,
    notify: state.content.notify
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDetail: (payload) => {
      dispatch(contentAction.fetchDetailPost(payload))
    }
  }
}

class Singular extends React.Component {

  componentDidMount = () => {
    let filters = {
      page: this.props.pagination.page,
      order: 'created_at',
      sort: 'asc',
      size: this.props.pagination.size
    }

    let paths = this.props.location.pathname.split('/')

    this.props.fetchDetail({
      slug: paths.pop(),
      params: {...filters}
    })
  }

  render () {
    return (
      <Layout>
        <Post detail={this.props.post} isSingular={true}></Post>
        <div className="comment-list">
        {
          this.props.data.map((comment, index) => {
            return <Comment detail={comment} key={index}></Comment>
          })
        }
        </div>
        <Pagination currentPage={this.props.pagination.page} totalItems={this.props.meta.total} pageSize={this.props.pagination.size}></Pagination>
        <CommentForm postId={this.props.post.id}></CommentForm>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singular)
