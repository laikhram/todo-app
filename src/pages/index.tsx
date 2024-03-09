import { useEffect } from 'react';
import Progress from '../components/progress';
import Tasks from '../components/tasks';
import '../styles/index.scss';
import { useRecoilState } from 'recoil';
import { tasksState } from '../recoils';
import { useAxiosGet } from '../hooks/useAxios';
import { TaskModel } from '../interfaces';

function Index() {
    const { response, error, loading } = useAxiosGet();
    const [tasks, setTasks] = useRecoilState(tasksState);

    useEffect(() => {
        if (response) {
            setTasks(loading ? [] : response);
        }
    }, [loading]);

    return (
        <div>
            {loading ?
                'Loading' :
                <div className="App">
                    <Progress />
                    <Tasks />
                </div>
            }
        </div>
    );
}

export default Index;
