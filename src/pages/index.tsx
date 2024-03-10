import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Progress from '../components/progress';
import Tasks from '../components/tasks';
import { useAxiosGet } from '../hooks/useAxios';
import { tasksState } from '../recoils';
import '../styles/index.scss';

function Index() {
    const { response, error, loading } = useAxiosGet();
    const [tasks, setTasks] = useRecoilState(tasksState);

    const [message, setMessage] = useState('Loading');

    useEffect(() => {
        if (response) {
            setTasks(loading ? [] : response);
        } else if (error) {
            setMessage('Error')
        }
    }, [loading]);

    return (
        <div>
            {loading || error ?
                <div>{message}</div> :
                <div className="App">
                    <Progress />
                    <Tasks />
                </div>
            }
        </div>
    );
}

export default Index;
