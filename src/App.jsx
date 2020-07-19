import React, {Component} from 'react';
import './App.scss';
import Homepage from './pages/homepage/Homepage.component';
import {Switch, Route, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/Shop.component';
import Header from './components/header/Header.component';
import SignInSignUp from './pages/sign-in-and-sign-up/SignInSignUp.component';
import {connect} from 'react-redux';

import {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import CheckoutPage from './pages/checkout/Checkout.component';
import {checkUserSession} from './redux/user/user.actions';

class App extends Component {
    unsubscribeFromAuth = null;
    componentDidMount() {
        const {checkUserSession} = this.props;
        checkUserSession();
    }
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <SignInSignUp />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
