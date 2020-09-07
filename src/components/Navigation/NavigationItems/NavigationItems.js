import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
	console.log(props.isAuth)

	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem text="Burger Builder" link="/burger" active/>
			{!props.isAuth ? <NavigationItem text="Orders" link="/orders"/> : null}
			{props.isAuth ? <NavigationItem text="Log in" link="/auth"/> : <NavigationItem text="Logout" link="/logout"/>}
			
		</ul>
	)
}

export default navigationItems;