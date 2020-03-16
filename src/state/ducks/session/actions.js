import { createAction } from "redux-actions";
import types from "./types";

const signIn = createAction( types.USER_SIGNIN );
const signOut = createAction( types.USER_SIGNOUT );

export default {
    signIn,
    signOut,
}