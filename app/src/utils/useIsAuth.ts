import { useEffect, useState } from "react";
import { getQuery } from "../lib/get-query";
import { User } from "../interfaces/User";

export const useIsAuth = () => {
    const { data: principal } = getQuery<User>('/user', true);
    const [user, setUser] = useState<User>();
    useEffect(() => {
       // console.log('useIsAuth ' +JSON.stringify(principal));
        setUser(principal);
    }, [principal]);
    return { user };
};