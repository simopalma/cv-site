import React, { Component } from 'react';
import ItemsActions from '../actions/ItemsActions';
import ItemsStore from '../stores/ItemsStore';

export default class AppComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { items: ItemsStore.items() };

        this.onLoadItems = this.onLoadItems.bind(this);
    }

    componentDidMount() {
        ItemsStore.addLoadItemsListener(this.onLoadItems);

        ItemsActions.loadItems();
    }

    componentWillUnmount() {
        ItemsStore.removeLoadItemsListener(this.onLoadItems);
    }

    onLoadItems() {
        this.setState({ items: ItemsStore.items() });
    }

    render() {
        return (
            <div className="app">
                { this.state.items }
            </div>
        );
    }

}
