export interface IUser {
    id: string,
    email: string
}

export interface ITask {
    id?: string,
    userId: string,
    title: string,
    done: string,
    createdAt: number
}

interface IGetTasks {
    page?: number,
    perPage?: number,
    query?: string,
    sort?: {
        createdAt: "asc" | "desc"
    },
    filters?: {
        userId: string | undefined,
        title?: string
    }
}

export type PaginatedResponse<T> = {
    first: 1,
    prev: null,
    next: null,
    last: 0,
    pages: 0,
    items: 0,
    data: []
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchUsers = async () => {
    await sleep(1000)
    return fetch("http://localhost:3001/users").then((resp) => resp.json() as Promise<IUser[]>)
}

export const createUser = (user: IUser): Promise<IUser> => {
    return fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
}

export const deleteUser = (userId: string) => {
    return fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
    }).then((res) => res.json())
}


export const fetchTasks = (
    {
        page = 1,
        perPage = 10,
        sort = {createdAt: "asc"},
        filters
    }: IGetTasks): Promise<PaginatedResponse<ITask>> => {
    return fetch(
        `http://localhost:3001/tasks?_page=${page}&_per_page=${perPage}&sort=${sort.createdAt === "asc" ?
            "createdAt" : "-createdAt"}&userId=${filters?.userId}&title=${filters?.title}`
    ).then((resp) => resp.json())
}

export const createTask = (task: ITask): Promise<ITask> => {
    return fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task),
    }).then((res) => res.json())
}

export const updateTask = (id: string, task: Partial<ITask>): Promise<ITask> => {
    return fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task),
    }).then((res) => res.json())
}

export const deleteTask = (id: string) => {
    return fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE"
    }).then((res) => res.json())
}
