import { format } from "date-fns";

import { getAllTasks, getTasksToday, insertTask } from "../repositories/task.repository";

export interface Task {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    description: string;
    location: string;
    created_at: Date;
}
export interface AgendaSection {
    title: string;
    data: AgendaItem[];
}

export interface AgendaItem {
    title: string;
    hour: string;
    duration?: string;
    itemCustomHeightType?: string;
    id?: number;
    location?: string;
}


export async function getTasks(): Promise<AgendaSection[]> {
    try {
        const tasks = await getAllTasks();
        console.log("Fetched getTasks:",);

        const grouped: { [date: string]: AgendaItem[] } = {};

        tasks.forEach((task) => {
            console.log("Fetched forEach:", task);

            const dateKey = format(new Date(task.startTime), "yyyy-MM-dd");
            const hour = format(new Date(task.startTime), "haaa").toLowerCase(); // e.g. "11pm"

            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }

            grouped[dateKey].push({
                id: task.id,
                title: task.title,
                hour,
                duration: "1h", // you can calculate this from start/end if needed
                location: task.location,
            });
        });

        const sections: AgendaSection[] = Object.keys(grouped).map((date) => ({
            title: date,
            data: grouped[date],
        }));

        return sections;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export async function getTasksForToday() {
    try {

        console.error("getTasksForToday");
        const tasksToday = await getTasksToday();
        return tasksToday;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export async function createTask(taskData: Omit<Task, 'id'>): Promise<Task> {
    try {
        console.log('createTask SERVICE: ', taskData)
        const insertId = await insertTask(taskData);
        return {
            id: insertId,
            ...taskData,
            created_at: new Date(),
        };
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}
