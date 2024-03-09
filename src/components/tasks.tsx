import { useRecoilState } from 'recoil';
import '../styles/index.scss';
import Task from './task';
import { filterState, tasksState } from '../recoils';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAxiosPost } from '../hooks/useAxios';
import { TaskModel } from '../interfaces';

function Tasks(props: { filter?: 'all' | 'done' | 'undone' }) {
    const [tasks, setTasks] = useRecoilState(tasksState);
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

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    }

    const [tasksLocal, setTasksLocal] = useState<TaskModel[]>([]);

    useEffect(() => {
        let tasksFilter = tasks;

        if (filter === 'done') {
            tasksFilter = tasks.filter((task: TaskModel) => task.completed === true)
        } else if (filter === 'undone') {
            tasksFilter = tasks.filter((task: TaskModel) => task.completed === false)
        }

        setTasksLocal(tasksFilter);
    }, [tasks, filter])

    const TaskGenerator = () => {
        return <div>{tasksLocal.map(task => <Task data={task} />)}</div>
    }

    return (
        <div className="Tasks">
            <div className="header">
                <div className="title">Tasks</div>
                <div className="custom-select" style={{ width: '200px' }}>
                    <select className="filter" onChange={handleSelect}>
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="undone">Undone</option>
                    </select>
                </div>
            </div>

            <div className="task">
                <TaskGenerator />

                <div className="Task">
                    <input type="text" value={createTaskTitle} id="title" name="title" placeholder="Add your todo..." onChange={handleChange} onKeyDown={handleKeyDown} />
                </div>
            </div>
        </div>
    );
}

export default Tasks;
