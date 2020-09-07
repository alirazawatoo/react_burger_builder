import React from 'react';
import classes from './Button.css'

const button = (props) => {
	return (
		<button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={props.click}> {props.text} </button>
	)
}


export default button;