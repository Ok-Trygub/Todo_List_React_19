import React, {useState} from 'react';
import {createUser} from "../../../shared/api";


const CreateUserForm: React.FC<{ refetchUsers: () => void }> = ({refetchUsers}) => {
    const [email, setEmail] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent): Promise<any> => {
        e.preventDefault();

        if (email.length) {
            createUser({
                email,
                id: crypto.randomUUID()
            })

            await refetchUsers();
            setEmail('');
        }
    }

    return (
        <form onSubmit={handleSubmit}
              className={'flex gap-2'}>
            <input type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className={'border p-2 rounded'}
            />
            <button className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
                    type={"submit"}>
                Add
            </button>
        </form>
    );
};

export default CreateUserForm;
