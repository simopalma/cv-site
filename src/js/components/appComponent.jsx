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
                            <Route exact path="/cv-site" component={Home} />
                            <Route path="/cv-site/about" component={About} />
                            <Route path="/cv-site/resume" component={Resume} />
                            <Route path="/cv-site/contact" component={Contact} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
