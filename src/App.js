import React, { Component } from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import * as actions from './Store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.checkAuthentication();
  }

  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/burger" exact component={BurgerBuilder}/>
            <Route path="/burger-checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Redirect from="/" to="/burger"/>
          </Switch>
        </Layout>  
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthentication: () => dispatch(actions.checkuserAuthentication())
  }
}
export default connect(null, mapDispatchToProps)(App);
