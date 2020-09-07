import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux'
import * as actions from '../../Store/actions/index';

class Orders extends Component {

	componentDidMount(){
		this.props.fetchOrders(this.props.token)
	}

	render(){
		let ordersCollection = null;
		ordersCollection = this.props.orders.map((order)=>{
			return <Order customer={order.customer} 
										deliveryMethod={order.deliveryMethod} 
										ingredients={order.ingredients}
										price={order.price}
										key={'order' + order.id}/>
		})

		return(
			<div>
				{ ordersCollection }
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return{
		fetchOrders: (token) => dispatch(actions.fetchOrders(token))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);