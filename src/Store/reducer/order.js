import * as actionTypes from '../actions/actionTypes';
import { uilityContent } from '../utility';

const intialState = {
	orders: [],
	loading: false,
	purchased: false
}

const trySubmitOrder = (state, action) => {
	return uilityContent( state, { loading: true } )
}

const orderSubmitSuccess = (state, action) => {
	let newOrder = { ...action.orders, id: action.id }
	console.log(newOrder);
	console.log(state.orders);
	let orders = [...state.orders, newOrder]
	console.log(orders)
	return uilityContent( state, { orders: orders , loading: false , purchased: true } )
}

const orderSubmitFailure = (state, action) => {
	return uilityContent( state, { loading: false } )
}

const orderPurchased = (state, action) => {
	return uilityContent( state, { purchased: false } )
}

const fetchOrders = (state, action) => {
	return uilityContent(state, {orders: action.orders})
}

const orderReducer = (state = intialState, action) => {
	switch(action.type) {
		case actionTypes.ORDER_PURCHASED:
			return orderPurchased(state, action)
		case actionTypes.TRY_SUBMIT:
			return trySubmitOrder(state, action)
		case actionTypes.ORDER_SUBMIT_SUCCESS:
			return orderSubmitSuccess(state, action)
		case actionTypes.ORDER_SUBMIT_FAILURE:
			return orderSubmitFailure(state, action)
		case actionTypes.FETCH_ORDER:
			return fetchOrders(state, action)
		default:
			return state
	}
}

export default orderReducer;