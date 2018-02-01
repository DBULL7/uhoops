import { connect } from 'react-redux'
import Post from './Post'

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Post)