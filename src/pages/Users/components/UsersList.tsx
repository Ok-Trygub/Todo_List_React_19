import React, {use} from 'react';
import {IUser} from "../../../shared/api";
import UserCard from './UserCard';

interface IUsersList {
    usersPromise: Promise<IUser[]>,
    refetchUsers: () => void
}

const UsersList: React.FC<IUsersList> = ({usersPromise, refetchUsers}) => {
    const users = use(usersPromise);

    return (
        <div className={'flex flex-col'}>
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    refetchUsers={refetchUsers}
                />
            ))}
        </div>
    );
};

export default UsersList;
