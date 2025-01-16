import {createUser, deleteUser, IUser} from "../../shared/api";

type createTaskAction = {
    error?: string,
    email: string
}

export type CreateUserAction = (state: createTaskAction, formData: FormData) => Promise<createTaskAction>

export const createUserAction =
    ({refetchUsers, optimisticCreate}: {
        refetchUsers: () => void,
        optimisticCreate: (user: IUser) => void
    }): CreateUserAction =>
        async (_, formData) => {
            const email = formData.get('email') as string;

            if (email === 'admin@google.com') {
                return {
                    email,
                    error: "Admin email isn't allowed",
                };
            }

            try {
                const newUser = {
                    email,
                    id: crypto.randomUUID()
                }
                optimisticCreate(newUser);
                await createUser(newUser);

                refetchUsers();
                return {
                    email: ''
                }
            } catch (e) {
                return {
                    error: undefined,
                    email: '',
                };
            }
        }

type DeleteActionState = {
    error?: string
}

export type DeleteUserAction = (state: DeleteActionState, formData: FormData) => Promise<DeleteActionState>

export const deleteUserAction =
    ({refetchUsers, optimisticDelete}: {
        refetchUsers: () => void,
        optimisticDelete: (userId: string) => void
    }): DeleteUserAction =>
        async (state, formData) => {
            const id = formData.get('id') as string;
            try {
                optimisticDelete(id)
                await deleteUser(id);
                refetchUsers();
                return {}
            } catch (e) {
                return {
                    error: 'Error while deleting user'
                }
            }
        }
