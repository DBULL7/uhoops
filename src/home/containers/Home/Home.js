import React, { Component } from 'react'

class Home extends Component {
  componentDidMount() {
    document.title = 'U-Hoop'
  }

  render() {
    return (
      <div>
        <a className="twitter-timeline" data-width="500" data-height="600" data-theme="dark" data-link-color="#E95F28" href="https://twitter.com/ESPNNBA?ref_src=twsrc%5Etfw">Tweets by ESPNNBA</a> 
        {/* <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>       */}
      </div>
    )
  }
} 


export default Home 