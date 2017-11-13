import React, { Component } from 'react';
import ItemsActions from '../actions/ItemsActions';
import ItemsStore from '../stores/ItemsStore';

export default class AppComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { items: ItemsStore.items(), informations: ItemsStore.informations() };

        this.onLoadItems = this.onLoadItems.bind(this);
        this.onLoadInformations = this.onLoadInformations.bind(this);
    }

    componentDidMount() {
        ItemsStore.addLoadItemsListener(this.onLoadItems);
        ItemsStore.addLoadInformationsListener(this.onLoadInformations);

        ItemsActions.loadItems();
        ItemsActions.loadInformations();
    }

    componentWillUnmount() {
        ItemsStore.removeLoadItemsListener(this.onLoadItems);
        ItemsStore.removeLoadInformationsListener(this.onLoadInformations);
    }

    onLoadItems() {
        this.setState({ items: ItemsStore.items() });
        console.log(ItemsStore.items());
    }

    onLoadInformations() {
        this.setState({ informations: ItemsStore.informations() });
        console.log(ItemsStore.informations());
    }

    render() {
        return (
            <div className="app">
                pippo
            </div>
        );
    }

}
