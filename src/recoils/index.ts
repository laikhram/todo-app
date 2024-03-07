import { atom } from 'recoil';
import { TaskModel } from '../interfaces';

export const tasksState = atom({
    key: 'tasksState',
    default: [] as TaskModel[]
});