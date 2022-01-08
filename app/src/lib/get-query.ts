import { useQuery } from "react-query";
import { getFetcher } from "./fetcher";

const getQuery = <T>(path: string, ready: boolean = false) => {
    return useQuery<T>(path, () => getFetcher(path), {
        enabled: ready,
        retry:false,
    });
};

export { getQuery };