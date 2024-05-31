import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}

// Since TasksService is as a provider, 
// this allows us to inject the service into the controller.
// The service should have the @Injectable decorator to inject, which it has.


