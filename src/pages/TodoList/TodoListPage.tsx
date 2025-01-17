import React, {startTransition, Suspense, useMemo, useState} from 'react';
import {ErrorBoundary} from "react-error-boundary";
import CreateTaskForm from "./components/CreateTaskForm";
import TasksList from "./components/TasksList";
import {useParams} from "react-router-dom";
import {fetchTasks} from "../../shared/api";


const TodoListPage = () => {
    const {userId} = useParams();
    const [paginatedTasksPromise, setPaginatedTasksPromise] = useState(() => fetchTasks({filters: {userId}}));

    const tasksPromise = useMemo(() => paginatedTasksPromise.then(r => r.data), [paginatedTasksPromise]);

    const refetchTasks = (): void => {
        startTransition(() => setPaginatedTasksPromise(fetchTasks({filters: {userId}})))
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
            <ErrorBoundary fallbackRender={(e) =>
                <div className={'text-red-500'}>{`Something went wrong: ${e.error}`}</div>}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <TasksList
                        tasksPromise={tasksPromise}
                        refetchTasks={refetchTasks}
                    />
                </Suspense>
            </ErrorBoundary>
        </main>
    );
};

export default TodoListPage;
