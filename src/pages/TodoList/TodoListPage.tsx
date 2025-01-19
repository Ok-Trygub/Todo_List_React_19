import React, {startTransition, Suspense, useCallback, useMemo, useRef, useState} from 'react';
import {ErrorBoundary} from "react-error-boundary";
import CreateTaskForm from "./components/CreateTaskForm";
import TasksList from "./components/TasksList";
import {useParams} from "react-router-dom";
import Pagination from "../Users/components/Pagination";
import {useTasks} from "./hooks/useTasks";


const TodoListPage = () => {
    const {userId} = useParams();
    const [search, setSearch] = useState<string>('');
    const [createdAtSort, setCreatedAtSort] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState<number>(1);
    const {getTasks, debounce} = useTasks({userId, search, createdAt: createdAtSort});

    const [paginatedTasksPromise, setPaginatedTasksPromise] = useState(() => getTasks({}));
    const tasksPromise = useMemo(() => paginatedTasksPromise.then((r) => r.data), [paginatedTasksPromise]);

    const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCreatedAtSort(e.target.value as 'asc' | 'desc');
        startTransition(() => setPaginatedTasksPromise(getTasks({createdAtSortNew: e.target.value as 'asc' | 'desc'})));
    }

    const refetchTasks = useCallback(() => {
        startTransition(() => setPaginatedTasksPromise(getTasks({page})));
    }, [getTasks, page]);


    const onPageChange = useCallback(
        (newPage: number) => {
            setPage(newPage);
            setPaginatedTasksPromise(getTasks({page: newPage}));
        },
        [getTasks]
    );


    const fetchTasksForSearch = useCallback(
        (title: string) => {
            startTransition(() => {
                setPaginatedTasksPromise(getTasks({title, page: 1}));
                setPage(1);
            });
        },
        [getTasks]
    );

    const debouncedFetchTasks = useMemo(() => debounce(fetchTasksForSearch, 1000), [debounce, fetchTasksForSearch]);

    const handleChangeSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearch(value);
            debouncedFetchTasks(value);
        },
        [debouncedFetchTasks]
    );


    return (
        <main className={'container mx-auto p-4 pt-10 flex flex-col gap-4'}>
            <h1 className='text-3xl font-bold underline cursor-default mb-10'>
                Tasks for user: {userId}
            </h1>
            <CreateTaskForm
                userId={userId}
                refetchTasks={refetchTasks}
            />

            <div className={'flex gap-2'}>
                <input
                    type="text"
                    placeholder={'Search'}
                    className={'border p-2 rounded'}
                    value={search}
                    onChange={handleChangeSearch}
                />
                <select className={'border p-2 rounded'} onChange={(e) => handleChangeSort(e)}>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
            </div>

            <ErrorBoundary fallbackRender={(e) =>
                <div className={'text-red-500'}>{`Something went wrong: ${e.error}`}</div>}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <TasksList
                        tasksPromise={tasksPromise}
                        refetchTasks={refetchTasks}
                    />

                    <Pagination
                        tasksPaginated={paginatedTasksPromise}
                        page={1}
                        onChangePage={onPageChange}
                    />
                </Suspense>
            </ErrorBoundary>
        </main>
    );
};

export default TodoListPage;
