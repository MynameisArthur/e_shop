import React, {Component} from 'react';
import './App.scss';
import Homepage from '../pages/homepage/Homepage.component';
import {Switch, Route} from 'react-router-dom';
import ShopPage from '../pages/shop/Shop.component';
import Header from '../components/header/Header.component';
import SignInSignUp from '../pages/sign-in-and-sign-up/SignInSignUp.component';
import {auth, createUserProfileDocument} from '../firebase/firebase.utils';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
        };
    }
    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapShot) => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data(),
                        },
                    });
                    console.log(this.state);
                });
            } else {
                this.setState({currentUser: userAuth});
            }
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
