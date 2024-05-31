import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class UpdateTaskStatusDto {
    // This decorator validates if task status is one of the values we wrote.
    @IsEnum(TaskStatus)
    status: TaskStatus;
}

