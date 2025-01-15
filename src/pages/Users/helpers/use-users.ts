import {startTransition, useState} from "react";
import {fetchUsers, IUser} from "../../../shared/api";


const receiveUsers = fetchUsers();

export const useUsers = () => {
    const [usersPromise, setUsersPromise] = useState<Promise<IUser[]>>(receiveUsers);

    const refetchUsers = (): void => {
        startTransition(() => setUsersPromise(fetchUsers()))
    }

    return {usersPromise, refetchUsers}
}
