import { Test, TestingModule } from '@nestjs/testing';
import { findItemIndexById, patchOrderNumber, sortTodo } from './arrays';

describe('Test TodoArrays Function', () => {
  it('sortTodo() - todo should be sorted when called', () => {
    const unsorted = [
      {
        title: 'A',
        order: 1,
      },
      {
        title: 'D',
        order: 4,
      },
      ,
      {
        title: 'C',
        order: 3,
      },
      ,
      {
        title: 'B',
        order: 2,
      },
    ];
    expect(sortTodo(unsorted)).toEqual([
      {
        title: 'A',
        order: 1,
      },
      {
        title: 'B',
        order: 2,
      },
      {
        title: 'C',
        order: 3,
      },
      {
        title: 'D',
        order: 4,
      },
    ]);
  });

  it('findItemIndexById() - should find item from array by id', () => {
    const array = [
      {
        id: 'a',
        order: 1,
      },
      {
        id: 'd',
        order: 4,
      },
      {
        id: 'c',
        order: 3,
      },
      {
        id: 'b',
        order: 2,
      },
    ];
    expect(findItemIndexById(array, 'c')).toEqual(2);
  });

  it('patchOrderNumber() - should update order number by sequence', () => {
    const array = [
      {
        id: 'a',
        order: 1,
      },
      {
        id: 'd',
        order: 4,
      },
      {
        id: 'c',
        order: 3,
      },
      {
        id: 'b',
        order: 4,
      },
    ];
    expect(patchOrderNumber(array, 2, [1, 2])).toEqual([
      {
        id: 'a',
        order: 1,
      },
      {
        id: 'd',
        order: 2, // Update this
      },
      {
        id: 'c',
        order: 3, // And this
      },
      {
        id: 'b',
        order: 4,
      },
    ]);
  });
});
