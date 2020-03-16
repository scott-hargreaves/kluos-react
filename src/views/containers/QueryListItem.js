import QueryListItemComponent from '../components/query/QueryListItem';

import { queryOperations } from "../../state/ducks/query";
import {uiActions, uiSelectors} from '../../state/ducks/ui';

import { connect } from 'react-redux';


const mapDispatchToProps = ( dispatch ) => ({
    clearQuery: ( query ) => dispatch( queryOperations.clearQuery( query )),
    toggleQueryVisible: ( queryId, visible ) =>  dispatch( uiActions.toggleQueryVisible( queryId, visible )),
});

const mapStateToProps = ( state, ownProps ) => ({
    color: uiSelectors.getColor(state, ownProps.query.id ),
    visible: uiSelectors.isQueryVisible( state, ownProps.query.id ),
});

export default connect(  mapStateToProps, mapDispatchToProps )( QueryListItemComponent );