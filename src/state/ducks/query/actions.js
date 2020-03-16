import { createAction } from "redux-actions";
import types from "./types";

const deleteQuery = createAction( types.QUERY_DELETE, ( query ) => ( { query }) );
const didRunQuery = createAction( types.QUERY_DIDRUN, ( query, results ) => ( { query, results }) );
const willRunQuery = createAction( types.QUERY_WILLRUN, ( query ) => ( { query }) );

export default {
    deleteQuery,
    didRunQuery,
    willRunQuery,
}