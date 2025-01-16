import React, {useActionState} from 'react';
import {CreateUserAction} from "../../../helpers/actions";

interface ICreateUserFormUseActionState{
    createUserAction: CreateUserAction
}

const CreateUserFormUseActionState: React.FC<ICreateUserFormUseActionState> = ({createUserAction}) => {
    const [state, handleCreateUser, isPending] = useActionState(createUserAction, {email: ''});

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
