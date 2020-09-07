import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input/FormInput';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionCreators from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address'
				},
				value: '',
				validation: {
					required: true, 
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true, 
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignUp: true
	}

	inputChangeHandler = (field, event) => {
		const updatedControls = {
			...this.state.controls,
			[field]: {
				...this.state.controls[field],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[field].validation),
				touched: true
			}
		}

		this.setState({controls: updatedControls})
	}

	checkValidity(value, rules) {
		let isValid = true;

		if(!rules) {
			return true;
		}

		if(rules.required){
			isValid = value.trim() !== '' && isValid
		}

		if(rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if(rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		if(rules.isEmail) {
			const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
			isValid = pattern.test(value) && isValid
		}

		if(rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid
		}

		return isValid;
	}

	onformSubmit = (event) => {
		event.preventDefault();
		let email = this.state.controls.email.value;
		let password = this.state.controls.password.value
		this.props.submitFormHandler(email, password, this.state.isSignUp);
	}

	isSinupChangeHandler = (event) => {
		event.preventDefault();
		let isSignUp = this.state.isSignUp;
		this.setState({isSignUp: !isSignUp})
	}

	render() {
		let formElements = [];
		for (let key in this.state.controls) {
			formElements.push({
				id: key,
				config: this.state.controls[key]
			})
		}

		let form = (
			<form onSubmit={this.onformSubmit}> 
				{
					formElements.map(field => (
						<Input 
							key={field.id}
							inputtype={field.config.elementType}
							elementConfig={field.config.elementConfig}
							value={field.config.value}
							invalid={!field.config.valid}
							shouldValidate={field.config.validation}
							touched={field.config.touched} 
							change={this.inputChangeHandler.bind(this, field.id)}/>
					))
				}
				<Button btnType="Success" text="Submit"/>
			</form>
		)
		console.log(this.props.isAuth, this.props.purchasing)
		return (
			<div className={classes.Auth}>
				{ this.props.isAuth && this.props.purchasing ? <Redirect to="/burger-checkout"/> : null }
				{ this.props.isAuth && !this.props.purchasing ? <Redirect to="/"/> : null }
			  { this.props.loading ? <Spinner /> : null }
				{ form }
				<Button btnType="Danger" 
								text={"Switch To " + (this.state.isSignUp ? 'Login' : 'Singup')}
								click={this.isSinupChangeHandler.bind(this)}/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		isAuth: state.auth.token !== null,
		purchasing: state.ing.purchaseable  
	}
}


const mapDispatchToprops = dispatch =>{
	return {
		submitFormHandler: (email, password, isSignUp) => dispatch(actionCreators.formSubmitHandler(email, password, isSignUp))
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(Auth);