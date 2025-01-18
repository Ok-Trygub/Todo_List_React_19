import React, {use} from "react";
import {useUsersGlobal} from "../../../entities/user";

const UserPreview: React.FC<{ userId: string | undefined}> = ({userId}) => {
    const {usersPromise} = useUsersGlobal();
    const users = use(usersPromise);

    return (
        <span>{users.find(user => user.id === userId)?.email}</span>
    )
}
export default UserPreview;
