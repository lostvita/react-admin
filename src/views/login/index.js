import { connect } from 'react-redux'
import { doLogin } from 'store/action'
import Login from './login'

const mapStateToProps = (state, owns) => ({
    user: state,
    ...owns
})

const mapDispatchToProps = dispatch => ({
    dispatchLogin: user => dispatch(doLogin(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
