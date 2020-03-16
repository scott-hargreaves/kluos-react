import { handleActions } from 'redux-actions';

import actions from './actions';
import { combineReducers} from "redux";

const siteReducer = handleActions({

        [ actions.deleteSite ]: ( state, { payload: { siteId } } ) => {

            const _sites = { ...state.cache };
            delete _sites[ siteId ];

            return {
                ...state,
                cache: _sites,
            }
        },

        [ actions.didFetchSites ]: ( state, { payload: { sites } } ) => {

            const _sites = { ...state.cache };
            sites.forEach( ( site ) => {
                if(!site.id) return;
                _sites[site.id] = site;
            });

            return {
                ...state,
                cache: _sites,
            }
        }
    },
    {
        cache: {},
    }
);

const irReducer = handleActions({

        [actions.didFetchIrData]: (state, {payload: { geoJson }}) => {
            return {
                ...state,
                data: geoJson
            }
        },

        [actions.willFetchIrData]: (state) => {
            return {
                ...state,
                data: null
            }
        },

    },
    {
        data: null,
    }
);

export default combineReducers ({ sites: siteReducer, ir: irReducer } );