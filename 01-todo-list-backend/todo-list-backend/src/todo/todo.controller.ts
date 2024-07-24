import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import getDateString from 'src/libs/dates';
import { ReorderTodoDto } from './dto/reorder-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    console.log(createTodoDto);
    return {
      data: this.todoService.create(createTodoDto),
      success: true,
      timestamp: getDateString(),
    };
  }

  @Put('reorder/:id')
  reorder(@Param('id') id: string, @Body() reorderTodoDto: ReorderTodoDto) {
    console.log(reorderTodoDto);
    return {
      data: this.todoService.reorder(id, reorderTodoDto.position),
      success: true,
      timestamp: getDateString(),
    };
  }

  @Get()
  findAll() {
    const [all, count] = this.todoService.findAll();
    return {
      data: all,
      total: count,
      success: true,
      timestamp: getDateString(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      data: this.todoService.findOne(id),
      success: true,
      timestamp: getDateString(),
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      data: this.todoService.remove(id),
      success: true,
      timestamp: getDateString(),
    };
  }
}
