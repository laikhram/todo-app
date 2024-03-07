import { useEffect } from 'react';
import Progress from '../components/progress';
import Tasks from '../components/tasks';
import '../styles/index.scss';
import { useRecoilState } from 'recoil';
import { tasksState } from '../recoils';
import { useAxiosGet } from '../hooks/useAxios';

function Index() {
    const { response, error, loading } = useAxiosGet();
    const [tasks, setTasks] = useRecoilState(tasksState);

    useEffect(() => {
        loading ? '' : setTasks(response ? response : []);
        console.log('response', response);
    }, [loading]);

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
