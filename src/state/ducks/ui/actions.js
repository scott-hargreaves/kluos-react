import { createAction } from "redux-actions";
import types from "./types";

const deleteQuery = createAction( types.QUERY_DELETE, ( query ) => ({ query }) );
const deleteSite = createAction( types.SITE_DELETE, ( siteId ) => ({ siteId }) );
const insertQuery = createAction( types.QUERY_INSERT, ( query ) => ({ query }) );
const insertSites = createAction( types.SITES_INSERT, ( query, sites ) => ({ query, sites }) );
const setLandUseEditing = createAction( types.LANDUSE_EDIT, ( landUseId ) => ({ landUseId })  );
const setResultsSelected = createAction( types.RESULTS_SELECT, ( queryId, resultIds, selected, clear ) => ({ queryId, resultIds, selected, clear }) );
const setSitesSelected = createAction( types.SITES_SETSELECTED, ( siteIds, selected, clear ) => ({ siteIds, selected, clear }) );
const toggleQueryOpen = createAction( types.QUERY_TOGGLEOPEN, ( open ) => ({ open }) );
const toggleQueryVisible = createAction( types.QUERY_TOGGLEVISIBLE, ( queryId, visible ) => ({ queryId, visible }) );

const setZoomToSites = createAction( types.SITES_SETZOOMTO, ( sites ) => ({ sites }) );

export default {
    deleteQuery,
    deleteSite,
    insertQuery,
    insertSites,
    setLandUseEditing,
    setResultsSelected,
    setSitesSelected,
    toggleQueryOpen,
    toggleQueryVisible,
    setZoomToSites
}