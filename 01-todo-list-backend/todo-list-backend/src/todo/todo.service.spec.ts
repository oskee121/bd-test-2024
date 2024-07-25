import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TodoService::findAll()', () => {
    it('should be return array of todo', () => {
      expect(service.findAll()).toEqual([
        [
          {
            id: '5axim8syb',
            title: 'Google',
            favorites: true,
            scheduledTime: undefined,
            notes: '83274 Felicity Spurs Suite 998',
            createdAt: '2023-12-22 10:10:41',
            order: 1,
          },
          {
            id: 'tm6wy4c7s',
            title: 'Twitter',
            favorites: false,
            scheduledTime: '2024-08-12 13:01:16',
            notes:
              'Alice thought the poor little thing sat down and make one quite giddy.',
            createdAt: '2024-03-22 15:16:16',
            order: 2,
          },
          {
            id: 'pe7lujl0l',
            title: 'Github',
            favorites: false,
            scheduledTime: '2024-09-13 19:03:46',
            notes: "I haven't the slightest idea,",
            createdAt: '2024-06-07 21:52:52',
            order: 3,
          },
          {
            id: '5bhx8elav',
            title: 'Vimeo',
            favorites: false,
            scheduledTime: undefined,
            notes: '',
            createdAt: '2024-06-16 11:03:35',
            order: 4,
          },
          {
            id: '0f7hdrwh3',
            title: 'Facebook',
            favorites: true,
            scheduledTime: '2024-09-29 18:22:28',
            notes: '',
            createdAt: '2024-06-23 01:26:53',
            order: 5,
          },
          {
            id: '0BMf4Ny9R',
            title: 'Nike',
            favorites: true,
            scheduledTime: '2024-09-29 18:22:28',
            notes: '',
            createdAt: '2024-06-24 00:00:00',
            order: 6,
          },
          {
            id: 'szC82qqcZ',
            title: 'Amazon',
            favorites: true,
            scheduledTime: '2024-09-29 18:22:28',
            notes: '',
            createdAt: '2024-06-25 00:00:00',
            order: 7,
          },
          {
            id: 'wnBMJb3co',
            title: 'Tesla',
            favorites: true,
            scheduledTime: '2024-09-29 18:22:28',
            notes: '',
            createdAt: '2024-06-26 00:00:00',
            order: 8,
          },
          {
            id: 'gp2amYvwP',
            title: 'Apple',
            favorites: true,
            scheduledTime: '2024-09-29 18:22:28',
            notes: '',
            createdAt: '2024-06-27 00:00:00',
            order: 9,
          },
        ],
        9,
      ]);
    });
  });

  describe('TodoService::findOne()', () => {
    it('should be return a todo', () => {
      const todo: Todo = service.findOne('0f7hdrwh3');
      expect(todo).toEqual({
        id: '0f7hdrwh3',
        title: 'Facebook',
        favorites: true,
        scheduledTime: '2024-09-29 18:22:28',
        notes: '',
        createdAt: '2024-06-23 01:26:53',
        order: 5,
      });
    });
  });

  describe('TodoService::create()', () => {
    it('should be create and return created item', () => {
      const createTodo = {
        title: 'this is title',
        scheduledTime: '2024-01-01 23:59:59',
        notes: 'This is note',
      } as Todo;
      const result = {
        title: 'this is title',
        scheduledTime: '2024-01-01 23:59:59',
        notes: 'This is note',
      } as Todo;
      expect(Object.keys(service.create(createTodo))).toEqual(
        expect.arrayContaining(['id']),
      );
    });
    it('should be create and return created item with empty note', () => {
      const createTodo = {
        title: 'this is title',
        scheduledTime: '2024-01-01 23:59:59',
        notes: '',
      };
      expect(Object.keys(service.create(createTodo))).toEqual(
        expect.arrayContaining(['id']),
      );
    });
  });

  describe('TodoService::update()', () => {
    it("should update todo's title", () => {
      expect(service.update('gp2amYvwP', { title: 'orange' })).toEqual({
        id: 'gp2amYvwP',
        title: 'orange',
        favorites: true,
        scheduledTime: '2024-09-29 18:22:28',
        notes: '',
        createdAt: '2024-06-27 00:00:00',
        order: 9,
      });
    });
    it("should update todo's favorites", () => {
      expect(service.update('gp2amYvwP', { favorites: false })).toEqual({
        id: 'gp2amYvwP',
        title: 'Apple',
        favorites: false,
        scheduledTime: '2024-09-29 18:22:28',
        notes: '',
        createdAt: '2024-06-27 00:00:00',
        order: 9,
      });
    });
    it("should update todo's scheduledTime", () => {
      expect(
        service.update('gp2amYvwP', { scheduledTime: '2000-12-31 23:59:59' }),
      ).toEqual({
        id: 'gp2amYvwP',
        title: 'Apple',
        favorites: true,
        scheduledTime: '2000-12-31 23:59:59',
        notes: '',
        createdAt: '2024-06-27 00:00:00',
        order: 9,
      });
    });
    it("should update todo's notes", () => {
      expect(service.update('gp2amYvwP', { notes: 'Hello World!' })).toEqual({
        id: 'gp2amYvwP',
        title: 'Apple',
        favorites: true,
        scheduledTime: '2024-09-29 18:22:28',
        notes: 'Hello World!',
        createdAt: '2024-06-27 00:00:00',
        order: 9,
      });
    });
    it("should update todo's all details", () => {
      expect(
        service.update('gp2amYvwP', {
          title: 'orange',
          favorites: false,
          scheduledTime: '2025-12-31 23:59:59',
          notes: 'Hello Test!',
        }),
      ).toEqual({
        id: 'gp2amYvwP',
        title: 'orange',
        favorites: false,
        scheduledTime: '2025-12-31 23:59:59',
        notes: 'Hello Test!',
        createdAt: '2024-06-27 00:00:00',
        order: 9,
      });
    });
  });

  describe('TodoService::reorder()', () => {
    it('should be reorder item when move up to first item', () => {
      expect(service.reorder('0BMf4Ny9R', 0)).toEqual([
        {
          id: '0BMf4Ny9R',
          title: 'Nike',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-24 00:00:00',
          order: 1,
        },
        {
          id: '5axim8syb',
          title: 'Google',
          favorites: true,
          scheduledTime: undefined,
          notes: '83274 Felicity Spurs Suite 998',
          createdAt: '2023-12-22 10:10:41',
          order: 2,
        },
        {
          id: 'tm6wy4c7s',
          title: 'Twitter',
          favorites: false,
          scheduledTime: '2024-08-12 13:01:16',
          notes:
            'Alice thought the poor little thing sat down and make one quite giddy.',
          createdAt: '2024-03-22 15:16:16',
          order: 3,
        },
        {
          id: 'pe7lujl0l',
          title: 'Github',
          favorites: false,
          scheduledTime: '2024-09-13 19:03:46',
          notes: "I haven't the slightest idea,",
          createdAt: '2024-06-07 21:52:52',
          order: 4,
        },
        {
          id: '5bhx8elav',
          title: 'Vimeo',
          favorites: false,
          scheduledTime: undefined,
          notes: '',
          createdAt: '2024-06-16 11:03:35',
          order: 5,
        },
        {
          id: '0f7hdrwh3',
          title: 'Facebook',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-23 01:26:53',
          order: 6,
        },
        {
          id: 'szC82qqcZ',
          title: 'Amazon',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-25 00:00:00',
          order: 7,
        },
        {
          id: 'wnBMJb3co',
          title: 'Tesla',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-26 00:00:00',
          order: 8,
        },
        {
          id: 'gp2amYvwP',
          title: 'Apple',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-27 00:00:00',
          order: 9,
        },
      ]);
    });
    it('should be reorder item when move up', () => {
      expect(service.reorder('szC82qqcZ', 3)).toEqual([
        {
          id: '5axim8syb',
          title: 'Google',
          favorites: true,
          scheduledTime: undefined,
          notes: '83274 Felicity Spurs Suite 998',
          createdAt: '2023-12-22 10:10:41',
          order: 1,
        },
        {
          id: 'tm6wy4c7s',
          title: 'Twitter',
          favorites: false,
          scheduledTime: '2024-08-12 13:01:16',
          notes:
            'Alice thought the poor little thing sat down and make one quite giddy.',
          createdAt: '2024-03-22 15:16:16',
          order: 2,
        },
        {
          id: 'pe7lujl0l',
          title: 'Github',
          favorites: false,
          scheduledTime: '2024-09-13 19:03:46',
          notes: "I haven't the slightest idea,",
          createdAt: '2024-06-07 21:52:52',
          order: 3,
        },
        {
          id: 'szC82qqcZ',
          title: 'Amazon',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-25 00:00:00',
          order: 4,
        },
        {
          id: '5bhx8elav',
          title: 'Vimeo',
          favorites: false,
          scheduledTime: undefined,
          notes: '',
          createdAt: '2024-06-16 11:03:35',
          order: 5,
        },
        {
          id: '0f7hdrwh3',
          title: 'Facebook',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-23 01:26:53',
          order: 6,
        },
        {
          id: '0BMf4Ny9R',
          title: 'Nike',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-24 00:00:00',
          order: 7,
        },
        {
          id: 'wnBMJb3co',
          title: 'Tesla',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-26 00:00:00',
          order: 8,
        },
        {
          id: 'gp2amYvwP',
          title: 'Apple',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-27 00:00:00',
          order: 9,
        },
      ]);
    });
    it('should be reorder item when move down', () => {
      expect(service.reorder('pe7lujl0l', 6)).toEqual([
        {
          id: '5axim8syb',
          title: 'Google',
          favorites: true,
          scheduledTime: undefined,
          notes: '83274 Felicity Spurs Suite 998',
          createdAt: '2023-12-22 10:10:41',
          order: 1,
        },
        {
          id: 'tm6wy4c7s',
          title: 'Twitter',
          favorites: false,
          scheduledTime: '2024-08-12 13:01:16',
          notes:
            'Alice thought the poor little thing sat down and make one quite giddy.',
          createdAt: '2024-03-22 15:16:16',
          order: 2,
        },

        {
          id: '5bhx8elav',
          title: 'Vimeo',
          favorites: false,
          scheduledTime: undefined,
          notes: '',
          createdAt: '2024-06-16 11:03:35',
          order: 3,
        },
        {
          id: '0f7hdrwh3',
          title: 'Facebook',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-23 01:26:53',
          order: 4,
        },
        {
          id: '0BMf4Ny9R',
          title: 'Nike',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-24 00:00:00',
          order: 5,
        },
        {
          id: 'pe7lujl0l',
          title: 'Github',
          favorites: false,
          scheduledTime: '2024-09-13 19:03:46',
          notes: "I haven't the slightest idea,",
          createdAt: '2024-06-07 21:52:52',
          order: 6,
        },
        {
          id: 'szC82qqcZ',
          title: 'Amazon',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-25 00:00:00',
          order: 7,
        },
        {
          id: 'wnBMJb3co',
          title: 'Tesla',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-26 00:00:00',
          order: 8,
        },
        {
          id: 'gp2amYvwP',
          title: 'Apple',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-27 00:00:00',
          order: 9,
        },
      ]);
    });
    it('should be reorder item when move down to last item', () => {
      expect(service.reorder('5bhx8elav', 9)).toEqual([
        {
          id: '5axim8syb',
          title: 'Google',
          favorites: true,
          scheduledTime: undefined,
          notes: '83274 Felicity Spurs Suite 998',
          createdAt: '2023-12-22 10:10:41',
          order: 1,
        },
        {
          id: 'tm6wy4c7s',
          title: 'Twitter',
          favorites: false,
          scheduledTime: '2024-08-12 13:01:16',
          notes:
            'Alice thought the poor little thing sat down and make one quite giddy.',
          createdAt: '2024-03-22 15:16:16',
          order: 2,
        },
        {
          id: 'pe7lujl0l',
          title: 'Github',
          favorites: false,
          scheduledTime: '2024-09-13 19:03:46',
          notes: "I haven't the slightest idea,",
          createdAt: '2024-06-07 21:52:52',
          order: 3,
        },
        {
          id: '0f7hdrwh3',
          title: 'Facebook',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-23 01:26:53',
          order: 4,
        },
        {
          id: '0BMf4Ny9R',
          title: 'Nike',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-24 00:00:00',
          order: 5,
        },
        {
          id: 'szC82qqcZ',
          title: 'Amazon',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-25 00:00:00',
          order: 6,
        },
        {
          id: 'wnBMJb3co',
          title: 'Tesla',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-26 00:00:00',
          order: 7,
        },
        {
          id: 'gp2amYvwP',
          title: 'Apple',
          favorites: true,
          scheduledTime: '2024-09-29 18:22:28',
          notes: '',
          createdAt: '2024-06-27 00:00:00',
          order: 8,
        },
        {
          id: '5bhx8elav',
          title: 'Vimeo',
          favorites: false,
          scheduledTime: undefined,
          notes: '',
          createdAt: '2024-06-16 11:03:35',
          order: 9,
        },
      ]);
    });
  });

  describe('TodoService::remove()', () => {
    it('should be remove and return object of id', () => {
      expect(service.remove('wnBMJb3co')).toEqual({ id: 'wnBMJb3co' });
    });
  });
});
