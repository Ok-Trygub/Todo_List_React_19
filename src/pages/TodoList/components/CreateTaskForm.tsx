import React from 'react';


interface ICreateUserFormUseActionState {
}

const CreateTaskForm: React.FC<ICreateUserFormUseActionState> = ({}) => {
    return (
        <form className={'flex gap-2'}>
            <input type="email"
                   name={'email'}
                   className={'border p-2 rounded'}
            />
            <button
                className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400'}
                type={"submit"}>
                Add
            </button>
            <div className={'text-red-500'}>Error!</div>
        </form>
    );
};

export default CreateTaskForm;
