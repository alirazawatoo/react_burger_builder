import React from 'react';
import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	let orderList = Object.keys(props.ingredients).map( igName => {
		return <li key={igName}>{igName.charAt(0).toUpperCase() + igName.slice(1)} : {props.ingredients[igName]}</li>	
	})

	return (
		<div>
			<div>
				<span className={classes.OrderHeading}> Your Order </span>
				<span onClick={props.orderCancelHandler.bind(this)} className={classes.CancelButton}> X </span>
			</div>
			<p> A delicious burger with following ingredients: </p>
			<ul>
				{ orderList }
			</ul>
			<p><strong>Total Price:</strong> $ {props.totalPrice.toFixed(2)}</p>
			<Button text="CANCEL" click={props.orderCancelHandler.bind(this)} btnType="Danger"/>
			<Button text="CONTINUE" click={props.orderContinueHandler.bind(this)} btnType="Success"/>
		</div>
	)
}

export default orderSummary;