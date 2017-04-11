import React, { Component } from 'react';
import json from '../json/jsonMock';

export default class AppComponent extends Component {

    getJsonEntry() {
        return json.entry;
    }

    getScheme() {
        let entry = this.getJsonEntry();

        return entry[0].category[0].scheme;
    }

    render() {
        return (
            <div className="app">
                { this.getScheme() }
            </div>
        );
    }

}
