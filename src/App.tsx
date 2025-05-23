import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Timer from './components/Timer';
import BoardSizeSelector from './components/BoardSizeSelector';
import { Position } from './types/queens';
import { isAttacked, isGameComplete as checkGameComplete } from './utils/gameLogic';
import styles from './App.module.css';

const App: React.FC = () => {
  const [boardSize, setBoardSize] = useState<number>(8);
  const [queens, setQueens] = useState<Position[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    setQueens([]);
    setStartTime(null);
    setIsGameComplete(false);
    setElapsedTime(0);
  }, [boardSize]);

  const handleCellClick = (position: Position) => {
    if (isGameComplete) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    const queenIndex = queens.findIndex(
      q => q.row === position.row && q.col === position.col
    );

    if (queenIndex === -1) {
      if (queens.length < boardSize) {
        setQueens([...queens, position]);
      }
    } else {
      setQueens(queens.filter((_, index) => index !== queenIndex));
    }
  };

  useEffect(() => {
    if (queens.length === boardSize) {
      setIsGameComplete(checkGameComplete(queens, boardSize));
    } else {
      setIsGameComplete(false);
    }
  }, [queens, boardSize]);

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>N-Queens Puzzle</h1>
      <div className={styles.gameContainer}>
        <div className={styles.controlsContainer}>
          <BoardSizeSelector size={boardSize} onSizeChange={setBoardSize} />
          <Timer 
            isRunning={!isGameComplete} 
            startTime={startTime} 
            elapsedTime={elapsedTime} 
            setElapsedTime={setElapsedTime} 
          />
        </div>
        <Board
          size={boardSize}
          queens={queens}
          onCellClick={handleCellClick}
        />
      </div>
      {isGameComplete && (
        <div className={styles.successMessage}>
          Congratulations! You solved the {boardSize}-Queens puzzle!
        </div>
      )}
    </div>
  );
};

export default App;
