import SiteGeoJSONComponent from '../components/leaflet/SiteGeoJSON';

import { uiOperations, uiSelectors } from '../../state/ducks/ui';

import { connect } from 'react-redux';
import {queryOperations} from "../../state/ducks/query";

const mapDispatchToProps = ( dispatch ) => ({
    toggleSiteSelected: ( site, selected ) => dispatch( uiOperations.toggleSiteSelected( site, selected ) ),
});

const mapStateToProps = ( state, ownProps ) => ({
    color: uiSelectors.getSiteColor(state, ownProps.site.id ),
    selectedIndex: uiSelectors.selectionIndex( state, ownProps.site.id ),
    selectedCount: uiSelectors.selectedCount ( state ),
});

export default connect(  mapStateToProps, mapDispatchToProps )( SiteGeoJSONComponent );