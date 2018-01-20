import React, { Component } from 'react'
let log = console.log


class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
      liked: false,
      commented: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ post: nextProps.post})
  }

  componentWillMount() {
    this.setState({post: this.props.post})
    fetch(`/api/v1/post/${this.props.post._id}`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json())
      .then(likeStatus => {
        if (likeStatus.message === 'Liked.') {
          this.setState({liked: true})
        }
      }).catch(err => log(err))

      fetch(`/api/v1/comment/${this.props.post._id}`, {
        method: 'GET',
        credentials: 'include'
      }).then(res => res.json())
      .then(data => {
        if (data.message === 'Commented.') {
          this.setState({ commented : true })
        }
      })
  }


  displayTime() {
    let currentTime = Date.now()
    let postTime = Date.parse(this.state.post.postedAt)
    let diff = currentTime - postTime

    diff = diff / 1000
    let time
    if ((diff / 60 / 60 / 24) > 1) {
      let days = diff / 60 / 60 / 24
      days = Math.round(days)
      time = `${days} days ago`
    } else if ((diff / 60 / 60) > 1) {
      let hours = diff / 60 / 60
      hours = Math.round(hours)
      time = `${hours} hours ago`
    } else if ((diff / 60) > 1) {
      let minutes = diff / 60
      minutes = Math.round(minutes)
      time = `${minutes} minutes ago`
    } else {
      let seconds = Math.round(diff)
      time = `${seconds} seconds ago`
    }
    return time 
  }

  likePost() {
    if (this.state.liked) {
      fetch('/api/v1/post', {
        method: 'PUT',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: this.state.post._id })
      }).then(res => res.json())
        .then(post => {
          log(post, ' this is the response')
          if (post.message) return
          this.setState({
            post: Object.assign(this.state.post, { likes: post.likes })
          });
          // get new like count
          this.setState({ liked: false })
        })
    } else {
      // send like
      fetch('/api/v1/post', {
        method: 'PUT',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: this.state.post._id })
      }).then(res => res.json())
        .then(post => {
          log(post, ' this is the response')
          if (post.message) return 
          this.setState({
            post: Object.assign(this.state.post, { likes: post.likes })
          });
          // get new like count
          this.setState({ liked: true })
        })
    } 
  }

  addNewComment() {
    this.props.comment(this.state.post)
    $('#exampleModalCenter').modal('show')
    $(`#${this.state.post._id}`).modal('hide')
  }


  displayComments() {
    if (this.state.post.comments.length) {
      return (
        <div>
          <p className="text-white comments-section-header">Comments</p>
          {this.state.post.comments.map((comment) => {
            return (
              <div className="comment-box" key={comment._id}>
                <p className="commenters-name">{comment.postedBy.name}</p>
                <p className="comment-content">{comment.content}</p>
              </div>
            )
          })}
        </div>
      )
    } else {
      return
    }
  }


  displayPost() {
    let liked;
    if (this.state.liked) {
      liked = 'action-btn liked'
    } else {
      liked = 'action-btn text-muted'
    }
    let commented;
    if (this.state.commented) {
      commented = 'action-btn commented'
    } else {
      commented = 'action-btn text-muted'
    }
    if (this.state.post.hasOwnProperty('_id')) {
      return (
        <div className="card post-modal-bg">

          <div className="card-body" data-toggle="modal" data-target={`#${this.state.post._id}`} onClick={() => console.log('boom')}>
            <h5 className="card-title text-white">{this.state.post.postedBy.name}</h5>
            <small className="card-subtitle text-muted">{this.displayTime()}</small>
            <p className="card-text mt-2 text-white">{this.state.post.content}</p>

          </div>
          <div className="card-footer">
            <button className={liked} onClick={() => this.likePost()}>
              <i className='far fa-thumbs-up mr-2'></i>
              {/* <i className='fas fa-thumbs-up mr-2'></i> */}
              {this.state.post.likes}
            </button>
            <button className={commented} onClick={() => this.addNewComment()}>
              <i className="far fa-comment mr-2"></i>{this.state.post.comments.length}
            </button>
          </div>
          {this.displayComments()}
        </div>
      )
    } else {
      return <p></p>
    }
  }


  renderModal() {
    if (this.state.post.hasOwnProperty('_id')) {
      return (
        <div className="modal fade" id={this.state.post._id} tabIndex="-1">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body text-secondary">
                {this.displayPost()}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <p></p>
    }
  }


  render() {
    let liked;
    if (this.state.liked) {
      liked = 'action-btn liked'
    } else {
      liked = 'action-btn text-muted'
    }
    let commented;
    if (this.state.commented) {
      commented = 'action-btn commented'
    } else {
      commented = 'action-btn text-muted'
    }
    return (
      <div className="card bg-color">
          
        <div className="card-body" data-toggle="modal" data-target={`#${this.state.post._id}`} onClick={() => console.log('boom')}>
          <h5 className="card-title text-white">{this.state.post.postedBy.name}</h5>
          <small className="card-subtitle text-muted">{this.displayTime()}</small>
          <p className="card-text mt-2 text-white">{this.state.post.content}</p>

        </div>
        <div className="card-footer">
          <button className={liked} onClick={() => this.likePost()}>
              <i className='far fa-thumbs-up mr-2'></i>
            {/* <i className='fas fa-thumbs-up mr-2'></i> */}
            {this.state.post.likes}
          </button>
          <button onClick={() => this.props.comment(this.state.post)} className={commented} data-toggle="modal" data-target="#exampleModalCenter">
            <i className="far fa-comment mr-2"></i>{this.state.post.comments.length}
          </button>
        </div>
        {this.renderModal()}
      </div>
    )
  }
}

module.exports = Post 