
import Action from '../../../model/Action';

function canEdit( state ) {
    return !!( state.session.user.authorization & Action.UPDATE );
}

export default {
    canEdit,
}