import React, { Component } from 'react'
import './Profile.css'
import Post from '../Post/PostContainer'
let log = console.log 

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts : [],
      comment: '',
      commentingPost: {}
    }
  }

  componentWillMount() {
    log(this.props.match.params.id)
    fetch(`/api/v1/account/${this.props.match.params.id}`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json())
    .then(data => {
      log(data)
      this.setState({user: data})
    }).catch(err => {
      log('Error: ', err)
    })

    fetch(`/api/v1/user/posts/${this.props.match.params.id}`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json())
    .then(data => {
      log(data)
      this.setState({posts: data})
    }).catch(err => {
      log('Error: ', err)
    })
  }

  comment(post, e) {
    e.stopPropagation()
    this.setState({ commentingPost: post })
  }

  info() {
    if (!this.state.user) {
      return <p></p>
    }
    let {name, publicEmail, phone, bio, location, position, instagram, facebook, twitter } = this.state.user
    return (
      <div className="w-50 card">
        <div className="card-body">
          <h5 className="card-title mb-3">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{position}</h6>
          <p className="card-text">{location}</p>
          <p className="card-text">{bio}</p>
        </div>
        <div className="card-footer">
          {instagram !== '' ? <a href={instagram} className="card-link"><i className="fab fa-instagram fa-lg"></i></a> : <a></a>}
          {facebook  !== '' ? <a href={facebook}  className="card-link"><i className="fab fa-facebook-square fa-lg"></i></a> : <a></a>}
          {twitter   !== '' ? <a href={twitter}   className="card-link"><i className="fab fa-twitter fa-lg"></i></a> : <a></a>}
        </div>
      </div>
    )
  }

  commentContent() {
    if (this.state.commentingPost.hasOwnProperty('content')) {
      return (
        <div className="mb-5">
          <h5 className="text-white">{this.state.commentingPost.postedBy.name}</h5>
          <p className="text-white">{this.state.commentingPost.content}</p>
        </div>
      )
    } else {
      return <p></p>
    }
  }



  addComment() {
    fetch('/api/v1/comment', {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: this.state.comment, id: this.state.commentingPost._id })
    }).then(res => res.json())
      .then(data => {
        $('#exampleModalCenter').modal('hide')
        fetch(`/api/v1/user/posts/${this.props.match.params.id}`, {
          method: 'GET',
          credentials: 'include'
        }).then(res => res.json())
          .then(results => {

            this.setState({ posts: results, comment: '' })
            // this.forceUpdate()
          })
      }).catch(err => log(err))
  }

  deletePost(e, id) {
    e.stopPropagation();
    fetch(`/api/v1/post/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => res.json())
      .then(data => {
        fetch(`/api/v1/user/posts/${this.props.match.params.id}`, {
          method: 'GET',
        }).then(res => res.json())
          .then(results => {
            this.setState({ posts: results })
          })
      }).catch(err => {
        log('Error:', err)
      })
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        {this.info()}
        {this.state.posts.slice(0).reverse().map((post) =>
          <div className="w-50" key={post._id}>
            <Post post={post} comment={this.comment.bind(this)} deletePost={this.deletePost.bind(this)} />
          </div>
        )}
        <div className="modal fade" id="exampleModal" tabIndex="-1" >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-white" id="exampleModalLabel">Create Post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <textarea className="form-control" rows="3" value={this.state.postContent} onChange={(e) => this.setState({ postContent: e.target.value })}></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={() => this.createPost()}>Post</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {this.commentContent()}
                <div className="form-group">
                  <textarea className="form-control comment-input text-muted" rows="3" placeholder="Comment" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} />
                </div>
                <div className="row justify-content-end submit-comment-btn">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => this.addComment()}>Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile