import React, { useEffect, useState } from 'react';
import { BoardProps, Position } from '../types/queens';
import Cell from './Cell';
import styles from './Board.module.css';

const Board: React.FC<BoardProps> = ({ size, queens, onCellClick }) => {
  const [cellSize, setCellSize] = useState<number>(60);

  useEffect(() => {
    const calculateCellSize = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.7;
      const maxCellSize = Math.min(maxWidth, maxHeight) / size;
      const minCellSize = 30;
      const maxAllowedCellSize = 80;
      return Math.min(Math.max(Math.floor(maxCellSize), minCellSize), maxAllowedCellSize);
    };

    const updateCellSize = () => {
      setCellSize(calculateCellSize());
    };

    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [size]);

  const isInRange = (position: Position): boolean => {
    return queens.some(queen => {
      if (queen.row === position.row || queen.col === position.col) return true;
      const rowDiff = Math.abs(queen.row - position.row);
      const colDiff = Math.abs(queen.col - position.col);
      return rowDiff === colDiff;
    });
  };

  const isAttacked = (position: Position): boolean => {
    return queens.some(queen => {
      if (queen.row === position.row && queen.col === position.col) return false;
      if (queen.row === position.row || queen.col === position.col) return true;
      const rowDiff = Math.abs(queen.row - position.row);
      const colDiff = Math.abs(queen.col - position.col);
      return rowDiff === colDiff;
    });
  };

  const hasQueen = (position: Position): boolean => {
    return queens.some(queen => queen.row === position.row && queen.col === position.col);
  };

  return (
    <div 
      className={styles.boardContainer}
      role="grid"
      aria-label={`${size}x${size} chess board`}
      style={{ 
        '--board-size': size,
        gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${size}, ${cellSize}px)`
      } as React.CSSProperties}
    >
      {Array.from({ length: size * size }, (_, i) => {
        const row = Math.floor(i / size);
        const col = i % size;
        const position: Position = { row, col };
        const isEvenCell = (row + col) % 2 === 0;

        return (
          <Cell
            key={`${row}-${col}`}
            position={position}
            hasQueen={hasQueen(position)}
            isAttacked={isAttacked(position)}
            isInRange={isInRange(position)}
            onClick={onCellClick}
            isEvenCell={isEvenCell}
            cellSize={cellSize}
          />
        );
      })}
    </div>
  );
};

export default Board; 