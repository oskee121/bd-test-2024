import { Test } from '@nestjs/testing';
import { TodoModule } from './todo.module';
import { TodoService } from './todo.service';

describe('TodoModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [TodoModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(TodoService)).toBeInstanceOf(TodoService);
  });
});
