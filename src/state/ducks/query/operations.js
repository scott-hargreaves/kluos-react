import actions from './actions';

import mapActions from '../map/actions';
import uiActions from '../ui/actions';

import Md5 from 'md5';
import UrlAssembler from 'url-assembler';

const SimpleQuery = {
    create: function( criteria ) {
        return {
            type: 'simple',
            id: !!criteria ? Md5(criteria) : null,
            timestamp: new Date().getTime(),
            criteria: criteria,
            complete: false,
            results: null
        }
    }
};

const clearQuery = ( query ) => ( dispatch, getState ) => {

    dispatch( uiActions.deleteQuery ( query ));
    dispatch( actions.deleteQuery( query ) );

    const siteLookup = getState().ui.lookup.sites;
    query.results.forEach( ( result ) => {
        result.siteRefs.forEach( ( siteId ) => {
            if( !(siteId in siteLookup) ) {
                dispatch( mapActions.deleteSite( siteId ) );
                dispatch( uiActions.deleteSite( siteId ) );
            }
        });

    });

};

const runSimpleQuery = ( criteria ) => ( dispatch, getState ) => {

    const query = SimpleQuery.create( criteria );

    dispatch( actions.willRunQuery( query ) );
    dispatch( uiActions.insertQuery( query ));
    dispatch( uiActions.toggleQueryOpen( true ));

    const url = UrlAssembler( getState().system.urls.kluos_api )
        .template('/query')
        .query( { id: query.id })
        .query( { term: query.criteria } )
        .toString();

    fetch(url.toString())
        .then(response => response.json())
        .then(json =>  {

            dispatch(uiActions.insertSites(query, json.results ? json.results.sites : []));
            dispatch(mapActions.didFetchSites(json.results ? json.results.sites : []));
            dispatch(actions.didRunQuery(query, json.results ? json.results.landUses : []));

        });

    /*
    const query = {
        id: !!criteria ? Md5(criteria) : null,
        timestamp: new Date().getTime(),
        criteria: criteria,
        complete: false,
        results:  null,
        resultCount: null,
    };

    dispatch( actions.createSearchUI( query ) );
    dispatch( actions.willRunQuery( query ) );

    dispatch( actions.setSearchOpen( true) );

    const url = UrlAssembler( getState().system.urls.kluos_api )
        .template('/query')
        .query( { id: query.id })
        .query( { term: query.criteria } )
        .toString();

    fetch(url.toString())
        .then(response => response.json())
        .then(json =>  {

            dispatch(actions.didRunQuery(query, json.results.landUses));
            dispatch(mapOperations.insertSites(query, json.results.sites));

        //    dispatch(uiActions.updateQuery(query, 'landUses', json.results.landUses));
            //dispatch(siteActions.insertSites(query, json.results.sites));
        });


    /*
    const query = {
        id: !!criteria ? Md5(criteria) : null,
        timestamp: new Date().getTime(),
        criteria: criteria,
        complete: false,
    };

    const queryUi = {
        id: query.id,
        color: getColor(),
        visible: true,
        landUses: {}
    };

    dispatch(uiActions.insertQuery(queryUi));
    dispatch(uiActions.updateResults('visible', true));
    dispatch( actions.willRunQuery( query ) );

    const api = getState().system.urls.kluos_api;
    const url = UrlAssembler(api)
        .template('/query')
        .query( { id: query.id })
        .query( { term: query.criteria } )
        .toString();

    fetch(url.toString())
        .then(response => response.json())
        .then(json =>  {
            dispatch(actions.didRunQuery(query, json.results.landUses));
            dispatch(uiActions.updateQuery(query, 'landUses', json.results.landUses));
            dispatch(siteActions.insertSites(query, json.results.sites));
        });
        */
};

export default {
    clearQuery,
    runSimpleQuery,
}