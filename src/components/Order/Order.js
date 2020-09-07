import React from 'react';
import classes from './Order.css';

const order = (props) => {
	let ingredients = [];

	for(let ingredient in props.ingredients){
		ingredients.push({
			name: ingredient,
			amount: props.ingredients[ingredient]
		})
	}


	let ingredientsOutput = ingredients.map(ig => {
		return <span key={ig.name}
								 style={{
									textTranform: 'capitalize',
									display: 'inline-block',
									margin: '0 8px',
									border: '1px solid #ccc',
									padding: '5px'}}> {ig.name} ({ig.amount}) </span>
	})

	console.log(ingredients);
	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientsOutput}</p>

			<p> Price <strong> ${props.price}</strong> </p>
		</div>
	)
}

export default order;