import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';

const toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<SideDrawerToggle sideDrawerOpenHandler={props.sideDrawerOpenHandler.bind(this)}/>
			<Logo height="80%"/>
			<nav className={classes.DekstopOnly}>
				<NavigationItems isAuth={props.isAuth}/>
			</nav>
		</header>
	)
}

export default toolbar;