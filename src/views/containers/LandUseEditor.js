import * as React from "react";
import { connect } from 'react-redux';

import LandUseEditorComponent from '../components/editor/LandUseEditor';
import { landUseOperations, landUseSelectors } from "../../state/ducks/landUse";
import { sessionSelectors } from "../../state/ducks/session";
import {uiOperations} from "../../state/ducks/ui";



const mapDispatchToProps = ( dispatch ) => ({
    fetchLandUse: ( id ) => dispatch( landUseOperations.fetchLandUse( id ) ),
    cancelEditing: ( ) => dispatch( uiOperations.cancelLandUseEditing( ) ),
    updateLandUse: ( landUse ) => dispatch( landUseOperations.updateLandUse( landUse )),
});

const mapStateToProps = ( state ) => ({
    editable: sessionSelectors.canEdit( state ),
    landUseId: state.ui.landUse.editing,
    landUse: landUseSelectors.getActive( state )
});

export default connect( mapStateToProps, mapDispatchToProps, null, { forwardRef: true } )( LandUseEditorComponent );