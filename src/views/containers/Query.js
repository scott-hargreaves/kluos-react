import QueryComponent from '../components/Query';

import { connect } from 'react-redux';
import { uiActions } from "../../state/ducks/ui";

const mapDispatchToProps = ( dispatch ) => ({
    toggleQueryOpen:  ( open ) =>  dispatch( uiActions.toggleQueryOpen( open )),
});

const mapStateToProps = ( state ) => ({
    queries: state.query.cache,
    ui: state.ui.query
});

export default connect(  mapStateToProps, mapDispatchToProps )( QueryComponent );