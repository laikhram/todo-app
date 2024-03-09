import { useEffect } from 'react';
import Progress from '../components/progress';
import Tasks from '../components/tasks';
import '../styles/index.scss';
import { useRecoilState } from 'recoil';
import { filterState, tasksDisplayState, tasksState } from '../recoils';
import { useAxiosGet } from '../hooks/useAxios';
import { TaskModel } from '../interfaces';

function Index() {
    const { response, error, loading } = useAxiosGet();
    const [tasks, setTasks] = useRecoilState(tasksState);
    const [tasksDisplay, setTasksDisplay] = useRecoilState(tasksDisplayState);
    const [filter, setFilter] = useRecoilState(filterState);

    useEffect(() => {
        if (response) {
            let tasksFilter = loading ? [] : response;

            if (filter === 'done') {
                tasksFilter = tasksFilter.filter((task: TaskModel) => task.completed === true)
            } else if (filter === 'undone') {
                tasksFilter = tasksFilter.filter((task: TaskModel) => task.completed === false)
            }

            setTasks(tasksFilter);
        }
    }, [loading, filter]);

    return (
        <div className="App">
            {loading ?
                'Loading' :
                <div>
                    <Progress />
                    <Tasks />
                </div>
            }
        </div>
    );
}

export default Index;
