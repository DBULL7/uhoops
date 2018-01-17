import React, { Component } from 'react'
let log = console.log


class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
      liked: false,
    }

  }

  componentWillMount() {
    this.setState({post: this.props.post})
  }

  // log(post)
  // if (!post.post) return <p>Nothing yet</p>
  // let display = post.post

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
    log('fired')
    if (this.state.liked) {
      this.setState({ liked: false })
    } else {
      this.setState({ liked: true})
    } 
  }

  displayLikeIcon() {

  }



  render() {

    return (
      <div className="card">
          
        <div className="card-body">
          <h5 className="card-title">{this.state.post.postedBy.name}</h5>
          <small className="card-subtitle text-muted">{this.displayTime()}</small>
          <p className="card-text mt-2">{this.state.post.content}</p>

        </div>
        <div className="card-footer">
          <button className="action-btn like" onClick={() => this.likePost()}>
            <i className='far fa-thumbs-up mr-2'></i>
            {/* <i className='fas fa-thumbs-up mr-2'></i> */}
            {this.state.post.likes}
          </button>
          <button className="action-btn"><i className="far fa-comment mr-2"></i>{this.state.post.comments.length}</button>
        </div>
      </div>
    )
  }
}

module.exports = Post 