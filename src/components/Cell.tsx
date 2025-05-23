import React from 'react';
import { CellProps } from '../types/queens';
import styles from './Cell.module.css';

interface ExtendedCellProps extends CellProps {
  cellSize: number;
}

const Cell: React.FC<ExtendedCellProps> = ({ 
  position, 
  hasQueen, 
  isAttacked, 
  isInRange, 
  onClick, 
  isEvenCell, 
  cellSize 
}) => {
  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    fontSize: `${cellSize * 0.4}px`
  };

  const queenStyle = {
    fontSize: `${cellSize * 0.65}px`
  };

  return (
    <div 
      className={`${styles.cellContainer} ${isEvenCell ? styles.evenCell : styles.oddCell} ${isInRange ? styles.inRange : ''}`}
      style={cellStyle}
      onClick={() => onClick(position)}
    >
      {hasQueen && (
        <span 
          className={`${styles.queen} ${isAttacked ? styles.attacked : styles.safe}`}
          style={queenStyle}
        >
          ♛
        </span>
      )}
    </div>
  );
};

export default Cell; 