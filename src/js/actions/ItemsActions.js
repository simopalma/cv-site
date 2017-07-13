import AppDispatcher from '../dispatcher/AppDispatcher';
import ItemsConstants from '../constants/ItemsConstants';

export default {
    loadItems() {
        AppDispatcher.dispatch({
            actionType: ItemsConstants.LOAD_ITEMS,
        });
    },
};
