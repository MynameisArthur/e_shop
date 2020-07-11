import React, {Component} from 'react';
import './App.scss';
import Homepage from '../pages/homepage/Homepage.component';
import {Switch, Route} from 'react-router-dom';
import ShopPage from '../pages/shop/Shop.component';
import Header from '../components/header/Header.component';
import SignInSignUp from '../pages/sign-in-and-sign-up/SignInSignUp.component';
import {auth} from '../firebase/firebase.utils';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        };
    }
    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
            this.setState({currentUser: user});
            console.log(user);
        });
    }
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    render() {
        return (
            <div className="App">
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route path="/signin" component={SignInSignUp} />
                </Switch>
            </div>
        );
    }
}

export default App;
