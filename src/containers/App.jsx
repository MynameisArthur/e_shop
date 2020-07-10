import React from 'react';
import './App.scss';
import Homepage from '../pages/homepage/Homepage.component';
import {Switch, Route} from 'react-router-dom';
import ShopPage from '../pages/shop/Shop.component';
import Header from '../components/header/Header.component';

const App = () => {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/shop" component={ShopPage} />
            </Switch>
        </div>
    );
};

export default App;
