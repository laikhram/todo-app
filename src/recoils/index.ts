import { atom } from 'recoil';
import { TaskModel } from '../interfaces';

export const tasksState = atom({
    key: 'tasksState',
    default: [] as TaskModel[]
});

export const filterState = atom({
    key: 'filterState',
    default: 'all'
});
