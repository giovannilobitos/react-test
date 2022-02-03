import { useState, useEffect, useMemo } from "react"
import axios from 'axios';

const useDataQuery = () => {
    const [queryInfo, setQueryInfo] = useState({
        isLoading: false,
        data: null,
        error: null,
    });

    useEffect(() => {
        if (queryInfo.isLoading || queryInfo.data) {
            return;
        }

        (async () => {
            setQueryInfo((value) => {
                return {
                    ...value,
                    isLoading: true,
                };
            });

            const newQueryInfo = {
                isLoading: false,
                data: null,
                error: null,
            }

            try {
                const { data } = await axios.get('https://w4m9n4r9.stackpathcdn.com/frontend-test-data.json');
                newQueryInfo.data = data;
            } catch(error) {
                newQueryInfo.error = error;
            }

            setQueryInfo(newQueryInfo);
        })();
    }, [queryInfo.data, queryInfo.isLoading]);

    const { isLoading, data, error } = queryInfo;

    return useMemo(() => {
        return {
            isLoading,
            data,
            error,
        }
    }, [isLoading, data, error])
}

export default useDataQuery;
