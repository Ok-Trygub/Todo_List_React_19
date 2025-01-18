import React, {Suspense, useActionState} from 'react';
import {ITask} from "../../../shared/api";
import {deleteTaskAction} from "../actions";
import UserPreview from "../../Users/components/UserPreview";


interface ITaskCard {
    task: ITask,
    refetchTasks: () => void
}

const UserCard: React.FC<ITaskCard> = ({task, refetchTasks}) => {
    const [state, handleDelete, isPending] = useActionState(deleteTaskAction({refetchTasks}), {})

    return (
        <div className={'border p-2 m-2 rounded bg-gray-100 flex gap-2'}>
            {task.title} -
            <Suspense fallback={<div>Loading...</div>}>
                <UserPreview userId={task.userId}/>
            </Suspense>
            <form className={'ml-auto'} action={handleDelete}>
                <input type="hidden" name={"id"} value={task.id}/>
                <button
                    className={'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto disabled:bg-gray-400'}
                    disabled={isPending}
                >
                    Delete
                    {state.error && <div className={'text-red-500'}>{state.error}</div>}
                </button>
            </form>
        </div>
    );
};

export default UserCard;
