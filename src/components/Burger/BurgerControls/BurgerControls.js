import React from 'react';
import classes from './BurgerControls.css';
import BurgerControl from './BurgerControl/BurgerControl';

const burgercontrols = (props) => {
	let ingredients = Object.keys(props.ingredients).map( igName => {
		return <BurgerControl 
							label={igName} key={igName + 1} 
							incrementHandler={props.incrementHandler} 
							decrementHandler={props.decrementHandler}
							disabledInfo={props.disabledInfo[igName]}
						/>
	});

	return (
		<div className={classes.BurgerControls}>
			<p> Current Price : $ <strong>{props.price.toFixed(2)} </strong></p>
			{ ingredients }
			<button 
				disabled={!props.purchaseable && !props.isAuth} 
				className={classes.OrderButton} 
				onClick={props.orderNowHandler.bind(this)}> {!props.isAuth ? 'ORDER NOW' : 'Login to Continue'}</button>
		</div>
	)
}

export default burgercontrols;