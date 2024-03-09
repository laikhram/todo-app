import { atom } from 'recoil';
import { TaskModel } from '../interfaces';

export const tasksState = atom({
    key: 'tasksState',
    default: [] as TaskModel[]
});

export const tasksDisplayState = atom({
    key: 'tasksDisplayState',
    default: [] as TaskModel[]
});

export const progressState = atom({
    key: 'progressState',
    default: 0
});

export const filterState = atom({
    key: 'filterState',
    default: 'all'
});
