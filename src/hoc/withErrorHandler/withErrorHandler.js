import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		} 

		componentDidMount () {
			axios.interceptors.request.use(req => {
				this.setState({error: null});
				return req;
			});

			axios.interceptors.response.use(null, error => {
				this.setState({error: error})
			})
		}

		errorCloseHandler = () => {
			this.setState({error: null})
			console.log('here')
		} 

		render (){
			return (
				<Aux>
					<Modal show={this.state.error} orderCancelHandler={this.errorCloseHandler.bind(this)}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);	
		}
	}
}

export default withErrorHandler;