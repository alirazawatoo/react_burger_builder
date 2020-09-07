import React from 'react';
import classes from './Input.css';

const input = (props) => {

	let dynamicClasses = [classes.InputElement];
	if (props.shouldValidate && props.invalid && props.touched){
		dynamicClasses.push(classes.Red)
	}

	let inputElement = null;
	switch(props.inputtype) {
		case ('input'):
			inputElement = <input className={dynamicClasses.join(' ')}
														type={props.elementConfig.type}
														value={props.value} 
														placeholder={props.elementConfig.placeholder}
														onChange={props.change}/>
			break;
		case ('textarea'):
			inputElement = <textarea className={classes.InputElement} />
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
			<label className={classes.Input}> {props.elementConfig.type} </label>
			{inputElement}
		</div>
	);
}


export default input;