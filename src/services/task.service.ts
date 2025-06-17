import { format } from "date-fns";

import { getAllTasks, getTasksToday } from "../repositories/task.repository";

export interface Task {
    id: number;
    title: string;
    start: string; // ISO date string
    end: string;
    description: string;
    location: string;
}
export interface AgendaSection {
    title: string; // 'YYYY-MM-DD'
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

        const grouped: { [date: string]: AgendaItem[] } = {};

        tasks.forEach((task) => {
            const dateKey = format(new Date(task.start), "yyyy-MM-dd");
            const hour = format(new Date(task.start), "haaa").toLowerCase(); // e.g. "11pm"

            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }

            grouped[dateKey].push({
                id: task.id,
                title: task.title,
                hour,
                duration: "1h", // you can calculate this from start/end if needed
                itemCustomHeightType: "LongEvent", // customize based on rules
                location: task.location,
            });
        });

        const sections: AgendaSection[] = Object.keys(grouped).map((date) => ({
            title: date,
            data: grouped[date],
        }));

        console.log("Transformed Agenda Sections:", sections);
        return sections;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export async function getTasksForToday() {
    try {
        const tasksToday = await getTasksToday();
        return tasksToday;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}