import * as actionTypes from '../actions/actionTypes';
import { uilityContent } from '../utility';

const intialState = {
	loading: false,
	token: null,
	userId: null,
	error: null
}

const trySubmitOrder = (state, action) => {
	return uilityContent( state, { loading: true, error: null } )
}

const endSubmitOrder = (state, action) => {
	return uilityContent( state, { loading: false, error: action.error } )
}

const authSuccess = (state, action) => {
	return uilityContent( state, { loading: false, token: action.token, userId: action.userId, error: null } )
}

const authLogout = (state, action) => {
	return uilityContent( state, { loading: false, token: null, userId: null, error: null } )
}

const authReducer = (state = intialState, action) => {
	switch(action.type) {
		case actionTypes.AUTH_START:
			return trySubmitOrder(state, action)
		case actionTypes.AUTH_END:
			return endSubmitOrder(state, action)
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action)
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action)
		default:
			return state
	}
}

export default authReducer;