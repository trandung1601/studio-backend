import { getAllTasks } from "../repositories/task.repository";

export async function getTasks() {
    try {
        const tasks = await getAllTasks();
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error; // Re-throw the error for further handling
    }
}