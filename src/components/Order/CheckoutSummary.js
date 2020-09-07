import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1> We hope it tastes well !! </h1>
			<div className={classes.CheckoutBurger}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button text="CANCEL" click={props.cancelCheckoutHandler.bind(this)} btnType="Danger"/>
			<Button text="CONTINUE" click={props.continueCheckoutHandler.bind(this)} btnType="Success"/>
		</div>
	)
}

export default checkoutSummary;