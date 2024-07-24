import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  id: string;
  favorites?: boolean;
  title?: string;
  scheduledTime?: string;
  notes?: string;
}
