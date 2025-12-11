import { useCallback, useEffect, useState } from "react";

export type TAxiosResponse<T> = Axios.IPromise<Axios.AxiosXHR<T>>;
export interface IGetRequestHook<T> {
    data: T,
    loading: boolean,
    error: string | null,

    retryFn: () => void
}

export function useGetRequest<T>(fetchFn: () => TAxiosResponse<T>, defaultValue: any, callOnAwake: boolean = false): IGetRequestHook<T> {
    const [data, setData] = useState<T>(defaultValue);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const callback = useCallback(() => {
        setIsLoading(true);
        setError(null);

        fetchFn()
            .then(res => {
                setData((res as any).data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err);
            })
    }, []);

    useEffect(() => {
        if(callOnAwake)
            callback();
        else
            setIsLoading(false);
    }, []);

    return { data, loading, error, retryFn: callback };
}