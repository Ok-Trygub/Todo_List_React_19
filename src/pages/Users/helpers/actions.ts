import {createUser, deleteUser} from "../../../shared/api";

type CreateActionState = {
    error?: string,
    email: string
}

export const createUserAction =
    ({refetchUsers}: { refetchUsers: () => void }) =>
        async (
            prevState: CreateActionState,
            formData: FormData
        ): Promise<CreateActionState> => {
            const email = formData.get('email') as string;

            if (email === 'admin@google.com') {
                return {
                    email,
                    error: "Admin email isn't allowed",
                };
            }

            try {
                await createUser({
                    email,
                    id: crypto.randomUUID()
                })

                refetchUsers();
                return {
                    email: ''
                }
            } catch (e) {
                return {
                    ...prevState,
                    error: undefined,
                    email: '',
                };
            }
        }

type DeleteActionState = {
    error?: string
}
export const deleteUserAction =
    ({refetchUsers, id}: { refetchUsers: () => void, id: string }) =>
        async (): Promise<DeleteActionState> => {
            try {
                await deleteUser(id);
                refetchUsers();
                return {}
            } catch (e) {
                return {
                    error: 'Error while deleting user'
                }
            }
        }
