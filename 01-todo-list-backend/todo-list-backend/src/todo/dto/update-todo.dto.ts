import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  favorites?: boolean;
  notes?: string;
  scheduledTime?: string;
  title?: string;
}
