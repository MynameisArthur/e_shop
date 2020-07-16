import SHOP_DATA from './shop.data';
import {ShopActionTypes as types} from './shop.types';

const INITIAL_STATE = {collections: SHOP_DATA};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.UPDATE_COLLECTIONS:
            return {
                ...state,
                collection: action.payload,
            };
        default:
            return state;
    }
};

export default shopReducer;
