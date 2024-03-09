import { useRecoilState } from 'recoil';
import '../styles/index.scss';
import Task from './task';
import { filterState, tasksDisplayState, tasksState } from '../recoils';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAxiosPost } from '../hooks/useAxios';

function Tasks(props: { filter?: 'all' | 'done' | 'undone' }) {
    const [tasks, setTasks] = useRecoilState(tasksState);
    const [tasksDisplay, setTasksDisplay] = useRecoilState(tasksDisplayState);
    const [filter, setFilter] = useRecoilState(filterState);

    const [createTaskTitle, setCreateTaskTitle] = useState<string>('');

    const { response, error, loading, executePost } = useAxiosPost();

    const handleKeyDown = (event: any) => {
        if (createTaskTitle === '') return;

        if (event.code === 'Enter') {
            executePost(createTaskTitle);
        }
    }

    useEffect(() => {
        if (error) return;

        if (response) {
            setTasks([...tasks, response]);
            setCreateTaskTitle('');
        }
    }, [loading])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCreateTaskTitle(event.target.value);
    }

    useEffect(() => {
        console.log('testtsst', tasks)
    }, [tasks]);

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    }

    return (
        <div className="Tasks">
            <div className="header">
                <div className="title">Tasks</div>
                <div className="custom-select">
                    <select name="cars" onChange={handleSelect}>
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
                    <input type="text" value={createTaskTitle} id="title" name="title" placeholder="Add your todo..." onChange={handleChange} onKeyDown={handleKeyDown} />
                </div>
            </div>
        </div>
    );
}

export default Tasks;
