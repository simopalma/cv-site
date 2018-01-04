import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import About from './About';
import Resume from './Resume';
import Contact from './Contact';
import ItemsActions from '../actions/ItemsActions';

export default class AppComponent extends Component {

    componentWillMount() {
        ItemsActions.loadItems();
        ItemsActions.loadInformations();
    }

    render() {
        return (
            <Router>
                <div className="page">
                    <Header />
                    <div className="site-main">
                        <div className="subpages">
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/resume" component={Resume} />
                            <Route path="/contact" component={Contact} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
