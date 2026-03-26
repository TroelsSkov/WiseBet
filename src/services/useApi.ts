import { useState, useEffect, useCallback } from "react";
import { apiService } from "./apiService";

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useApi<T>(path: string): UseApiState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tick, setTick] = useState(0);

    const refetch = useCallback(() => setTick(n => n + 1), []);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        apiService
            .get<T>(path, { signal: controller.signal })
            .then(({ data, error }) => {
                if (error) setError(error);
                else setData(data);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [path, tick]);

    return { data, loading, error, refetch };
}