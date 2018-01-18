import React, { Component } from 'react'
import Post from './Post'
let log = console.log 


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      postContent: '',
      comment: '',
      commentingPost: {}
    }
  }

  componentWillMount() {
    document.title = 'U-Hoop'
    let oldscript = document.getElementById('twitter')
    if (oldscript) {
      oldscript.parentNode.removeChild(oldscript);
    }
    const script = document.createElement("script");

    script.src = "https://platform.twitter.com/widgets.js";
    script.charset = 'utf-8'
    script.async = true;
    script.id = 'twitter'
    let width = window.innerWidth
    if (width > 450) {
      document.body.appendChild(script);
    }
    
    this.loadPosts()
    // I also need to make a req to get the users info and store in redux
  }

  createPost() {
    fetch('/api/v1/post', {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: this.state.postContent })
    }).then(res => res.json())
    .then(data => {
      this.setState({ postContent: '' })
      $('#exampleModal').modal('hide')
      fetch('/api/v1/post', {
        method: 'GET',
      }).then(res => res.json())
        .then(data => {
          this.setState({ posts: data })
        }) 
    })
  }

  loadPosts() {
    fetch('/api/v1/post', {
      method: 'GET',
    }).then(res => res.json())
    .then(data => {
      this.setState({posts: data})
    })
  }

  comment(post) {
    this.setState({ commentingPost: post })
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

  displayPost() {
    if (this.state.commentingPost.hasOwnProperty('content')) {
      return (
        <div className="mb-5">
          <h5 className="text-white">{this.state.commentingPost.postedBy.name}</h5>
          <p className="text-white">{this.state.commentingPost.content}</p>
          {this.displayComments()}
        </div>
      )
    } else {
      return <p></p>
    } 
  }

  displayComments() {
    if (this.state.commentingPost.comments.length) {
      return (
        <div>
          <p className="text-white">Comments</p>
          {this.state.commentingPost.comments.map((comment) => {
            return (
              <div>
                <p className="text-secondary">{comment.postedBy.name}</p>
                <p className="text-secondary">{comment.content}</p>
              </div>
          )
                
             
          })}
          

        </div>
      )
    } else {
      return
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
      log(data)
    }).catch(err => log(err))
  }

  render() {
    let twitterHeight = window.innerHeight;
    return (
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-4 d-none d-sm-block">
            <a className="twitter-timeline" data-width="350" data-height={twitterHeight} data-theme="dark" data-link-color="#E95F28" href="https://twitter.com/ESPNNBA?ref_src=twsrc%5Etfw">Tweets by ESPNNBA</a> 
          </div>
          <div className="col-5">
            {this.state.posts.slice(0).reverse().map((post) =>
              <Post post={post} key={post._id} comment={this.comment.bind(this)}/> 
            )}
            <button className=" btn-primary rounded-circle" id="post-btn" data-toggle="modal" data-target="#exampleModal">
              <i className="fas fa-pencil-alt fa-2x"></i>
            </button>
          </div>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-white" id="exampleModalLabel">Create Post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <textarea className="form-control" rows="3" value={this.state.postContent} onChange={(e) => this.setState({postContent: e.target.value})}></textarea>
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
                  <textarea className="form-control comment-input text-muted" rows="3" placeholder="Comment" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value})}/>
                </div>
                <div className="row justify-content-end submit-comment-btn">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => this.addComment()}>Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body text-secondary">
                {this.displayPost()}
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 




export default Home 