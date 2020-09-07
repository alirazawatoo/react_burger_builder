import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

	cancelCheckoutHandler = () => {
		this.props.history.goBack();
	}

	continueCheckoutHandler = () => {
		this.props.history.replace('/burger-checkout/contact-order');
	} 

	render (){
		console.log(this.props.purchased)
		return (
			<div>
				{ this.props.purchased ? <Redirect to="/"/> : null }
				<CheckoutSummary 
					ingredients={this.props.ingredients} 
					cancelCheckoutHandler={this.cancelCheckoutHandler}
					continueCheckoutHandler={this.continueCheckoutHandler}/>
	      <Route 
	      	path={this.props.match.path + '/contact-order'} 
	      	render={(props)=> (<ContactData ingredients={this.props.ingredients} totalPrice={this.props.totalPrice} {...props}/>)} />
	    </div>
		)
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ing.ingredients,
		totalPrice: state.ing.totalPrice,
		purchased: state.order.purchased
	}
}

export default connect(mapStateToProps)(Checkout);