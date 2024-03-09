import React, { ChangeEvent, useEffect, useState } from 'react';
import '../styles/index.scss';
import { TaskModel } from '../interfaces';
import { useAxiosDelete, useAxiosPut } from '../hooks/useAxios';
import { useRecoilState } from 'recoil';
import { tasksState } from '../recoils';

function Task(props: { data: TaskModel }) {
    const { data } = props;

    const [tasks, setTasks] = useRecoilState(tasksState);

    const [isCompleted, setIsCompleted] = useState<boolean>(data.completed);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const useAxiosPutCheckbox = useAxiosPut();
    const useAxiosPutSave = useAxiosPut();
    const useAxiosDeleteHook = useAxiosDelete();

    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        useAxiosPutCheckbox.execute(data.id, {
            title: data.title,
            completed: event.target.checked
        });
        setIsCompleted(event.target.checked);
    }

    useEffect(() => {
        if (useAxiosPutCheckbox.error) return;

        if (!useAxiosPutCheckbox.loading && useAxiosPutCheckbox.response) {
            const newTasks = [...tasks];
            const taskTarget = tasks.findIndex(task => task.id === data.id);

            newTasks[taskTarget] = useAxiosPutCheckbox.response as TaskModel
            setTasks([...newTasks]);
        }
    }, [useAxiosPutCheckbox.response])

    const handleSave = () => {
        useAxiosPutSave.execute(data.id, {
            title,
            completed: isCompleted
        });

        setIsEdit(false);
    }

    useEffect(() => {
        if (useAxiosPutSave.error) return;

        if (!useAxiosPutSave.loading && useAxiosPutSave.response && !isEdit) {
            const newTasks = [...tasks];
            const taskTarget = tasks.findIndex(task => task.id === data.id);

            newTasks[taskTarget] = useAxiosPutSave.response as TaskModel
            setTasks(newTasks);
        }
    }, [useAxiosPutSave.response])

    const [title, setTitle] = useState<string>(data.title);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleEdit = () => {
        setIsEdit(true);
    }

    const handleDelete = () => {
        useAxiosDeleteHook.execute(data.id);
        setTasks(tasks.filter(task => task.id !== data.id));
    }

    return (
        <div className="Task">
            {!isEdit ?
                <div className="non-edit-mode">
                    <label className="container">
                        <input type="checkbox" defaultChecked={isCompleted} onChange={handleCheckbox} />
                        <span className={"title " + (isCompleted ? 'disable' : '')}>{title}</span>
                    </label>
                    <div className="dropdown">
                        <button className="dropbtn dots">...</button>
                        <div className="dropdown-content">
                            <a className="edit" onClick={handleEdit}>Edit</a>
                            <a className="delete" onClick={handleDelete}>Delete</a>
                        </div>
                    </div>
                </div>
                :
                <div className="edit-mode">
                    <input type="text" defaultValue={title} id="title" name="title" placeholder="Change your todo..." onChange={handleChange} />
                    <button className="save-btn" onClick={handleSave}>Save</button>
                </div>
            }
        </div>
    );
}

export default Task;
