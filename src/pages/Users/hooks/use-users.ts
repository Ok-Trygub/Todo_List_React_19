import {use, useOptimistic} from "react";
import {IUser} from "../../../shared/api";
import {createUserAction, deleteUserAction} from "../actions";
import {useUsersGlobal} from "../../../entities/user";


export const useUsers = () => {
    const {refetchUsers, usersPromise} = useUsersGlobal();

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
