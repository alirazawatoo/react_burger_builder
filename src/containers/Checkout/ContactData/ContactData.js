import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreators from '../../../Store/actions/index';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		street: '',
		postalCode: '',
		deliveryMethod: '',
		loading: false
	}

	cancelCheckoutHandler = (event) => {
		event.preventDefault();
		const order ={
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			customer: {
				name: this.state.name,
				street: this.state.street,
				phone: this.state.phone,
				postalCode: this.state.postalCode,
				deliverMethod: this.state.deliveryMethod,
				email: this.state.email
			}
		}
		this.props.checkoutOrder(order, this.props.token)
	}

	inputChangeHandler = (idnentifier, event) => {
		const stateObject = {[idnentifier]: event.target.value};
		this.setState(stateObject);
	}

	render () {
		let spinner = null;
		if(this.props.loading){
			spinner = <Spinner />
		}
		return (
			<div className={classes.ContactData}>
				{spinner}
				<h1> Please enter your contact detials</h1>
				<form onSubmit={this.cancelCheckoutHandler}>
					<Input inputtype="input" type="text" onChange={this.inputChangeHandler.bind(this, 'name')} 
								 value={this.state.name} name="name" placeholder="Your Name" required={true}/>
					<Input inputtype="input" type="text" onChange={this.inputChangeHandler.bind(this, 'email')} 
								 value={this.state.email} name="email" placeholder="Your Email" required={true}/>
					<Input inputtype="input" type="text" onChange={this.inputChangeHandler.bind(this, 'phone')} 
								 value={this.state.phone} name="phone" placeholder="Your Phone Number" required={true}/>
					<Input inputtype="input" type="text" onChange={this.inputChangeHandler.bind(this, 'street')} 
								 value={this.state.street} name="street" placeholder="Your Street" required={true}/>
					<Input inputtype="input" type="text" onChange={this.inputChangeHandler.bind(this, 'postalCode')} 
					       value={this.state.postalCode} name="postalCode" placeholder="Your PostalCode" required={true}/>
					<Input inputtype="select" type="select" onChange={this.inputChangeHandler.bind(this, 'deliveryMethod')} 
								 value={this.state.deliveryMethod} name="deliveryMethod" placeholder="Your Delivery Method"
								 options={[{value: 'fastest', name: 'Fastest'}, {value: 'slow', name: 'Slowest'}]} required={true}/>
					<Button text="ORDER" btnType="Danger"/>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.order.loading,
		token: state.auth.token
	}
}

const mapDispatchToprops = dispatch => {
	return {
		trySubmitOrder: () => dispatch(actionCreators.trySubmitOrder()),
		checkoutOrder: (data, token) => dispatch(actionCreators.checkoutOrder(data, token))
	}
}

export default connect(mapStateToProps, mapDispatchToprops)(ContactData);