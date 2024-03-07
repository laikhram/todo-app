import { useRecoilState } from 'recoil';
import '../styles/index.scss';
import Task from './task';
import { tasksState } from '../recoils';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAxiosPost } from '../hooks/useAxios';

function Tasks(props: { filter?: 'all' | 'done' | 'undone' }) {
    const [tasks, setTasks] = useRecoilState(tasksState);
    const [filter, setFilter] = useState<string>('all');
    const [createTaskTitle, setCreateTaskTitle] = useState<string>('');

    // const { response, error, loading, operation } = useAxiosPost();

    const handleKeyDown = (event: any) => {
        if (event.code === 'Enter') {
            // operation({ title: createTaskTitle });
            setCreateTaskTitle('');
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCreateTaskTitle(event.target.title);
    }

    useEffect(() => {

    }, [props.filter]);

    return (
        <div className="Tasks">
            <div className="header">
                <div className="title">Tasks</div>
                <div className="custom-select">
                    <select name="cars" id="cars">
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="undone">Undone</option>
                    </select>
                </div>
            </div>

            <div className="task">
                {tasks.map(task =>
                    <Task data={task} />
                )}

                <div className="Task">
                    <input type="text" id="title" name="title" placeholder="Add your todo..." onChange={handleChange} onKeyDown={handleKeyDown} />
                </div>
            </div>
        </div>
    );
}

export default Tasks;
