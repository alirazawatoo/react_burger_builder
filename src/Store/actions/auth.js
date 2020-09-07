import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';


export const checkuserAuthentication = () => {
	return dispatch => {
		let token = localStorage.getItem('Token')
		let expirationTime = new Date(localStorage.getItem('ExpirationTime'))
		let userId = localStorage.getItem('UserId')

		if(token && (expirationTime > new Date())) {
			dispatch(authSuccess(token, userId))
			localStorage.setItem('ExpirationTime', new Date(expirationTime.getTime() + 3600 * 1000))
		}
	}
}

export const formSubmitHandler = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart())
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyoU9vWd9oZJiKWFZ6qFBI5hKzfGHTy-4'
		if(!isSignUp){
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyoU9vWd9oZJiKWFZ6qFBI5hKzfGHTy-4'
		}
		axios.post(url, authData)
		.then(response => {
			dispatch(authSuccess(response.data.idToken, response.data.localId))
			dispatch(authEnd(null))
			dispatch(authLogout(response.data.expiresIn))
			setLocalStorage(response.data.idToken, response.data.expiresIn, response.data.localId)
		}).catch(error => {
			console.log(error)
			dispatch(authEnd(error))
		})
	}
} 

const setLocalStorage = (token, expirationTime, userId) => {
	localStorage.setItem('Token', token)
	localStorage.setItem('ExpirationTime', new Date(new Date().getTime() + expirationTime * 1000))
	localStorage.setItem('UserId', userId)
}


const removeLocalStorage = () => {
	localStorage.removeItem('Token')
	localStorage.removeItem('ExpirationTime')
	localStorage.removeItem('UserId')
}

const logout =  () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const logoutUser = () => {
	removeLocalStorage()
	return dispatch => {
		dispatch(logout())
	}
}

const authLogout = (expire) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expire * 1000 );
	}
}

const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId
	}
}


const authEnd = (error) => {
	return {
		type: actionTypes.AUTH_END,
		error: error
	}
}

