import { connect } from 'react-redux'
import Events from './Events'

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(Events)