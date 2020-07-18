import {
    firestore,
    converCollectionSnapshotToMap,
} from '../../firebase/firebase.utils';

import {ShopActionTypes as types} from './shop.types';

export const fetchCollectionsStart = () => {
    return {
        type: types.FETCH_COLLECTIONS_START,
    };
};

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: types.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: types.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
    return (dispatch) => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        collectionRef
            .get()
            .then((snapshot) => {
                const collectionsMap = converCollectionSnapshotToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            })
            .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
    };
};
