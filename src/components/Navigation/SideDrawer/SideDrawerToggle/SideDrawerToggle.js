import React from 'react';
import classes from './SideDrawerToggle.css'

const sideDrawerToggle = (props) => {
	return (
		<div onClick={props.sideDrawerOpenHandler} className={classes.SideDrawerToggle}> 
			<div> </div>
			<div> </div>
			<div> </div>
		</div>
	)
}

export default sideDrawerToggle;