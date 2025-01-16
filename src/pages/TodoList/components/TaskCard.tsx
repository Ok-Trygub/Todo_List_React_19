import React from 'react';
import {ITask} from "../../../shared/api";


interface ITaskCard {
    task: ITask,
}

const UserCard: React.FC<ITaskCard> = ({task}) => {

    return (
        <div className={'border p-2 m-2 rounded bg-gray-100 flex gap-2'}>
            {task.title}
            <form className={'ml-auto'}>
                <input type="hidden" name={"id"} value={task.id}/>
                <button
                    className={'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto disabled:bg-gray-400'}
                >
                    Delete
                </button>
            </form>
        </div>
    );
};

export default UserCard;
