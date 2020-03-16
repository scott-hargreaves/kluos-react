import { handleActions } from 'redux-actions';
import actions from './actions';

import RandomColor from "randomcolor";
import { combineReducers } from "redux";

const hues = ["blue", "orange", "green", "purple",  "red", "yellow", , "pink" ];
let hueIndex = 0;

const getNextColor = () => {
    return RandomColor({ hue: hues[hueIndex++], luminosity: 'dark' });
};

const landUseReducer = handleActions({

        [ actions.setLandUseEditing ]: (state, { payload: { landUseId }}) => {
            return {
                ...state,
                editing: landUseId
            }
        },

    },
    {
        editing: null,

});

const lookupReducer = handleActions({

        [ actions.insertSites ]: (state, { payload: { query, sites }}) => {

            const _sites = { ...state.sites };

            sites.forEach( ( site ) => {
                site.id in _sites ?
                    _sites[ site.id ].queries.push( query.id ) :
                    _sites[ site.id ] = { queries: [ query.id ] }
            });

            return {
                ...state,
                sites: _sites
            }
        },

        [ actions.deleteQuery ]: (state, { payload: { query }}) => {

            const _sites = { ...state.sites };

            Object.keys( _sites ).forEach( (siteId ) => {
                const site = _sites[siteId];
                site.queries = site.queries.filter( ( queryId ) => {
                    return queryId != query.id;
                });
                if(site.queries.length < 1)
                    delete _sites[siteId];
            });

            return {
                ...state,
                sites: _sites
            }
        },

    },
    {
        sites: { }
    }
);

    const mapUiReducer = handleActions( {

        [ actions.deleteSite ]: (state, { payload: { siteId }}) => {

            const _selected = state.selected.filter( ( id ) => {
               return id != siteId;
            });

            return {
                ...state,
                selected: _selected,
            }
        },

        [ actions.setSitesSelected ]: (state, {payload: { siteIds, selected, clear }}) => {

            const _selected = selected ?
                clear ?
                    siteIds :
                        state.selected.concat( siteIds.filter( (siteId) => {
                        return !state.selected.includes( siteId );
                    })) :
                state.selected.filter( ( siteId ) => {
                    return !siteIds.includes( siteId );
                });

            return {
                ...state,
                selected: _selected
            }
        },

    },
    {
        selected: [],
    }
);

const queryUiReducer = handleActions({

        [ actions.deleteQuery ]: (state, { payload: { query }}) => {

            const _cache = { ...state.cache };
            delete _cache[ query.id ];

            const _selected = { ...state.selected };
            if(query.id in _selected)
                delete _selected[ query. id];

            return {
                ...state,
                cache: _cache,
                selected: _selected
            }
        },

        [ actions.insertQuery ]: (state, {payload: { query }}) => {

            return {
                ...state,
                cache: {
                    ...state.cache,
                    [ query.id ]: {
                        color: getNextColor(),
                        timestamp: query.timestamp,
                        visible: true,
                        results: {
                            selected: []
                        }
                    }
                }
            }
        },

        [ actions.setResultsSelected ]: (state, { payload: { queryId, resultIds, selected, clear } }) => {

            const _selected = clear ? { } : { ...state.selected };

            if( !!queryId ) {
                if (!(queryId in _selected))
                    _selected[queryId] = [];

                _selected[queryId] = selected ?
                    _selected[queryId].concat(resultIds.filter(id => !_selected[queryId].includes(id))) :
                    _selected[queryId] = _selected[queryId].filter(id => !resultIds.includes(id));

                if (_selected[queryId].length < 1)
                    delete _selected[queryId];
            }

            return {
                ...state,
                selected: _selected
            }
        },

        [ actions.toggleQueryOpen ]: (state, { payload: { open } }) => {
            return {
                ...state,
                open: open === undefined ? !state.open : open
            }
        },

        [ actions.toggleQueryVisible ]: (state, { payload: { queryId, visible } }) => {
            return {
                ...state,
                cache: {
                    ...state.cache,
                    [ queryId ]: {
                        ...state.cache[ queryId ],
                        visible: visible
                    }
                }
            }
        },
    },
    {
        open: false,
        cache: { },
        selected: { },
    }
);

export default combineReducers ({ landUse: landUseReducer, query: queryUiReducer, map: mapUiReducer, lookup: lookupReducer } );