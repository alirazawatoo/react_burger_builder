import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink to={props.link} activeClassName={classes.active}> {props.text}</NavLink>
		</li>
	)
}

export default navigationItem;