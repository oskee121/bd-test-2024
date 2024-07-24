import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

export class ReorderTodoDto extends PartialType(CreateTodoDto) {
  position: number;
}
