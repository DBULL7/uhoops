import React, { Component } from 'react'

class Home extends Component {
  componentDidMount() {
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