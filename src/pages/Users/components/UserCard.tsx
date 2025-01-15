import React, {useActionState} from 'react';
import {IUser} from "../../../shared/api";
import {deleteUserAction} from "../helpers/actions";


interface IUserCard {
    user: IUser,
    refetchUsers: () => void
}

const UserCard: React.FC<IUserCard> = ({user, refetchUsers}) => {
    const [state, handleDelete, isPending] = useActionState(
        deleteUserAction({id: user.id, refetchUsers}),
        {}
    );

    return (
        <div className={'border p-2 m-2 rounded bg-gray-100 flex gap-2'}>
            {user.email}
            <form action={handleDelete} className={'ml-auto'}>
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
