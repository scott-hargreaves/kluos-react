import MapComponent from '../components/Map';

import { connect } from 'react-redux';
import { mapOperations, mapSelectors } from '../../state/ducks/map';
import { uiOperations, uiSelectors } from '../../state/ducks/ui';

const mapDispatchToProps = ( dispatch ) => ({
    fetchIrData: () => dispatch( mapOperations.fetchIrData() ),
    toggleSiteSelected: ( site, selected ) => dispatch( uiOperations.toggleSiteSelected( site, selected ) ),
});

const mapStateToProps = ( state ) => ({
    getSiteColor: ( siteId ) => { return uiSelectors.getSiteColor(state, siteId ); },
    urls: state.system.urls,
    irData: state.map.ir.data,
    selectionIndex: ( siteId ) => { return uiSelectors.selectionIndex( state, siteId ); },
    sites: mapSelectors.getSortedSites(state),
    queryCount: Object.keys(state.query.cache).length,
    zoom: state.ui.map.zoom,
});

export default connect(  mapStateToProps, mapDispatchToProps )( MapComponent );