import {ShopActionTypes as types} from './shop.types';

export const updateCollections = (collectionsMap) => {
    return {
        type: types.UPDATE_COLLECTIONS,
        payload: collectionsMap,
    };
};
