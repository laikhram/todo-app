import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { TaskModel } from '../interfaces';
import { tasksState } from '../recoils';
import Progress from './progress';

describe('Progress component', () => {
    it('displays progress bar with correct value and status', () => {
        const tasksStateMock = [
            { id: '1', title: 'Task 1', completed: true },
            { id: '2', title: 'Task 2', completed: false },
            { id: '3', title: 'Task 3', completed: true },
        ];

        render(
            <RecoilRoot initializeState={({ set }) => set(tasksState, tasksStateMock)}>
                <Progress />
            </RecoilRoot>
        );

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveAttribute('value', '66.66666666666667');

        const statusText = screen.getByText('2 completed');
        expect(statusText).toBeInTheDocument();
    });

    it('displays progress bar with 0% when there are no tasks', () => {
        const tasksStateMock: TaskModel[] = [];

        render(
            <RecoilRoot initializeState={({ set }) => set(tasksState, tasksStateMock)}>
                <Progress />
            </RecoilRoot>
        );

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveAttribute('value', 'NaN');

        const statusText = screen.getByText('0 completed');
        expect(statusText).toBeInTheDocument();
    });
});