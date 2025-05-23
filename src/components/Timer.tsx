import React, { useEffect } from 'react';
import { TimerProps } from '../types/queens';
import styles from './Timer.module.css';

const Timer: React.FC<TimerProps> = ({ isRunning, startTime, elapsedTime, setElapsedTime }) => {
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && startTime) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, startTime, setElapsedTime]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerContainer}>
      Time: {formatTime(elapsedTime)}
    </div>
  );
};

export default Timer; 