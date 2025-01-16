import React from 'react';
import TaskCard from "./TaskCard";
import {ITask} from "../../../shared/api";

interface ITasksList {
    // useTasksList: () => ITask[],
    // deleteTaskAction: DeleteUserAction
}

const TasksList: React.FC<ITasksList> = ({}) => {
    const tasks = [] as ITask[];

    return (
        <div className={'flex flex-col'}>
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
};

export default TasksList;
