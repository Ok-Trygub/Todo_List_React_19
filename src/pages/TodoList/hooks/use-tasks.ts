import {startTransition, use, useOptimistic, useState} from "react";
import {fetchUsers, IUser} from "../../../shared/api";
import {createUserAction, deleteUserAction} from "../actions";


const receiveUsers = fetchUsers();

export const useTasks = () => {
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

    const useTasksList = () => {
        const users = use(usersPromise);
        return users.concat(createdUsers).filter(user => !deletedUsersIds.includes(user.id))
    }

    return {
        createTaskAction: createUserAction({refetchUsers, optimisticCreate}),
        deleteTaskAction: deleteUserAction({refetchUsers, optimisticDelete}),
        useTasksList
    }
}
