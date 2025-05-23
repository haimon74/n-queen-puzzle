import { Position } from '../types/queens';
import { isInRange, isAttacked, hasQueen, isValidQueenPlacement, isGameComplete } from './gameLogic';

describe('Game Logic Tests', () => {
  describe('hasQueen', () => {
    const queens: Position[] = [
      { row: 0, col: 0 },
      { row: 1, col: 2 },
      { row: 3, col: 1 }
    ];

    it('should return true when a queen exists at the position', () => {
      expect(hasQueen({ row: 0, col: 0 }, queens)).toBe(true);
      expect(hasQueen({ row: 1, col: 2 }, queens)).toBe(true);
    });

    it('should return false when no queen exists at the position', () => {
      expect(hasQueen({ row: 0, col: 1 }, queens)).toBe(false);
      expect(hasQueen({ row: 2, col: 2 }, queens)).toBe(false);
    });
  });

  describe('isInRange', () => {
    const queens: Position[] = [
      { row: 0, col: 0 },
      { row: 1, col: 2 }
    ];

    it('should return true for positions in the same row', () => {
      expect(isInRange({ row: 0, col: 3 }, queens)).toBe(true);
    });

    it('should return true for positions in the same column', () => {
      expect(isInRange({ row: 3, col: 0 }, queens)).toBe(true);
    });

    it('should return true for positions in the same diagonal', () => {
      expect(isInRange({ row: 2, col: 2 }, queens)).toBe(true); // Diagonal from (0,0)
      expect(isInRange({ row: 2, col: 1 }, queens)).toBe(true); // Diagonal from (1,2)
      expect(isInRange({ row: 3, col: 3 }, queens)).toBe(true); // Diagonal from (0,0)
      expect(isInRange({ row: 2, col: 3 }, queens)).toBe(true); // Diagonal from (1,2)
      expect(isInRange({ row: 3, col: 2 }, queens)).toBe(true); // Diagonal from (0,0)
    });

    it('should return false for safe positions', () => {
      // Position (3,1) is safe because:
      // - Not in same row/column as any queen
      // - Not in same diagonal as (0,0) (diff is 3,1)
      // - Not in same diagonal as (1,2) (diff is 2,-1)
      expect(isInRange({ row: 3, col: 1 }, queens)).toBe(false);
    });
  });

  describe('isAttacked', () => {
    const queens: Position[] = [
      { row: 0, col: 0 },
      { row: 1, col: 2 }
    ];

    it('should return false for positions with queens', () => {
      expect(isAttacked({ row: 0, col: 0 }, queens)).toBe(false);
      expect(isAttacked({ row: 1, col: 2 }, queens)).toBe(false);
    });

    it('should return true for attacked positions', () => {
      expect(isAttacked({ row: 0, col: 1 }, queens)).toBe(true); // Same row
      expect(isAttacked({ row: 2, col: 0 }, queens)).toBe(true); // Same column
      expect(isAttacked({ row: 2, col: 2 }, queens)).toBe(true); // Same diagonal
      expect(isAttacked({ row: 2, col: 1 }, queens)).toBe(true); // Same diagonal
      expect(isAttacked({ row: 3, col: 3 }, queens)).toBe(true); // Same diagonal
      expect(isAttacked({ row: 2, col: 3 }, queens)).toBe(true); // Same diagonal
      expect(isAttacked({ row: 3, col: 2 }, queens)).toBe(true); // Same diagonal
    });

    it('should return false for safe positions', () => {
      expect(isAttacked({ row: 3, col: 1 }, queens)).toBe(false);
    });
  });

  describe('isValidQueenPlacement', () => {
    const queens: Position[] = [
      { row: 0, col: 0 },
      { row: 1, col: 2 }
    ];
    const boardSize = 4;

    it('should return false for positions outside board bounds', () => {
      expect(isValidQueenPlacement({ row: -1, col: 0 }, queens, boardSize)).toBe(false);
      expect(isValidQueenPlacement({ row: 0, col: -1 }, queens, boardSize)).toBe(false);
      expect(isValidQueenPlacement({ row: 4, col: 0 }, queens, boardSize)).toBe(false);
      expect(isValidQueenPlacement({ row: 0, col: 4 }, queens, boardSize)).toBe(false);
    });

    it('should return false for positions already occupied', () => {
      expect(isValidQueenPlacement({ row: 0, col: 0 }, queens, boardSize)).toBe(false);
      expect(isValidQueenPlacement({ row: 1, col: 2 }, queens, boardSize)).toBe(false);
    });

    it('should return false for positions in range of existing queens', () => {
      expect(isValidQueenPlacement({ row: 0, col: 1 }, queens, boardSize)).toBe(false); // Same row
      expect(isValidQueenPlacement({ row: 2, col: 0 }, queens, boardSize)).toBe(false); // Same column
      expect(isValidQueenPlacement({ row: 2, col: 2 }, queens, boardSize)).toBe(false); // Same diagonal
      expect(isValidQueenPlacement({ row: 2, col: 1 }, queens, boardSize)).toBe(false); // Same diagonal
      expect(isValidQueenPlacement({ row: 3, col: 3 }, queens, boardSize)).toBe(false); // Same diagonal
      expect(isValidQueenPlacement({ row: 2, col: 3 }, queens, boardSize)).toBe(false); // Same diagonal
      expect(isValidQueenPlacement({ row: 3, col: 2 }, queens, boardSize)).toBe(false); // Same diagonal
    });

    it('should return true for valid positions', () => {
      expect(isValidQueenPlacement({ row: 3, col: 1 }, queens, boardSize)).toBe(true);
    });
  });

  describe('isGameComplete', () => {
    it('should return false when number of queens is incorrect', () => {
      const queens: Position[] = [
        { row: 0, col: 0 },
        { row: 1, col: 2 }
      ];
      expect(isGameComplete(queens, 4)).toBe(false);
    });

    it('should return false when queens are attacking each other', () => {
      const attackingQueens: Position[] = [
        { row: 0, col: 0 },
        { row: 0, col: 1 }, // Same row
        { row: 1, col: 0 }, // Same column
        { row: 1, col: 1 }  // Same diagonal
      ];
      expect(isGameComplete(attackingQueens, 4)).toBe(false);
    });

    it('should return true for a valid solution', () => {
      const validSolution: Position[] = [
        { row: 0, col: 1 },
        { row: 1, col: 3 },
        { row: 2, col: 0 },
        { row: 3, col: 2 }
      ];
      expect(isGameComplete(validSolution, 4)).toBe(true);
    });
  });
}); 