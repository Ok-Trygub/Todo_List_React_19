import React from 'react';
import {IUser} from "../../../shared/api";
import UserCard from './UserCard';
import {DeleteUserAction} from "../actions";

interface IUsersList {
    useUsersList: () => IUser[],
    deleteUserAction: DeleteUserAction
}

const UsersList: React.FC<IUsersList> = (
    {
        useUsersList,
        deleteUserAction
    }) => {
    const users = useUsersList();

    return (
        <div className={'flex flex-col'}>
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    deleteUserAction={deleteUserAction}
                />
            ))}
        </div>
    );
};

export default UsersList;
