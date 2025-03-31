import { AAAAAA, CCCCCC, EEEEEE } from "constants/colors";
import { GuessCell } from "lib/foodle/foodle";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TOP_ROW_LETTERS = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
];

const MIDDLE_ROW_LETTERS = [
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
];

const BOTTOM_ROW_LETTERS = [
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
];

const TARGET = [
  'B',
  'R',
  'E',
  'A',
  'D',
];

const Foodle = () => {
  const [ rowIdx, setRowIdx ] = useState<number>(0);
  const [ columnIdx, setColumnIdx ] = useState<number>(0);
  const [ guessMatrix, setGuessMatrix ] = useState<GuessCell[][]>([
    [
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
    ],
    [
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
    ],
    [
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
    ],
    [
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
    ],
    [
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
    ],
    [
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
      { letter: '', state: 'EMPTY' },
    ],
  ]);

  const handleLetterPress = (letter: string) => {
    if (columnIdx < 5) {
      const updatedMatrix = [...guessMatrix];
      updatedMatrix[rowIdx][columnIdx] = {
        letter,
        state: 'UNGUESSED',
      };
      setGuessMatrix(updatedMatrix);

      setColumnIdx(columnIdx + 1);
    }
  }

  const handleEnterPress = () => {
    const guessRow = guessMatrix[rowIdx];
    if (guessRow.length === 5) {
      console.log('guessing', guessRow);

      
    }
  }

  const handleBackspacePress = () => {
    if (columnIdx > 0) {
      const updatedGuess = [...guessMatrix[rowIdx]];

      const updatedColumnIdx = columnIdx - 1;
      setColumnIdx(updatedColumnIdx);

      updatedGuess[updatedColumnIdx] = {
        letter: '',
        state: 'EMPTY',
      }

      const updatedMatrix = [...guessMatrix];
      updatedMatrix[rowIdx] = updatedGuess;

      setGuessMatrix(updatedMatrix);
    }
  }

  return (
    <View style={localStyles.mainView}>
      <View style={localStyles.guessView}>
        {
          guessMatrix.map((guessRow, guessRowIndex) => <View 
              key={guessRowIndex}
              style={localStyles.guessRow}
            >
              {
                guessRow.map((guessedLetter, guessedLetterIndex) => <View
                  key={guessedLetterIndex}
                  style={[localStyles.guessedLetterBase, guessedLetter.state === 'UNGUESSED' ? localStyles.unguessedLetter : null]}
                >
                  <Text>{guessedLetter.letter}</Text>
                </View>)
              }
            </View>)
        }
      </View>

      <View style={localStyles.keyboardView}>
        <View style={[localStyles.row, localStyles.topRow]}>
          {
            TOP_ROW_LETTERS.map(letter => <Pressable
              key={letter}
              style={localStyles.key}
              onPress={() => handleLetterPress(letter)}
            >
              <Text>{letter}</Text>
            </Pressable>)
          }
        </View>
        <View style={[localStyles.row, localStyles.topRow]}>
          {
            MIDDLE_ROW_LETTERS.map(letter => <Pressable
              key={letter}
              style={localStyles.key}
              onPress={() => handleLetterPress(letter)}
            >
              <Text>{letter}</Text>
            </Pressable>)
          }
        </View>
        <View style={[localStyles.row, localStyles.topRow]}>
          <Pressable
            style={[localStyles.key, localStyles.specialKey]}
            onPress={() => handleEnterPress()}
          >
            <Text>Enter</Text>
          </Pressable>
          {
            BOTTOM_ROW_LETTERS.map(letter => <Pressable
              key={letter}
              style={localStyles.key}
              onPress={() => handleLetterPress(letter)}
            >
              <Text>{letter}</Text>
            </Pressable>)
          }
          <Pressable
            style={[localStyles.key, localStyles.specialKey]}
            onPress={() => handleBackspacePress()}
          >
            <Text>BKSP</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',

    display: 'flex',
    gap: 4,
  },

  guessView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  guessRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  guessedLetterBase: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: CCCCCC,
    color: 'white',
    fontWeight: 700,
  },
  unguessedLetter: {
    borderColor: AAAAAA,
  },

  keyboardView: {
    paddingHorizontal: 4,
    display: 'flex',
    gap: 4,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  topRow: {

  },
  key: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

    borderRadius: 8,
    backgroundColor: CCCCCC,
    height: 32,
  },
  letterKey: {
    
  },
  letter: {
    fontSize: 24,
    fontWeight: 700,
  },
  specialKey: {

  },
});

export default Foodle;
