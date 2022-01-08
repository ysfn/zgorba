import { AUTH_ACTIONS, USER_ROLES } from "../lib/constants";
import { User } from "./User";

export interface AuthContextState {
    type:AUTH_ACTIONS,
    isAuthenticated: boolean,
    role: USER_ROLES,
    user: User | undefined
};

export interface AuthContextProducer<T> {
    state: T,
    dispatch: (value: T) => void | undefined;
};