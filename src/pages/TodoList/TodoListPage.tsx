import React, {startTransition, Suspense, useMemo, useState} from 'react';
import {ErrorBoundary} from "react-error-boundary";
import CreateTaskForm from "./components/CreateTaskForm";
import TasksList from "./components/TasksList";
import {useParams} from "react-router-dom";
import {fetchTasks} from "../../shared/api";
import Pagination from "../Users/components/Pagination";


const TodoListPage = () => {
    const {userId} = useParams();
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const getTasks = async ({page = 1, title = search}: {
        page?: number, title?: string
    }) => fetchTasks({filters: {userId, title}, page});

    const [paginatedTasksPromise, setPaginatedTasksPromise] = useState(getTasks({}));


    const tasksPromise = useMemo(() => paginatedTasksPromise.then(r => r.data), [paginatedTasksPromise]);

    const refetchTasks = (): void => {
        startTransition(() =>
            setPaginatedTasksPromise(getTasks({page})))
    }

    const onPageChange = (newPage: number) => {
        setPage(newPage);
        setPaginatedTasksPromise((getTasks({page: newPage})));
    }

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);

        startTransition(() => {
            setPaginatedTasksPromise(getTasks({title: e.target.value}))
        })
    }

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
                <select className={'border p-2 rounded'}>
                    <option value="all">New to Old</option>
                    <option value="completed">Old to New</option>
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
