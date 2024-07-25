import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import getDateString from '../libs/dates';
import { sortTodo, findItemIndexById, patchOrderNumber } from '../libs/arrays';

const randomId = (): string =>
  Array(9)
    .fill('')
    .map(() => Math.random().toString(36)[2])
    .join('');

@Injectable()
export class TodoService {
  private todoList: Todo[] = [];
  private lastOrder: number = 5;
  constructor() {
    this.todoList.push({
      id: '5axim8syb',
      title: 'Google',
      favorites: true,
      scheduledTime: undefined,
      notes: '83274 Felicity Spurs Suite 998',
      createdAt: '2023-12-22 10:10:41',
      order: 1,
    });
    this.todoList.push({
      id: 'tm6wy4c7s',
      title: 'Twitter',
      favorites: false,
      scheduledTime: '2024-08-12 13:01:16',
      notes:
        'Alice thought the poor little thing sat down and make one quite giddy.',
      createdAt: '2024-03-22 15:16:16',
      order: 2,
    });
    this.todoList.push({
      id: 'pe7lujl0l',
      title: 'Github',
      favorites: false,
      scheduledTime: '2024-09-13 19:03:46',
      notes: `I haven't the slightest idea,`,
      createdAt: '2024-06-07 21:52:52',
      order: 3,
    });
    this.todoList.push({
      id: '5bhx8elav',
      title: 'Vimeo',
      favorites: false,
      scheduledTime: undefined,
      notes: '',
      createdAt: '2024-06-16 11:03:35',
      order: 4,
    });
    this.todoList.push({
      id: '0f7hdrwh3',
      title: 'Facebook',
      favorites: true,
      scheduledTime: '2024-09-29 18:22:28',
      notes: '',
      createdAt: '2024-06-23 01:26:53',
      order: 5,
    });
    this.todoList.push({
      id: '0BMf4Ny9R',
      title: 'Nike',
      favorites: true,
      scheduledTime: '2024-09-29 18:22:28',
      notes: '',
      createdAt: '2024-06-24 00:00:00',
      order: 6,
    });
    this.todoList.push({
      id: 'szC82qqcZ',
      title: 'Amazon',
      favorites: true,
      scheduledTime: '2024-09-29 18:22:28',
      notes: '',
      createdAt: '2024-06-25 00:00:00',
      order: 7,
    });
    this.todoList.push({
      id: 'wnBMJb3co',
      title: 'Tesla',
      favorites: true,
      scheduledTime: '2024-09-29 18:22:28',
      notes: '',
      createdAt: '2024-06-26 00:00:00',
      order: 8,
    });
    this.todoList.push({
      id: 'gp2amYvwP',
      title: 'Apple',
      favorites: true,
      scheduledTime: '2024-09-29 18:22:28',
      notes: '',
      createdAt: '2024-06-27 00:00:00',
      order: 9,
    });
  }

  create(createTodoDto: CreateTodoDto) {
    const id = randomId();
    const save: Todo = {
      ...createTodoDto,
      id,
      notes: createTodoDto.notes || '',
      scheduledTime: '',
      createdAt: getDateString(),
      order: ++this.lastOrder,
    };
    this.todoList.push(save);
    return { id };
  }

  findAll() {
    return [sortTodo(this.todoList), this.todoList.length];
  }

  findOne(id: string) {
    return this.todoList.find((obj) => obj.id === id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const findItemIndex = findItemIndexById(this.todoList, id);
      if (updateTodoDto.title)
        this.todoList[findItemIndex].title = updateTodoDto.title;
      if (updateTodoDto.favorites !== undefined)
        this.todoList[findItemIndex].favorites = updateTodoDto.favorites;
      if (updateTodoDto.scheduledTime)
        this.todoList[findItemIndex].scheduledTime =
          updateTodoDto.scheduledTime;
      if (updateTodoDto.notes)
        this.todoList[findItemIndex].notes = updateTodoDto.notes;
      return this.todoList[findItemIndex];
    } catch (error) {
      throw error;
    }
  }

  // 1 2 3 4 5 6 7
  //       ^
  // 1 2 3   5 6 7
  //
  //     v
  // 1 2 3 5 6 7
  //
  //     v
  // 1 2 * 3 5 6 7
  //
  //     v
  // 1 2[4 3]5 6 7  reorder only element 3 to 4
  // = = # # = = =   #:patch index | =:do nothing
  // 1 2[3 4]5 6 7  reorder done

  // 1 2 3 4 5 6 7
  //       ^
  // 1 2 3   5 6 7
  //
  //         v
  // 1 2 3 5   6 7
  //
  //         v
  // 1 2 3 5 * 6 7
  //
  //         v
  // 1 2 3[5 4]6 7   reorder
  // = = = # # = =   #:patch index | =:do nothing
  // 1 2 3[4 5]6 7   reorder
  reorder(id: string, newPosition: number) {
    const sortedList = sortTodo(this.todoList);
    const movingItemIndex = findItemIndexById(this.todoList, id);
    const movingItem = sortedList.splice(movingItemIndex, 1);

    let reorderBetween;
    if (movingItemIndex < newPosition) {
      newPosition--;
      reorderBetween = [movingItemIndex, newPosition];
    } else {
      reorderBetween = [newPosition, movingItemIndex];
    }
    const secondHalfList = sortedList.splice(newPosition);

    this.todoList = patchOrderNumber(
      [...sortedList, ...movingItem, ...secondHalfList],
      reorderBetween[0] + 1,
      reorderBetween,
    );
    console.log(JSON.stringify(this.todoList));

    return this.todoList;
  }

  remove(id: string) {
    this.todoList.splice(
      this.todoList.findIndex((i) => i.id === id),
      1,
    );
    return { id };
  }
}
