import { parse } from 'cookie';
import apiRoutes from "./api-routes";

const uri = apiRoutes.HOST;

const toJSON = (response: Response) => response.json();

const checkResponseStatus = (response: Response): Response => {
    console.info(response.url, response.status, response.ok)
    if ((response.status < 200 || response.status > 299)) {
        throwError(response);
    }
    return response;
};

const throwError = (response: Response) => {
    if (response.status == 401) {
        throw new Error(`Not authorized ${response.status}`)
    }
    throw new Error(`Response status was not ok!... ${response.statusText}`)
};

const handleError = (error: Error) => {
    console.log('There has been a problem with your fetch operation:', error.message);
    console.error(error.stack);
};

export const getFetcher = async (path: string): Promise<any> => {

    return await fetch(uri.concat(path), {
        mode: 'cors',
        credentials: 'include'
    }).then(res => {
        if (res.ok) {
            const data = res.json();
            return Promise.resolve(data);
        } else {
            return Promise.reject(undefined);
        }
    }).catch(err => err);

}

export const postFetcher = (path: string, data: any) => {
    const cookies = parse(document.cookie);
    return fetch(uri.concat(path), {
        method: "POST",
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'x-xsrf-token': cookies["XSRF-TOKEN"]
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                const data = res.json();
                return Promise.resolve(data);
            } else {
                return Promise.reject(res);
            }
        }).catch(err => err);
};
export const deleteFetcher = (path: string) => fetch(uri.concat(path), { method: 'DELETE' })
    .then(checkResponseStatus)
    .then(toJSON)
    .catch(handleError);

