export type GuessCell = {
  state: 'EMPTY' | 'UNGUESSED' | 'CORRECT' | 'INCORRECT' | 'WRONG POSITION'
  letter: string
}

export const evaluate = (targetCells: GuessCell[], guess: string[]): GuessCell[] => {
  const result: GuessCell[] = [];

  for (let i = 0; i < targetCells.length; i++) {
    const guessedLetter = guess[i];
    const targetCell: GuessCell = targetCells[i];
    const targetString = targetCells.map(tc => tc.letter).join('');
    const cell: GuessCell = {
      letter: guessedLetter,
      state: 'UNGUESSED',
    };

    if (guessedLetter === targetCell.letter) {
      cell.state = 'CORRECT';
    } else if (guessedLetter !== targetCell.letter && !targetString.includes(guessedLetter)) {
      cell.state = 'INCORRECT';
    } else if (guessedLetter !== targetCell.letter && targetString.includes(guessedLetter)) {
      cell.state = 'WRONG POSITION';
    }

    result.push(cell);
  }

  return result;
}
