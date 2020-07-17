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
import WithSpinner from '../../components/with-spinner/WithSpinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    state = {
        loading: true,
    };
    unsubscribeFromSnapshot = null;
    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        collectionRef.onSnapshot(async (snapshot) => {
            const collectionsMap = converCollectionSnapshotToMap(snapshot);
            console.log(collectionsMap);

            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }
    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => (
                        <CollectionsOverviewWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => (
                        <CollectionsPageWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
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
