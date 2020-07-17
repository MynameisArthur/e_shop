import React, {Component} from 'react';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview.component';
import {Route} from 'react-router-dom';
import CollectionPage from '../collection/Collection.component';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/WithSpinner.component';
import {createStructuredSelector} from 'reselect';
import {
    selectIsCollectionFetching,
    selectIsCollectionLoaded,
} from '../../redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }
    render() {
        const {match, isCollectionFetching, isCollectionLoaded} = this.props;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => (
                        <CollectionsOverviewWithSpinner
                            isLoading={isCollectionFetching}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => (
                        <CollectionsPageWithSpinner
                            isLoading={!isCollectionLoaded}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionLoaded,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
