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
        type: 'SPREADSHEETS',
        url: `https://spreadsheets.google.com/feeds/list/${WORKSHEET_ID}/1/public/values?alt=json-in-script&callback={1}`,
        // type: 'JSON',
        // url: 'items.json',
    },
    endpointInformations: {
        type: 'INFORMATIONS',
        url: `https://spreadsheets.google.com/feeds/list/${WORKSHEET_ID}/2/public/values?alt=json-in-script&callback={1}`,
    },
};

const results = {
    items: [],
    informations: {},
};

const ItemsStore = Object.assign({}, EventEmitter.prototype, {
    items() {
        return results.items;
    },
    informations() {
        return results.informations;
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
    emitLoadInformations() {
        this.emit(EVENTS.LOAD_INFORMATIONS);
    },
    addLoadInformationsListener(callback) {
        this.on(EVENTS.LOAD_INFORMATIONS, callback);
    },
    removeLoadInformationsListener(callback) {
        this.removeListener(EVENTS.LOAD_INFORMATIONS, callback);
    },
});

const loadItems = () => {
    itemsLoader.load(state.endpoint, (items) => {
        results.items = items;
        ItemsStore.emitLoadItems();
    });
};

const loadInformations = () => {
    itemsLoader.load(state.endpointInformations, (informations) => {
        results.informations = informations;
        ItemsStore.emitLoadInformations();
    });
};

AppDispatcher.register((action) => {
    switch (action.actionType) {
    case ItemsConstants.LOAD_ITEMS:
        loadItems();
        break;
    case ItemsConstants.LOAD_INFORMATIONS:
        loadInformations();
        break;
    default:
        // no op
        break;
    }
});

export default ItemsStore;
