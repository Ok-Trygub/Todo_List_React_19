import React, {use} from 'react';
import {IUser} from "../../../shared/api";
import UserCard from './UserCard';


const UsersList: React.FC<{ usersPromise: Promise<IUser[]>}> = ({usersPromise}) => {
    const users = use(usersPromise);
    console.log(users)

    return (
        <div className={'flex flex-col'}>
            {users.map(user => (
                <UserCard key={user.id} user={user}/>
            ))}
        </div>
    );
};

export default UsersList;
