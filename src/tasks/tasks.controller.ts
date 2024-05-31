// We import all the decoratores we use.
import { Body, Controller, Get, Param, Post, Delete, Patch, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto'; 

// A class can optionally have a constructor.
// We define a parameter in the constructor, called "tasksService".
// Next we define the type of that parameter, which is TasksService.
// If we would like to use the TasksService in our controller and make it
// availabe in a x method, we would need to set it as a property of this class.

@Controller('tasks')
export class TasksController {
  // It can be either public or private, mostly it is written private. (the prefix)
  // What this does is: TypeScript uses this information to say this tasksService parameter,
  // is going to be a property of this class TasksController.
  // Is going to be a private property.
    constructor(private tasksService: TasksService) {}

  // Since it is a private property we can use it inside this method,
  // this.tasksService within the same class because it is private.

  // We want this method to be called whenever a get request comes in.
  // In this case I want to return TasksService/ getAllTasks() from tasks.service.ts,
  // the result of this method.

  //@Get()
  // getAllTasks has the same name here and in the service.
  // You can call them whatever you want, but it does make sense to call them the same.
  //getAllTasks(): Task[] {
  //return this.tasksService.getAllTasks();
  //}
  // When a request comes in that is handled by this handler, Nestjs will take
  // all of the request body and assign it to this parameter as an argument.
  // @Post()
  // createTask(@Body() body) {
  //     console.log('body', body);
  // }

  // We'll run some conditions and then decide which one we want to call.
  // From getAllTasks to getTasks.
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // If we have any filters defined, call tasksService.getTasksWithFilters
    // otherwise, just get all tasks.
    // The filters are coming from the query parameter.
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

    @Get('/:id')
    // We call the new decorator and then define the name of the parameter.
    // This should correspond to something here that is prefixed by a colon ":".
    // We give it a name "id" in this case, of type string.
    // This is how you extract a path parameter.
    getTaskById(@Param('id') id: string): Task {
      // We return this to task service.
      return this.tasksService.getTaskById(id);
    }

  // Another way to do it is:
    @Post()
    createTask(
    // We specifie within the decorator the property name.
    // We comment out the @Body so we can add DTO.
    //@Body('title') title: string,
    //@Body('description') description: string,
    // We define a new parameter of type: createTaskDto.
    @Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
      return this.tasksService.deleteTask(id);
    }

    // You need to define the field or property that you're patching.
    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id') id:string,
      @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Task {
      const { status } = updateTaskStatusDto;
      return this.tasksService.updateTaskStatus(id, status);
    }

}

// Now you have the TasksService injected into your controller,
// and you can use it to call whatever method you want.

// Within our rest API we want to expose a get method under the tasks route,
// that will return all tasks.

// We have defined the task model and we have implemented it in our controlller
// and service.
