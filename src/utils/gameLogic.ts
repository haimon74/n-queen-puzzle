import { Position } from '../types/queens';

export const isInRange = (position: Position, queens: Position[]): boolean => {
  return queens.some(queen => {
    // Same row or column
    if (queen.row === position.row || queen.col === position.col) return true;
    
    // Same diagonal - check if the slope is 1 or -1
    const rowDiff = queen.row - position.row;
    const colDiff = queen.col - position.col;
    return Math.abs(rowDiff) === Math.abs(colDiff);
  });
};

export const isAttacked = (position: Position, queens: Position[]): boolean => {
  return queens.some(queen => {
    if (queen.row === position.row && queen.col === position.col) return false;
    
    // Same row or column
    if (queen.row === position.row || queen.col === position.col) return true;
    
    // Same diagonal - check if the slope is 1 or -1
    const rowDiff = queen.row - position.row;
    const colDiff = queen.col - position.col;
    return Math.abs(rowDiff) === Math.abs(colDiff);
  });
};

export const hasQueen = (position: Position, queens: Position[]): boolean => {
  return queens.some(queen => queen.row === position.row && queen.col === position.col);
};

export const isValidQueenPlacement = (position: Position, queens: Position[], boardSize: number): boolean => {
  // Check if position is within board bounds
  if (position.row < 0 || position.row >= boardSize || position.col < 0 || position.col >= boardSize) {
    return false;
  }

  // Check if position is already occupied
  if (hasQueen(position, queens)) {
    return false;
  }

  // Check if position is in range of any existing queen
  return !isInRange(position, queens);
};

export const isGameComplete = (queens: Position[], boardSize: number): boolean => {
  // Check if we have the correct number of queens
  if (queens.length !== boardSize) {
    return false;
  }

  // Check if any queen is attacked
  return !queens.some((queen, index) => {
    return queens.some((otherQueen, otherIndex) => {
      if (index === otherIndex) return false;
      return (
        queen.row === otherQueen.row ||
        queen.col === otherQueen.col ||
        Math.abs(queen.row - otherQueen.row) === Math.abs(queen.col - otherQueen.col)
      );
    });
  });
}; 