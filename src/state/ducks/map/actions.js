import { createAction } from "redux-actions";
import types from "./types";

const deleteSite = createAction( types.SITE_DELETE, ( siteId ) => ({ siteId })  );
const didFetchIrData = createAction( types.IRDATA_DIDFETCH, ( geoJson ) => ({ geoJson })  );
const willFetchIrData = createAction( types.IRDATA_WILLFETCH );
const didFetchSites = createAction( types.SITES_DIDFETCH, ( sites ) => ({ sites }) );

export default {
    deleteSite,
    didFetchIrData,
    willFetchIrData,
    didFetchSites,
}