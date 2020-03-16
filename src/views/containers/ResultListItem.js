import ResultListItemComponent from '../components/query/ResultListItem';

import { uiActions, uiOperations, uiSelectors } from '../../state/ducks/ui';
import { sessionSelectors } from "../../state/ducks/session";

import { connect } from 'react-redux';

const mapDispatchToProps = ( dispatch ) => ({
    setLandUseEditing: ( landUseId ) => dispatch( uiActions.setLandUseEditing( landUseId ) ),
    toggleResultSelected: ( query, result, selected ) => dispatch( uiOperations.toggleResultSelected( query, result, selected ) ),
});

const mapStateToProps = ( state, ownProps ) => ({
    editable: sessionSelectors.canEdit( state ),
    selected: uiSelectors.isResultSelected( state, ownProps.query.id, ownProps.result.id ),
});

export default connect(  mapStateToProps, mapDispatchToProps )( ResultListItemComponent );