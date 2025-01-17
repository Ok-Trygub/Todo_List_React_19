import React, {createContext, startTransition, use, useState} from "react";
import {fetchUsers, IUser} from "../../shared/api";

export type UsersContextType = {
    users: Promise<IUser[]>,
    refetchUsers: () => void
}

export const UsersContext = createContext<UsersContextType | null>(null)

const receiveUsers = fetchUsers();

export const usersProvider = ({children}: { children: React.ReactNode }) => {
    const [usersPromise, setUsersPromise] = useState<Promise<IUser[]>>(receiveUsers);

    const refetchUsers = (): void => {
        startTransition(() => setUsersPromise(fetchUsers()))
    }

    return (
        <UsersContext value={{users: usersPromise, refetchUsers}}>
            {children}
        </UsersContext>
    )
}

const useUsers = () => {
    const context = use(UsersContext)
    if (!context) {
        throw new Error("useUsers must be use within a UserProvider")
    } else {
        return context
    }
}
