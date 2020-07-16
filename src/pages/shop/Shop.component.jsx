import React, {Component} from 'react';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview.component';
import {Route} from 'react-router-dom';
import CollectionPage from '../collection/Collection.component';
import {
    firestore,
    converCollectionSnapshotToMap,
} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';

class ShopPage extends Component {
    unsubscribeFromSnapshot = null;
    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        collectionRef.onSnapshot(async (snapshot) => {
            const collectionsMap = converCollectionSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
        });
    }
    render() {
        const {match} = this.props;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverview}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPage}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) =>
        dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
