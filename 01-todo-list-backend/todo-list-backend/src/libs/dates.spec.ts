import { Test, TestingModule } from '@nestjs/testing';
import getDateString from './dates';

describe('Test TodoArrays Function', () => {
  it('getDateString() - should auto return date string', () => {
    expect(getDateString()).toMatch(
      /2[0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9] [0-2][0-9]:[0-5][0-9]:[0-5][0-9]/,
    );
  });
});
