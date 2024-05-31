// We can define a model as a class or as an interface.
// Classes are useful when you want to create multiple instaces of the same shape
// following a blueprint.
// We define and export the interface.
// We then define the propertis of the task.

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

// A type in TypeScript (made up)
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROFRESS',
    DONE = 'DONE',
}


