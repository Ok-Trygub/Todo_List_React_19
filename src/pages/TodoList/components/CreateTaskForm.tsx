import React, {useActionState} from 'react';
import {createTaskAction} from "../actions";


interface ICreateUserFormUseActionState {
    userId?: string,
    refetchTasks: () => void
}

const CreateTaskForm: React.FC<ICreateUserFormUseActionState> = ({userId, refetchTasks}) => {
    const [state, dispatch, isPending] = useActionState(createTaskAction({refetchTasks, userId}),
        {title: ''})

    return (
        <form className={'flex gap-2'} action={dispatch}>
            <input type="text"
                   name={'title'}
                   className={'border p-2 rounded'}
                   disabled={isPending}
                   defaultValue={state.title}
            />
            <button
                className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400'}
                type={"submit"}>
                Add
            </button>
            {state.error && <div className={'text-red-500'}>{state.error}</div>}
        </form>
    );
};

export default CreateTaskForm;
