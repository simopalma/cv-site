import EventEmitter from 'events';
import _ from 'underscore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ItemsConstants from '../constants/ItemsConstants';
import Loader from '../class/Loader';

const itemsLoader = new Loader();

const EVENTS = {
    LOAD_ITEMS: 'LOAD_ITEMS',
};

const WORKSHEET_ID = '12VC85xcJo_00DBBGJiSC82IyQtK3Iwb_C5ASb-h-eEM';

const state = {
    endpoint: {
        // type: 'SPREADSHEETS',
        // url: `https://spreadsheets.google.com/feeds/list/${WORKSHEET_ID}/1/public/values?alt=json-in-script&callback={1}`,
        type: 'JSON',
        url: 'items.json',
    },
};

const results = {
    items: [],
};

const ItemsStore = Object.assign({}, EventEmitter.prototype, {
    items() {
        return results.items;
    },
    emitLoadItems() {
        this.emit(EVENTS.LOAD_ITEMS);
    },
    addLoadItemsListener(callback) {
        this.on(EVENTS.LOAD_ITEMS, callback);
    },
    removeLoadItemsListener(callback) {
        this.removeListener(EVENTS.LOAD_ITEMS, callback);
    },
});

const load = () => {
    itemsLoader.load(state.endpoint, (items) => {
        console.log(items);
        ItemsStore.emitLoadItems();
    });
};

AppDispatcher.register((action) => {
    switch (action.actionType) {
    case ItemsConstants.LOAD_ITEMS:
        load();
        break;
    default:
        // no op
        break;
    }
});

export default ItemsStore;
