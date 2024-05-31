import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid'; 
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    // The type of tasks is going to be a Task array.
    private tasks: Task[] = [];

    // A method to get all the tasks and then return it to whoever called the API.
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        // Define a temporary array to hold the result.
        // Here is a copy of the current tasks that we have.
        // We want to take this variable 'tasks' and manipulate it to filter out, 
        // or search for certain things and return the result.
        let tasks = this.getAllTasks();
        // If status is defined do something.
        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }
        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                    return false;
            });
        }
        return tasks;
    }

    // It's getting a task and it's going to return it.
    getTaskById(id: string): Task {
        const found = this.tasks.find((task) => task.id === id);

        if(!found) {
            // We can costomise it.
            throw new NotAcceptableException(`Task with ID "${id} not found"`);
        }

        return found;
    }

    // Defining a new method to create a task:
    // We add createTaskDto here with type CreateTaskDto.
    createTask(createTaskDto: CreateTaskDto): Task {
        // Here we use the destructuring syntax.
        const { title, description } = createTaskDto;
        // We create a task object.
        const task: Task = {
            id: uuidv4(), // Generate a unique ID for the task
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task); // Add the new task to the tasks array.
        return task; // Return the newly created task.
        // We return this task so that our controller could return it in the 
        // HTTP response.
    }

    deleteTask(id: string): void {
        // I want to filter these tasks and I want to keep all the tasks
        // that are no identical to the id that I am looking for.
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status; 
        return task;
    }
}
