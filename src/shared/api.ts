export interface IUser {
    id: string,
    email: string
}

export const fetchUsers = () => {
    return fetch("http://localhost:3001/users").then((resp) => resp.json() as Promise<IUser[]>)
}

export const createUser = (user: IUser): void => {
    fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
}

export const deleteUser = (userId: IUser): void => {
    fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
    }).then((res) => res.json())
}
