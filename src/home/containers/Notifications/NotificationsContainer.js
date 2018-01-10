import { connect } from 'react-redux'
import Notifications from './Notifications'

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(Notifications)