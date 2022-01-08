import React from "react";
import { User } from "../../interfaces/User";

export const UserInfo = ({ user }: { user: User }) => {
    return (
        <ul className="divide-y divide-gray-200 mr-4">
            <li key={user.email} className="py-4 flex">
                <img className="h-10 w-10 rounded-full" src={user.pictureUrl} alt="userIcon" />
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
            </li>
        </ul>
    );
};