import React from "react";
import apiRoutes from "../../lib/api-routes";

export const LoginButtons = () => {
    return (
        <React.Fragment>
            <div className="flex justify-end my-4">
                <ul className="flex">
                    <li className="mr-4">
                        <a href={apiRoutes.HOST + "/oauth2/authorization/google"}>Google</a>
                    </li>
                    <li>
                        <a href={apiRoutes.HOST + "/oauth2/authorization/github"}>Github</a>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};