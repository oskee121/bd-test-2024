import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import getDateString from '../libs/dates';
import { CreateTodoDto } from './dto/create-todo.dto';
import { timestamp } from 'rxjs';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let todoService: TodoService;

  const createTodoDto: CreateTodoDto = {
    title: 'title #3',
  };

  const updateTodoDto: UpdateTodoDto = {
    title: 'title #3 Edit',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: TodoService,
          useValue: {
            create: jest.fn().mockImplementation((todo: CreateTodoDto) => ({
              id: 'c',
              ...todo,
            })),
            findAll: jest.fn().mockResolvedValue([
              {
                title: 'title #1',
                favorites: true,
              },
              {
                title: 'title #2',
                favorites: false,
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) => ({
              title: 'title #1',
              favorites: true,
              id,
            })),
            remove: jest.fn(),
            update: jest
              .fn()
              .mockImplementation((id: string, todo: UpdateTodoDto) => ({
                id: 'u',
                ...todo,
              })),
            reorder: jest
              .fn()
              .mockImplementation((id: string, { position: number }) => ({
                success: true,
              })),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todo', async () => {
      const result = [['hello', 'world!'], 10];
      jest.spyOn(todoService, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toEqual({
        data: ['hello', 'world!'],
        success: true,
        timestamp: getDateString(),
        total: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should find a todo', () => {
      expect(controller.findOne('a')).toEqual({
        data: {
          title: 'title #1',
          favorites: true,
          id: 'a',
        },
        success: true,
        timestamp: getDateString(),
      });
    });
  });

  describe('create()', () => {
    it('should create a todo', () => {
      controller.create(createTodoDto);
      expect(controller.create(createTodoDto)).toEqual({
        data: {
          id: 'c',
          ...createTodoDto,
        },
        success: true,
        timestamp: getDateString(),
      });
      expect(todoService.create).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('update()', () => {
    // it("should update a user id 'u'", () => {
    //   const result = { title: 'hello 2' };
    //   controller.update('u', updateTodoDto);
    //   jest.spyOn(todoService, 'update').mockImplementation(() => result);
    //   expect(controller.update('u', updateTodoDto)).toEqual({
    //     data: {
    //       id: 'u',
    //       title: 'hello 2',
    //     },
    //     success: true,
    //     timestamp: getDateString(),
    //   });
    //   // expect(todoService.update).toHaveBeenCalledWith(updateTodoDto);
    // });
    it("should update a todo id 'u'", () => {
      expect(controller.update('u', { title: 'new title' })).toEqual({
        title: 'new title',
        id: 'u',
      });
    });
  });

  describe('remove()', () => {
    it('should remove the todo', () => {
      controller.remove('d');
      expect(todoService.remove).toHaveBeenCalled();
      expect(controller.remove('d')).toEqual({
        success: true,
        timestamp: getDateString(),
      });
    });
  });

  describe('reorder()', () => {
    it('should reorder the todo', () => {
      // controller.reorder('d');
      // expect(todoService.reorder).toHaveBeenCalled();
      expect(controller.reorder('d', { position: 3 })).toEqual({
        success: true,
        timestamp: getDateString(),
      });
    });
  });
});


