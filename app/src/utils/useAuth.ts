import { Reducer, useEffect, useMemo, useReducer } from "react";
import { useIsAuth } from "./useIsAuth";
import { AUTH_ACTIONS, USER_ROLES } from "../lib/constants";
import { defaultState } from "../lib/authContext";
import { AuthContextState } from "../interfaces/AuthContextTypes";

const UserReducer = (initialState: AuthContextState, action: AuthContextState) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            return {
                ...initialState,
                isAuthenticated: true,
                role: action.role,
                user: action.user
            };
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...initialState,
                ...defaultState
            };
        case AUTH_ACTIONS.FAIL:
            return {
                ...initialState,
                ...defaultState
            };
        default:
            throw new Error(`Reducer does not support the action type '${action.type}'!`);
    }
};

const useAuth = () => {
    const [state, dispatch] = useReducer<Reducer<AuthContextState, AuthContextState>>(UserReducer, defaultState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    const { user } = useIsAuth();

    useEffect(() => {
//        console.log('useAuth ' + JSON.stringify(user))
        user ? dispatch({ type: AUTH_ACTIONS.LOGIN, isAuthenticated: true, role: USER_ROLES['USER'], user: user })
            : dispatch({ type: AUTH_ACTIONS.LOGOUT, isAuthenticated: false, role: USER_ROLES['UNAUTHORIZED'], user: undefined })
    }, [user]);

    return value;
};

export default useAuth;