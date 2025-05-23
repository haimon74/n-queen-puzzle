import React from 'react';
import { BoardSizeSelectorProps } from '../types/queens';
import styles from './BoardSizeSelector.module.css';

const BoardSizeSelector: React.FC<BoardSizeSelectorProps> = ({ size, onSizeChange }) => {
  const sizes = Array.from({ length: 12 }, (_, i) => i + 4); // 4 to 15

  return (
    <div className={styles.selectContainer}>
      <label className={styles.label} htmlFor="board-size">
        Board Size:
      </label>
      <select
        id="board-size"
        className={styles.select}
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
      >
        {sizes.map((s) => (
          <option key={s} value={s}>
            {s}×{s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BoardSizeSelector; 