import React, {useActionState, useOptimistic, useRef} from 'react';
import {CreateUserAction} from "../../../actions";

interface ICreateUserFormUseActionState {
    createUserAction: CreateUserAction
}

const CreateUserFormUseActionState: React.FC<ICreateUserFormUseActionState> = ({createUserAction}) => {
    const [state, handleCreateUser, isPending] = useActionState(createUserAction, {email: ''});
    const [optimisticState, setOptimisticState] = useOptimistic(state);
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form ref={formRef}
              action={(formData: FormData) => {
                  setOptimisticState({email: " "});
                  handleCreateUser(formData);
                  formRef.current?.reset();
              }}
              className={'flex gap-2'}>
            <input type="email"
                   disabled={isPending}
                   name={'email'}
                   className={'border p-2 rounded'}
                   defaultValue={optimisticState.email}
            />
            <button
                className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400'}
                disabled={isPending}
                type={"submit"}>
                {isPending ? "Adding..." : "Add"}
            </button>
            {optimisticState.error && <div className={'text-red-500'}>{optimisticState.error}</div>}
        </form>
    );
};

export default CreateUserFormUseActionState;
