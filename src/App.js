import React, { Component } from 'react'
import { connect } from 'react-redux'
import { prop } from 'ramda'

import SideBar from 'components/SideBar'
import Routers from 'router'

class App extends Component {

	render () {
		return (
			<div className="container">
				<section className="sidebar">
					<SideBar />
				</section>
				<section className="main">
					<header className="header">
						<span className="username">Hi, { this.props.user.lastname }</span>
					</header>
					<div className="wrapper">
						<Routers />
					</div>
					<footer className="footer">
						<span className="copyright">Copyright@2019 PID.YOUMI</span>
					</footer>
				</section>
			</div>
		)
	}
}

const mapStateToProps = (state, owns) => ({
	user: prop('user', state),
	...owns
})

export default connect(
	mapStateToProps
)(App)