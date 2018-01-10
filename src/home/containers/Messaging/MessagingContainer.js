import { connect } from 'react-redux'
import Messaging from './Messaging'

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(Messaging)