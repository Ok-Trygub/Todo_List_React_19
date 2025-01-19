import {useCallback, useRef} from "react";
import {fetchTasks} from "../../../shared/api";

interface IUseTasks {
    userId: string | undefined;
    search: string;
    createdAt: 'asc' | 'desc'
}


export const useTasks = ({userId, search, createdAt}: IUseTasks) => {
    const intervalRef = useRef<number | null>(null);

    const getTasks = useCallback(
        async ({
                   page = 1,
                   title = search,
                   createdAtSortNew = 'asc'
               }: {
            page?: number;
            title?: string;
            createdAtSortNew?: 'asc' | 'desc'
        }) =>
            fetchTasks({filters: {userId, title}, page, sort: {createdAt: createdAtSortNew}}),
        [userId, search]
    );

    const debounce = useCallback((func: (...args: any[]) => void, delay: number) => {
        return (...args: any[]) => {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
            }
            intervalRef.current = window.setTimeout(() => {
                func(...args);
            }, delay);
        };
    }, []);

    return {getTasks, debounce}
}
