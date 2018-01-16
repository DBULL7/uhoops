import React, { Component } from 'react'
let log = console.log 
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      postContent: ''
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

    document.body.appendChild(script);
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
      // 
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

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <a className="twitter-timeline" data-width="350" data-height="600" data-theme="dark" data-link-color="#E95F28" href="https://twitter.com/ESPNNBA?ref_src=twsrc%5Etfw">Tweets by ESPNNBA</a> 
          </div>
          {/* <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>       */}
          <div className="col-9 card-columns">
            {this.state.posts.slice(0).reverse().map((post) =>
              <Post post={post}/> 
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
                <h5 className="modal-title" id="exampleModalLabel">Create Post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <textarea className="form-control" rows="3" onChange={(e) => this.setState({postContent: e.target.value})}></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={() => this.createPost()}>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 

let Post = (post) => {
  log(post)
  if (!post.post) return <p>Nothing yet</p>
  let display = post.post 
  // log(display.content)
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{display.postedBy.name}</h5>
        <p className="card-text">{display.content}</p>

      </div>
      <div className="card-footer d-flex justify-content-around">
        <button className="btn btn-primary">
          <i className="fas fa-thumbs-up mr-3"></i>
          Likes {display.likes}
        </button>
        <button className="btn btn-primary">Comments {display.comments.length}</button>
      </div>
    </div>
  )
}


export default Home 