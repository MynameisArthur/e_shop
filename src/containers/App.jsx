import React, {Component} from 'react';
import './App.scss';
import Homepage from '../pages/homepage/Homepage.component';
import {Switch, Route, Redirect} from 'react-router-dom';
import ShopPage from '../pages/shop/Shop.component';
import Header from '../components/header/Header.component';
import SignInSignUp from '../pages/sign-in-and-sign-up/SignInSignUp.component';
import {auth, createUserProfileDocument} from '../firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from '../redux/user/user.actions';
import {selectCurrentUser} from '../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

class App extends Component {
    unsubscribeFromAuth = null;
    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapShot) => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    });
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
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
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
