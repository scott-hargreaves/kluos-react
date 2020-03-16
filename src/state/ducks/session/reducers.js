import { handleActions } from 'redux-actions';
import actions from './actions';

const initialState = {

};

export default handleActions({
        [ actions.signIn ]: ( state ) => {
            return {
                //...state
            }
        },
        [ actions.signOut ]: ( state ) => {
            return {
                //...state
            }
        }
    },
    initialState
);