import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

// A module is a schematic.
@Module({
  imports: [TasksModule],
})
export class AppModule {}

