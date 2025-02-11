import React, {useActionState} from 'react';
import {IUser} from "../../../shared/api";
import {DeleteUserAction} from "../actions";
import {Link} from "react-router-dom";


interface IUserCard {
    user: IUser,
    deleteUserAction: DeleteUserAction
}

const UserCard: React.FC<IUserCard> = ({user, deleteUserAction}) => {
    const [state, handleDelete, isPending] = useActionState(deleteUserAction, {});

    return (
        <div className={'border p-2 m-2 rounded bg-gray-100 flex gap-2'}>
            {user.email}
            <form action={handleDelete} className={'ml-auto'}>
                <input type="hidden" name={"id"} value={user.id}/>
                <Link to={`/${user.id}/tasks`}
                      className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ml-auto mr-4 disabled:bg-gray-400'}
                >
                    Tasks
                </Link>

                <button
                    className={'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto disabled:bg-gray-400'}
                    disabled={isPending}
                >
                    Delete
                    {state.error && <div className={'text-blue-900 text-xs'}>{state.error}</div>}
                </button>
            </form>
        </div>
    );
};

export default UserCard;
