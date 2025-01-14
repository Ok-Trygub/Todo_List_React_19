import React from 'react';
import {IUser} from "../../../shared/api";


const UserCard: React.FC<{ user: IUser }> = ({user}) => {
    const handleDeleteUser = (userId: string): void => {
        // const updatedUsersArr = users.filter(user => user.id !== userId);
        // setUsers(updatedUsersArr);
    }

    return (
        <div className={'border p-2 m-2 rounded bg-gray-100 flex gap-2'}>
            {user.email}

            <button
                className={'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto'}
                type={'button'}
                onClick={() => handleDeleteUser(user.id)}>
                Delete
            </button>
        </div>
    );
};

export default UserCard;
