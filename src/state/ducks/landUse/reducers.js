import { handleActions } from 'redux-actions';
import actions from './actions';

export default handleActions({

        [ actions.clearLandUse ]: ( state ) => {
            return {
                ...state,
                active: null
            }
        },

        [ actions.didFetchLandUse ]: ( state, { payload: { landUse } } ) => {
            return {
                ...state,
                active: landUse
            }
        },

        [ actions.willFetchLandUse ]: ( state, { payload: { landUseId } } ) => {
            return {
                ...state,
                active: null
            }
        },
    },
    {
        active: null
    }
);
