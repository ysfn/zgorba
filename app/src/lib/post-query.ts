import { useMutation } from "react-query";
import { postFetcher } from "./fetcher";

const postQuery = (path: string, data: any) => {
    return useMutation(path, () => postFetcher(path, data));
};

export { postQuery };