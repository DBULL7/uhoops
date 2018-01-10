import { connect } from 'react-redux'
import Profile from './Profile'

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(Profile)