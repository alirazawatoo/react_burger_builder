import React from 'react';
import classes from './BurgerControl.css'

const burgerControl = (props) => {
	return (
		<div className={classes.BurgerControl}>
			<label className={classes.Label}>{props.label.charAt(0).toUpperCase() + props.label.slice(1)}</label>
			<button 
				className={classes.Less} 
				onClick={props.decrementHandler.bind(this, props.label)}
				disabled={props.disabledInfo}> Less </button>
			<button className={classes.More} onClick={props.incrementHandler.bind(this, props.label)}> More </button>
		</div>
	)
}

export default burgerControl;