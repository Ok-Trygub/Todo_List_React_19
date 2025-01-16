import React, {Suspense} from 'react';
import UsersList from "..//Users/components/UsersList";
import CreateUserFormUseActionState
    from "./components/UserForms/CreateUserFormUseActionState/CreateUserFormUseActionState";
import {ErrorBoundary} from "react-error-boundary";
import {useUsers} from "./helpers/use-users";


const UsersPage: React.FC = () => {
    const {useUsersList, createUserAction, deleteUserAction} = useUsers();

    return (
        <main className={'container mx-auto p-4 pt-10 flex flex-col gap-4'}>
            <h1 className='text-3xl font-bold underline cursor-default mb-10'>Users</h1>
            <CreateUserFormUseActionState
            createUserAction={createUserAction}
            />
            <ErrorBoundary fallbackRender={(e) =>
                <div className={'text-red-500'}>{`Something went wrong: ${e.error}`}</div>}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <UsersList
                        useUsersList={useUsersList}
                        deleteUserAction={deleteUserAction}
                    />
                </Suspense>
            </ErrorBoundary>
        </main>
    );
};

export default UsersPage;
