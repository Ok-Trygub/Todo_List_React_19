import {startTransition, use, useOptimistic, useState} from "react";
import {fetchUsers, IUser} from "../../../shared/api";
import {createUserAction, deleteUserAction} from "../actions";


const receiveUsers = fetchUsers();

export const useUsers = () => {
    const [usersPromise, setUsersPromise] = useState<Promise<IUser[]>>(receiveUsers);

    const refetchUsers = (): void => {
        startTransition(() => setUsersPromise(fetchUsers()))
    }

    const [createdUsers, optimisticCreate] = useOptimistic(
        [] as IUser[],
        (createdUsers, user: IUser) => [...createdUsers, user]);


    const [deletedUsersIds, optimisticDelete] = useOptimistic(
        [] as string[],
        (deletedUsers, id: string) => deletedUsers.concat(id)
    );

    const useUsersList = () => {
        const users = use(usersPromise);
        return users.concat(createdUsers).filter(user => !deletedUsersIds.includes(user.id))
    }

    return {
        createUserAction: createUserAction({refetchUsers, optimisticCreate}),
        deleteUserAction: deleteUserAction({refetchUsers, optimisticDelete}),
        useUsersList
    }
}
