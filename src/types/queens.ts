export interface Position {
  row: number;
  col: number;
}

export interface CellProps {
  position: Position;
  hasQueen: boolean;
  isAttacked: boolean;
  isInRange: boolean;
  onClick: (position: Position) => void;
  isEvenCell: boolean;
  cellSize: number;
}

export interface BoardProps {
  size: number;
  queens: Position[];
  onCellClick: (position: Position) => void;
}

export interface TimerProps {
  isRunning: boolean;
  startTime: number | null;
  elapsedTime: number;
  setElapsedTime: (time: number) => void;
}

export interface BoardSizeSelectorProps {
  size: number;
  onSizeChange: (size: number) => void;
} 