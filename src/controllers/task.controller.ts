import { Request, Response } from "express";

import * as taskService from '../services/task.service';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await taskService.getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
};


export const getTasksToday = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await taskService.getTasksForToday();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
};
