import { evaluate, GuessCell } from "../lib/foodle/foodle";

describe('foodle evaluate function', () => {

  describe('TARGET = BREAD', () => {

    const target = ['B', 'R', 'E', 'A', 'D'];

    it('should evaluate guess: PASTA correctly', () => {
      const input: GuessCell[] = [
        {
          letter: 'P',
          state: 'UNGUESSED'
        },
        {
          letter: 'A',
          state: 'UNGUESSED'
        },
        {
          letter: 'S',
          state: 'UNGUESSED'
        },
        {
          letter: 'T',
          state: 'UNGUESSED'
        },
        {
          letter: 'A',
          state: 'UNGUESSED'
        },
      ];

      const actualResult = evaluate(input, target);
  
      const expectedResult: GuessCell[] = [
        {
          letter: 'P',
          state: 'INCORRECT'
        },
        {
          letter: 'A',
          state: 'WRONG POSITION'
        },
        {
          letter: 'S',
          state: 'INCORRECT'
        },
        {
          letter: 'T',
          state: 'INCORRECT'
        },
        {
          letter: 'A',
          state: 'INCORRECT'
        },
      ];
  
      expect(actualResult).toEqual(expectedResult);
    });

    it('should evaluate guess BREAM correctly', () => {
      const input: GuessCell[] = [
        {
          letter: 'B',
          state: 'UNGUESSED'
        },
        {
          letter: 'R',
          state: 'UNGUESSED'
        },
        {
          letter: 'E',
          state: 'UNGUESSED'
        },
        {
          letter: 'A',
          state: 'UNGUESSED'
        },
        {
          letter: 'M',
          state: 'UNGUESSED'
        },
      ];

      const actualResult = evaluate(input, target);
  
      const expectedResult: GuessCell[] = [
        {
          letter: 'B',
          state: 'CORRECT'
        },
        {
          letter: 'R',
          state: 'CORRECT'
        },
        {
          letter: 'E',
          state: 'CORRECT'
        },
        {
          letter: 'A',
          state: 'CORRECT'
        },
        {
          letter: 'M',
          state: 'INCORRECT'
        },
      ];
  
      expect(actualResult).toEqual(expectedResult);
    });

    it('should evaluate guess ACORN correctly', () => {
      const input: GuessCell[] = [
        {
          letter: 'A',
          state: 'UNGUESSED'
        },
        {
          letter: 'C',
          state: 'UNGUESSED'
        },
        {
          letter: 'O',
          state: 'UNGUESSED'
        },
        {
          letter: 'R',
          state: 'UNGUESSED'
        },
        {
          letter: 'N',
          state: 'UNGUESSED'
        },
      ];

      const actualResult = evaluate(input, target);
  
      const expectedResult: GuessCell[] = [
        {
          letter: 'A',
          state: 'WRONG POSITION'
        },
        {
          letter: 'C',
          state: 'INCORRECT'
        },
        {
          letter: 'O',
          state: 'INCORRECT'
        },
        {
          letter: 'R',
          state: 'WRONG POSITION'
        },
        {
          letter: 'N',
          state: 'INCORRECT'
        },
      ];
  
      expect(actualResult).toEqual(expectedResult);
    });

    it('should evaluate guess BREAD correctly', () => {
      const input: GuessCell[] = [
        {
          letter: 'B',
          state: 'UNGUESSED'
        },
        {
          letter: 'R',
          state: 'UNGUESSED'
        },
        {
          letter: 'E',
          state: 'UNGUESSED'
        },
        {
          letter: 'A',
          state: 'UNGUESSED'
        },
        {
          letter: 'D',
          state: 'UNGUESSED'
        },
      ];

      const actualResult = evaluate(input, target);
  
      const expectedResult: GuessCell[] = [
        {
          letter: 'B',
          state: 'CORRECT'
        },
        {
          letter: 'R',
          state: 'CORRECT'
        },
        {
          letter: 'E',
          state: 'CORRECT'
        },
        {
          letter: 'A',
          state: 'CORRECT'
        },
        {
          letter: 'D',
          state: 'CORRECT'
        },
      ];
  
      expect(actualResult).toEqual(expectedResult);
    });

    it('should evaluate guess SALAD correctly', () => {
      const input: GuessCell[] = [
        {
          letter: 'S',
          state: 'UNGUESSED'
        },
        {
          letter: 'A',
          state: 'UNGUESSED'
        },
        {
          letter: 'L',
          state: 'UNGUESSED'
        },
        {
          letter: 'A',
          state: 'UNGUESSED'
        },
        {
          letter: 'D',
          state: 'UNGUESSED'
        },
      ];

      const actualResult = evaluate(input, target);
  
      const expectedResult: GuessCell[] = [
        {
          letter: 'S',
          state: 'INCORRECT'
        },
        {
          letter: 'A',
          state: 'INCORRECT'
        },
        {
          letter: 'L',
          state: 'INCORRECT'
        },
        {
          letter: 'A',
          state: 'CORRECT'
        },
        {
          letter: 'D',
          state: 'CORRECT'
        },
      ];
  
      expect(actualResult).toEqual(expectedResult);
    });

    it('should evaluate guess ICING correctly', () => {
      const input: GuessCell[] = [
        {
          letter: 'I',
          state: 'UNGUESSED'
        },
        {
          letter: 'C',
          state: 'UNGUESSED'
        },
        {
          letter: 'I',
          state: 'UNGUESSED'
        },
        {
          letter: 'N',
          state: 'UNGUESSED'
        },
        {
          letter: 'G',
          state: 'UNGUESSED'
        },
      ];

      const actualResult = evaluate(input, target);
  
      const expectedResult: GuessCell[] = [
        {
          letter: 'I',
          state: 'INCORRECT'
        },
        {
          letter: 'C',
          state: 'INCORRECT'
        },
        {
          letter: 'I',
          state: 'INCORRECT'
        },
        {
          letter: 'N',
          state: 'CORRECT'
        },
        {
          letter: 'G',
          state: 'CORRECT'
        },
      ];
  
      expect(actualResult).toEqual(expectedResult);
    });

  });

  describe('TARGET = PASTA', () => {

    const target = ['P', 'A', 'S', 'T', 'A'];

    it('should evaluate guess BREAD correctly', () => {
      const input: GuessCell[] = [
        {
          letter: 'B',
          state: 'UNGUESSED',
        },
        {
          letter: 'R',
          state: 'UNGUESSED',
        },
        {
          letter: 'E',
          state: 'UNGUESSED',
        },
        {
          letter: 'A',
          state: 'UNGUESSED',
        },
        {
          letter: 'D',
          state: 'UNGUESSED',
        },
      ];

      const actualResult = evaluate(input, target);

      const expectedResult: GuessCell[] = [
        {
          letter: 'B',
          state: 'INCORRECT'
        },
        {
          letter: 'R',
          state: 'INCORRECT'
        },
        {
          letter: 'E',
          state: 'INCORRECT'
        },
        {
          letter: 'A',
          state: 'WRONG POSITION'
        },
        {
          letter: 'D',
          state: 'INCORRECT'
        },
      ];

      expect(actualResult).toEqual(expectedResult);
    });

    it('should evaluate guess ACORN correctly', () => {
      const input: GuessCell[] = [
        {
          letter: 'A',
          state: 'UNGUESSED',
        },
        {
          letter: 'C',
          state: 'UNGUESSED',
        },
        {
          letter: 'O',
          state: 'UNGUESSED',
        },
        {
          letter: 'R',
          state: 'UNGUESSED',
        },
        {
          letter: 'N',
          state: 'UNGUESSED',
        },
      ];

      const actualResult = evaluate(input, target);

      const expectedResult: GuessCell[] = [
        {
          letter: 'A',
          state: 'WRONG POSITION'
        },
        {
          letter: 'C',
          state: 'INCORRECT'
        },
        {
          letter: 'O',
          state: 'INCORRECT'
        },
        {
          letter: 'R',
          state: 'INCORRECT'
        },
        {
          letter: 'N',
          state: 'INCORRECT'
        },
      ];

      expect(actualResult).toEqual(expectedResult);
    });

  });
  
});
