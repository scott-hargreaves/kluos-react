import DashboardComponent from '../components/Dashboard';

import { connect } from 'react-redux';

import { queryOperations } from "../../state/ducks/query";
import { uiActions } from "../../state/ducks/ui";
import {sessionSelectors} from "../../state/ducks/session";
import {landUseOperations} from "../../state/ducks/landUse";

const mapDispatchToProps = ( dispatch ) => ({
    runSimpleQuery: ( criteria ) => dispatch( queryOperations.runSimpleQuery( criteria ) ),
    setLandUseEditing: ( landUseId ) => dispatch( uiActions.setLandUseEditing( landUseId ) ),
});

const mapStateToProps = ( state ) => ({
    editable: sessionSelectors.canEdit( state ),
    landUseId: state.ui.landUse.editing,
    user: state.session.user
});

export default connect(  mapStateToProps, mapDispatchToProps )( DashboardComponent );