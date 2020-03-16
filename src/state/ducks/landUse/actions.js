import { createAction } from "redux-actions";
import types from "./types";

const clearLandUse = createAction( types.LANDUSE_CLEAR );
const didFetchLandUse = createAction( types.LANDUSE_DIDFETCH, ( landUse ) => ( { landUse }) );
const willFetchLandUse = createAction( types.LANDUSE_WILLFETCH, ( landUseId ) => ( { landUseId }) );

export default {
    clearLandUse,
    didFetchLandUse,
    willFetchLandUse,
}