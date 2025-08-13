export interface MoveParams {
  x: number,
  y: number,
  delay?: number,
  depth?: number,
  callback?: () => void,
}

export type RestartCallback = () => void;