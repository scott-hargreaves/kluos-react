import MapComponent from '../components/Map';

import { connect } from 'react-redux';
import { mapOperations, mapSelectors } from '../../state/ducks/map';
import {uiSelectors} from "../../state/ducks/ui";

const mapDispatchToProps = ( dispatch ) => ({

});

const mapStateToProps = ( state ) => ({
    forceZoom: true,
    getSiteColor: ( ) => { return '#0DA9F4' },
});

export default connect(  mapStateToProps, mapDispatchToProps )( MapComponent );