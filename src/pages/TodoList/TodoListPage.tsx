import React, {Suspense} from 'react';
import {ErrorBoundary} from "react-error-boundary";
import CreateTaskForm from "./components/CreateTaskForm";
import TasksList from "./components/TasksList";
import {useParams} from "react-router-dom";


const TodoListPage = () => {
    const {userId} = useParams();

    return (
        <main className={'container mx-auto p-4 pt-10 flex flex-col gap-4'}>
            <h1 className='text-3xl font-bold underline cursor-default mb-10'>
                Tasks for user: {userId}
            </h1>
            <CreateTaskForm/>
            <ErrorBoundary fallbackRender={(e) =>
                <div className={'text-red-500'}>{`Something went wrong: ${e.error}`}</div>}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <TasksList/>
                </Suspense>
            </ErrorBoundary>
        </main>
    );
};

export default TodoListPage;
