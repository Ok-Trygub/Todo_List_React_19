import React, {useState, Suspense} from 'react';
import UsersList from "..//Users/components/UsersList";
import CreateUserForm from "../../pages/Users/components/CreateUserForm";
import {fetchUsers, IUser} from "../../shared/api";


const UsersPage: React.FC = () => {
    const [usersPromise, setUsersPromise] = useState<Promise<IUser[]>>(fetchUsers());

    const refetchUsers = (): void => {
        setUsersPromise(fetchUsers())
    }

    return (
        <main className={'container mx-auto p-4 pt-10 flex flex-col gap-4'}>
            <h1 className='text-3xl font-bold underline cursor-default mb-10'>Users</h1>
            <CreateUserForm
                refetchUsers={refetchUsers}/>
            <Suspense>
                <UsersList
                    usersPromise={usersPromise}
                />
            </Suspense>

        </main>
    );
};

export default UsersPage;
