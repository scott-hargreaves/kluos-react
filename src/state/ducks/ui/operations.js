import actions from './actions';
import {landUseActions} from "../landUse";

const intersection = ( results, ids ) => {
    return results.filter( ( result ) => ids.includes( result.id ) );
};

const cancelLandUseEditing = ( ) => ( dispatch ) => {

    dispatch( landUseActions.clearLandUse() );
    dispatch( actions.setLandUseEditing(null) );

};

const toggleResultSelected = ( query, result, selected ) => ( dispatch, getState ) => {

    dispatch( actions.setResultsSelected( query.id, [ result.id ], selected, selected ) );

    if(selected) {
        dispatch( actions.setSitesSelected( result.siteRefs, selected, true) );
    }
    else {
        result.siteRefs.forEach( ( siteId ) => {
            const site = getState().map.sites.cache[ siteId ];
            const stillSelected = Object.values(getState().ui.query.selected).find( ( resultIds ) => {
                return resultIds.find(( resultId ) => site.landUseRefs.includes(resultId));
            });

            if(!stillSelected) {
                dispatch( actions.setSitesSelected( [ siteId ], selected, false));
            }

        });

    }

};

const toggleSiteSelected = ( site, selected ) => ( dispatch, getState ) => {

    dispatch( actions.setSitesSelected( [ site.id ], selected, true ));
    if( selected ) dispatch( actions.setResultsSelected( null, [ ], selected, true) );

    getState().ui.lookup.sites [ site.id ].queries.forEach( ( queryId ) => {
        const query = getState().query.cache[ queryId ];
        const results = intersection(query.results, site.landUseRefs);

        if(selected) {
            dispatch(actions.setResultsSelected(query.id, results.map((r) => r.id), selected, false))
        }
        else {

            const resultIds = results.filter( ( result ) => {
                return !getState().ui.map.selected.some( ( siteId ) => { return result.siteRefs.includes(siteId)});
            } ).map( result => result.id);

            dispatch( actions.setResultsSelected( query.id, resultIds, selected, false) );
        }

    });


};

const zoomToSites = ( siteIds ) => ( dispatch, getState ) => {

    const cache = getState().map.sites.cache;
    dispatch( actions.setZoomToSites(
        siteIds.map( ( siteId ) => {
            return cache[ siteId ];
        })
    ));

};

export default {
    cancelLandUseEditing,
    toggleResultSelected,
    toggleSiteSelected,
    zoomToSites,
}