const getColor = ( state, queryId ) => {

    return queryId in state.ui.query.cache ?
                state.ui.query.cache[ queryId ].color :
                null;

};

const getSiteColor = ( state, siteId ) => {

    if(!(siteId in state.ui.lookup.sites))
        return null;

    const queryUi = state.ui.lookup.sites[ siteId ].queries
        .map( ( queryId ) => {
           return state.ui.query.cache[queryId];
        })
        .sort( ( query1, query2 ) => {
            return  query1.timestamp - query2.timestamp;
        })
        .find( ( query ) => {
            return query.visible;
        });

    return !queryUi ? null : queryUi.color;
};

const isQueryVisible = ( state, queryId ) => {
    return queryId in state.ui.query.cache ?
        state.ui.query.cache[ queryId ].visible :
        false;
};

const isResultSelected = ( state, queryId, resultId ) => {
    return queryId in state.ui.query.selected ?
        state.ui.query.selected[ queryId ].includes(resultId) :
        false;
}

const selectionIndex = ( state, siteId ) => {
    return state.ui.map.selected.indexOf( siteId );
};

const selectedCount = ( state ) => {
    return state.ui.map.selected.length;
};

export default {
    getColor,
    getSiteColor,
    isQueryVisible,
    isResultSelected,
    selectedCount,
    selectionIndex,
}