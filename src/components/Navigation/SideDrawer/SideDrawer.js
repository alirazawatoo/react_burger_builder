import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Backdrop from '../../Burger/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux'

const sideDrawer = (props) => {
	const attachedClasses = props.show ? classes.Open : classes.Close
	return (
		<Aux>
			<Backdrop show={props.show} clicked={props.sideDrawerCloseHandler.bind(this)}/>
			<div className={[classes.SideDrawer, attachedClasses].join(' ')}> 
				<Logo height="11%"/>
				<nav >
					<NavigationItems isAuth={props.isAuth}/>
				</nav>
			</div>
		</Aux>
	)
}

export default sideDrawer;