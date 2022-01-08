import { createContext } from "react";
import { AuthContextState, AuthContextProducer } from "../interfaces/AuthContextTypes";
import { USER_ROLES, AUTH_ACTIONS } from "./constants";

export const { ...defaultState }: AuthContextState = {
    type: AUTH_ACTIONS.LOGOUT,
    isAuthenticated: false,
    role: USER_ROLES.UNAUTHORIZED,
    user: undefined
};

export const { dispatch }: AuthContextProducer<AuthContextState> = {
    state: defaultState,
    dispatch: (value: AuthContextState) => { }
};

const AuthContext = createContext<AuthContextProducer<AuthContextState>>({ state:defaultState, dispatch });
export default AuthContext;