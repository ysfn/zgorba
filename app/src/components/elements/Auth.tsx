import React from 'react';
import AuthContext from '../../lib/authContext';
import { LoginButtons } from './LoginButtons';
import { LogoutButton } from './LogoutButton';
import { UserInfo } from './UserInfo';

export const Auth = () => {
    const { state, dispatch } = React.useContext(AuthContext);
    return (
        state.isAuthenticated && state.user ?
            <div className="flex justify-end">
                <UserInfo user={state.user} />
                <LogoutButton />
            </div>
            :
            <LoginButtons />
    )
}