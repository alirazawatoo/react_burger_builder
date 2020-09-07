import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		sideDrawer: false
	}

	sideDrawerCloseHandler = () => {
		this.setState({sideDrawer: false })
	}

	sideDrawerOpenHandler = () => {
		this.setState({sideDrawer: true })
	}

	render () {
		return (
			<Aux>
				<Toolbar isAuth={this.props.isAuthenticated}  sideDrawerOpenHandler={this.sideDrawerOpenHandler.bind(this)} />
				<SideDrawer isAuth={this.props.isAuthenticated} sideDrawerCloseHandler={this.sideDrawerCloseHandler} show={this.state.sideDrawer}/>
				<main className={classes.Content} >
					{ this.props.children }
				</main>
			</Aux>
		)
	}
}

const mapStateToprops = state => {
	return {
		isAuthenticated: state.auth.token === null
	}
}
export default connect(mapStateToprops)(Layout);