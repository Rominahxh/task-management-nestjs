import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {
    // Two properties, two filter types.
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}
