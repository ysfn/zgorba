import React, { useEffect, useState } from 'react';

interface User {
    name: string,
    email: string,
    pictureUrl: string
}

const host = "http://localhost:8080";

export const Header = () => {
    const [user, setUser] = useState<User>();
    const logout = () => {
        postData(host + '/logout')
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }
    useEffect(() => {
        const u = getUser().then(u => setUser(u));
    }, []);

    return (
        user ?
            (<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", width: "min-content", margin: "0.5em 0", alignItems: 'center' }}>
                    <img src={user.pictureUrl} style={{ borderRadius: "50%", height: "40px", width: "40px" }} ></img>
                    <div style={{ margin: "auto 1em" }}>
                        <p style={{ margin: "5px auto" }}>{user.name}</p>
                        <p style={{ margin: "5px auto", fontSize: '0.85em' }}>{user.email}</p>
                    </div>
                </div>
                <button onClick={logout} style={{ backgroundColor: 'transparent', border: "1px solid", margin: '0 1em', padding: '0.3em', borderRadius: '0.25em' }}>Logout</button>
            </div>)
            :
            (<div style={{ display: "flex", justifyContent: "flex-end", margin: "0.5em 0" }}>
                <ul style={{ listStyle: 'none', paddingInlineStart: 0, display: 'flex', margin: 0, alignItems: 'center' }}>
                    <li style={{ border: "1px solid", margin: '0 1em', padding: '0.3em', borderRadius: '0.25em' }}>
                        <a href={host + "/oauth2/authorization/google"}>Google</a>
                    </li>
                    <li style={{ border: "1px solid", margin: '0 1em', padding: '0.3em', borderRadius: '0.25em' }}>
                        <a href={host + "/oauth2/authorization/github"}>Github</a>
                    </li>
                </ul>
            </div>)
    );
}

async function getUser() {
    const user: User = await fetch(host + '/user', {
        mode: 'cors',
        credentials: 'include'
    }).then(response => response.json())
        .catch(error => {
            //console.error('Error:', error);
        });
    return user;
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include',
        headers: {
            //'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http:localhost:8080,http:localhost:3000',
            'x-xsrf-token': document.cookie.valueOf("XSRF-TOKEN").replace("XSRF-TOKEN=", "")
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
