import React, {createContext, startTransition, use, useState} from "react";
import {fetchUsers, IUser} from "../shared/api";

type UsersContextType = {
    usersPromise: Promise<IUser[]>,
    refetchUsers: () => void
}

const UsersContext = createContext<UsersContextType | null>(null)

const receiveUsers = fetchUsers();

export const UsersProvider = ({children}: { children: React.ReactNode }) => {
    const [usersPromise, setUsersPromise] = useState<Promise<IUser[]>>(receiveUsers);

    const refetchUsers = (): void => {
        startTransition(() => setUsersPromise(fetchUsers()))
    }

    return (
        <UsersContext value={{usersPromise, refetchUsers}}>
            {children}
        </UsersContext>
    )
}

export const useUsersGlobal = () => {
    const context = use(UsersContext)
    if (!context) {
        throw new Error("useUsers must be use within a UserProvider")
    } else {
        return context
    }
}
