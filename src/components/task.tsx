import React, { ChangeEvent, useState } from 'react';
import '../styles/index.scss';
import { TaskModel } from '../interfaces';

function Task(props: { data: TaskModel }) {
    const { data } = props;
    const [isCompleted, setIsCompleted] = useState<boolean>(data.completed);

    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(event.target.checked);
    }

    return (
        <div className="Task">
            <label className="container">
                <input type="checkbox" defaultChecked={isCompleted} onChange={handleCheckbox} />
                <span className={"title " + (isCompleted ? 'disable' : '')}>{data.title}</span>
            </label>
            <div>🫣</div>
        </div>
    );
}

export default Task;
