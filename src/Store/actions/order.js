import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-order';

export const checkoutOrder = (data, token) => {
	return dispatch => {
		dispatch(trySubmitOrder())
		axios.post('/orders.json?auth=' + token, data).then(response => {
			dispatch(submitOrderSuccess(data, response.data.name))
		}).catch(error => {
			dispatch(submitOrderFailure(error))
		})
	}
}


export const fetchOrders = (token) => {
	return dispatch => {
		dispatch(trySubmitOrder())
		axios.get('/orders.json?auth=' + token).then(response => {
			let fetchOrders = []
			for(let key in response.data){
				fetchOrders.push({
					...response.data[key],
					id: key
				})
			}
			dispatch(fetchOrdersSubmit(fetchOrders))
		}).catch(error => {
			dispatch(submitOrderFailure(error))
		})
	}
}


export const fetchOrdersSubmit = (orders) => {
	return {
		type: actionTypes.FETCH_ORDER,
		orders: orders
	}
}

export const submitOrderFailure = (error) => {
	return {
		type: actionTypes.ORDER_SUBMIT_FAILURE,
		error: error
	}
}

export const submitOrderSuccess = (order, id) => {
	return {
		type: actionTypes.ORDER_SUBMIT_SUCCESS,
		orders: order,
		id: id
	}
}

export const trySubmitOrder = () => {
	return {
		type: actionTypes.TRY_SUBMIT
	}
}

export const orderPurchased = () => {
	return {
		type: actionTypes.ORDER_PURCHASED
	}
}