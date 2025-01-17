import React, {use} from 'react';
import TaskCard from "./TaskCard";
import {ITask} from "../../../shared/api";

interface ITasksList {
    tasksPromise: Promise<ITask[]>,
    refetchTasks: () => void
}

const TasksList: React.FC<ITasksList> = ({tasksPromise, refetchTasks}) => {
    const tasks = use(tasksPromise);


    return (
        <div className={'flex flex-col'}>
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    refetchTasks={refetchTasks}
                />
            ))}
        </div>
    );
};

export default TasksList;
