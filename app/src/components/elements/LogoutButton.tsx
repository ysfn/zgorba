import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { postQuery } from "../../lib/post-query";

export const LogoutButton = () => {
    const router = useRouter();
    const { isSuccess, mutate } = postQuery('/logout', {})
    
    const logout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        event.preventDefault();
        mutate();
    }

    useEffect(() => {
        //console.log('LogoutButton ' + isSuccess);
        if (isSuccess) {
            router.replace("/");
        }
    }, [isSuccess]);

    return (
        <React.Fragment>
            <button onClick={logout}>Logout</button>
        </React.Fragment>
    );
};