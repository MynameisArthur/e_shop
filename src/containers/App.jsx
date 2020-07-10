import React from 'react';
import './App.scss';
import Homepage from '../pages/homepage/Homepage.component';
import {Switch, Route, Link} from 'react-router-dom';

const HatsPage = () => (
    <div>
        <h1>HATS PAGE</h1>
    </div>
);

const TopicsPage = (props) => (
    <div>
        <h1>Topic page</h1>
        <Link to={`/comp/${props.match.params.id}`}>
            {props.match.params.id}
        </Link>
    </div>
);

const Comp = (props) => {
    return (
        <div>
            <h1>This is {props.match.params.id.toUpperCase()} page</h1>
        </div>
    );
};

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/hats" component={HatsPage} />
                <Route path="/topics/:id" component={TopicsPage} />
                <Route path="/comp/:id" component={Comp} />
            </Switch>
        </div>
    );
};

export default App;
