import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'

const mapStateToProps = (state) => {
  return state
}

export default withRouter(connect(mapStateToProps, null)(Nav))