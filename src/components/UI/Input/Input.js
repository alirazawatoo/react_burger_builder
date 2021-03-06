import React from 'react';
import classes from './Input.css';

const input = (props) => {

	let inputElement = null;
	switch(props.inputtype) {
		case ('input'):
			inputElement = <input className={classes.InputElement} {...props}/>
			break;
		case ('textarea'):
			inputElement = <textarea className={classes.InputElement} {...props}/>
			break;
		case ('select'):
			inputElement = (
											<select className={classes.InputElement} {...props}>
												{
													props.options.map(option => (
														<option value={option.value} key={option.value}> {option.name}</option>
													))
												}
			 							  </select>
			 							 )
			break;
		default:
			inputElement = <input className={classes.InputElement} {...props}/>
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Input}> {props.label} </label>
			{inputElement}
		</div>
	);
}


export default input;