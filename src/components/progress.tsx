import { useRecoilState } from 'recoil';
import '../styles/index.scss';
import { tasksState } from '../recoils';
import { useEffect, useState } from 'react';

function Progress() {
    const [tasks, setTasks] = useRecoilState(tasksState);

    const [progressCount, setProgressCount] = useState(0);

    useEffect(() => {
        setProgressCount(tasks.filter(task => task.completed === true).length || 0)
    }, [tasks]);

    return (
        <div className="Progress">
            <div className="title">Progress</div>
            <progress id="progress-bar" className="w3-round-xlarge" value={(progressCount * 100) / tasks.length} max="100" />
            <div className="status">{progressCount} completed</div>
        </div>
    );
}

export default Progress;
