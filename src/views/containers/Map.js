import MapComponent from '../components/Map';

import { connect } from 'react-redux';
import { mapOperations, mapSelectors } from '../../state/ducks/map';

const mapDispatchToProps = ( dispatch ) => ({
    fetchIrData: () => dispatch( mapOperations.fetchIrData() ),
});

const mapStateToProps = ( state ) => ({
    urls: state.system.urls,
    irData: state.map.ir.data,
    sites: mapSelectors.getSortedSites(state),
    queryCount: Object.keys(state.query.cache).length
});

export default connect(  mapStateToProps, mapDispatchToProps )( MapComponent );