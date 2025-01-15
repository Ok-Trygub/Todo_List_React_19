import React, {useState, useTransition} from 'react';
import {createUser} from "../../../../../shared/api";


const CreateUserFormUseTransition: React.FC<{ refetchUsers: () => void }> = ({refetchUsers}) => {
    const [email, setEmail] = useState<string>('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!email.length) return;

        startTransition(async () => {
            await createUser({
                email,
                id: crypto.randomUUID()
            });

            startTransition(() => {
                refetchUsers();
                setEmail('');
            })
        });
    };

    return (
        <form onSubmit={handleSubmit}
              className={'flex gap-2'}>
            <input type="email"
                   disabled={isPending}
                   name={'email'}
                   onChange={(e) => setEmail(e.target.value)}
                   className={'border p-2 rounded'}
            />
            <button
                className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400'}
                disabled={isPending}
                type={"submit"}>
                {isPending ? "Adding..." : "Add"}
            </button>
        </form>
    );
};

export default CreateUserFormUseTransition;
