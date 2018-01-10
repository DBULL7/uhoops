import { connect } from 'react-redux'
import Tours from './Tours'

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(Tours)