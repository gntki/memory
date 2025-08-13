export interface MoveParams {
  x: number,
  y: number,
  delay?: number,
  callback?: () => void
}

export type RestartCallback = () => void;