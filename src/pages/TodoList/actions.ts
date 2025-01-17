import {createTask, deleteUser, ITask} from "../../shared/api";

type CreateTaskActionState = {
    error?: string,
    title: string
}

export type CreateTaskAction = (state: CreateTaskActionState, formData: FormData) => Promise<CreateTaskActionState>

export const createTaskAction =
    ({
         refetchTasks,
         userId
     }: {
        refetchTasks: () => void,
        userId: string | undefined
    }): CreateTaskAction =>
        async (_, formData) => {
            const title = formData.get('title') as string;

            try {
                const newTask: ITask = {
                    title,
                    createdAt: Date.now(),
                    done: 'false',
                    userId: userId ? userId : '',
                }

                await createTask(newTask);
                refetchTasks();
                return {
                    title: ''
                }
            } catch (e) {
                return {
                    error: 'Error while creating task',
                    title,
                };
            }
        }



type DeleteTaskActionState = {
    error?: string
}

export type DeleteTaskAction = (state: DeleteTaskActionState, formData: FormData) => Promise<DeleteTaskActionState>

export const deleteTaskAction =
    ({refetchTasks}: {
        refetchTasks: () => void,
    }): DeleteTaskAction =>
        async (state, formData) => {
            const id = formData.get('id') as string;
            try {
                await deleteUser(id);
                refetchTasks();
                return {}
            } catch (e) {
                return {
                    error: 'Error while deleting user'
                }
            }
        }
