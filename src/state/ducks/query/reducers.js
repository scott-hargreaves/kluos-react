import { handleActions } from 'redux-actions';
import actions from './actions';

export default handleActions({

        [ actions.deleteQuery ]: ( state, { payload: { query } } ) => {

            const _cache = { ...state.cache };
            delete _cache[ query.id ];

            return {
                ...state,
                cache: _cache
            }

        },

        [ actions.didRunQuery ]: ( state, { payload: { query, results } } ) => {
            return {
                ...state,
                cache: {
                    ...state.cache,
                    [ query.id ]: {
                        ...state.cache[ query.id ],
                        results: results,
                        complete: true
                    }
                }
            }
        },

        [ actions.willRunQuery ]: ( state, { payload: { query } } ) => {

            return {
                ...state,
                cache: {
                    ...state.cache,
                    [ query.id ]: query
                }
            }
        },


    },
    {
        cache: { }
    }
);
