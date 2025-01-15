import React, {useActionState} from 'react';
import {createUserAction} from "../../../helpers/actions";


const CreateUserFormUseActionState: React.FC<{ refetchUsers: () => void }> = ({refetchUsers}) => {
    const [state, handleCreateUser, isPending] = useActionState(
        createUserAction({refetchUsers}),
        {email: ''}
    );

    return (
        <form action={handleCreateUser}
              className={'flex gap-2'}>
            <input type="email"
                   disabled={isPending}
                   name={'email'}
                   className={'border p-2 rounded'}
                   defaultValue={state.email}
            />
            <button
                className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400'}
                disabled={isPending}
                type={"submit"}>
                {isPending ? "Adding..." : "Add"}
            </button>
            {state.error && <div className={'text-red-500'}>{state.error}</div>}
        </form>
    );
};

export default CreateUserFormUseActionState;
