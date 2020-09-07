import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';

class BurgerBuilder extends Component {
	state = {
		ordering: false,
		loading: false
	}

	componentDidMount () {
		this.props.orderPurchased()
		this.props.setIngredientsHandler()
	}

	orderNowHandler = () => {
		if (this.props.isAuth) {
			this.props.history.push('/auth')
		}
		else {
			this.setState({ ordering: true })
		}
	}

	orderCancelHandler = () => {
		this.setState({ ordering: false })
	}

	orderContinueHandler = () => {
		this.props.history.push('/burger-checkout');
	}

	render () {
		const disabledInfo = {
			...this.props.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = <OrderSummary 
													ingredients={this.props.ingredients} 
													orderCancelHandler={this.orderCancelHandler}
													orderContinueHandler={this.orderContinueHandler}
													totalPrice={this.props.totalPrice}
												/>
		if(this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<Aux>
				<Modal show={this.state.ordering} orderCancelHandler={this.orderCancelHandler.bind(this)}>
					{ orderSummary }
				</Modal> 
				<Burger ingredients={this.props.ingredients} />
				<BurgerControls 
					price={this.props.totalPrice}
					ingredients={this.props.ingredients} 
					incrementHandler={this.props.ingredientsIncementHandler}
					decrementHandler={this.props.ingredientsDecrementHandler}
					disabledInfo={disabledInfo}
					purchaseable={this.props.purchaseable}
					orderNowHandler={this.orderNowHandler}
					isAuth={this.props.isAuth}/>
			</Aux>
		)
	}
} 

const mapStateToProps = state => {
	return {
		ingredients: state.ing.ingredients,
		totalPrice: state.ing.totalPrice,
		purchaseable: state.ing.purchaseable,
		isAuth: state.auth.token === null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setIngredientsHandler: () => dispatch(actions.fetchIngredients()),
		ingredientsIncementHandler: (ingredientName) => dispatch(actions.addIngredients(ingredientName)),
		ingredientsDecrementHandler: (ingredientName) => dispatch(actions.removeIngredients(ingredientName)),
		orderPurchased: () => dispatch(actions.orderPurchased())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));