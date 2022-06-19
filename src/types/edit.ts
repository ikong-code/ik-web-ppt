/**
 * x: x方向偏移量.
 * 
 * y: y方向偏移量.
 */
export interface AlignmentLineAxis {
  x: number; 
  y: number;
}

/**
 * type: 水平或垂直.
 * 
 * axis: 坐标.
 * 
 * length: 长度
 */
export interface AlignmentLineProps {
  type: 'vertical' | 'horizontal';
  axis: AlignmentLineAxis;
  length: number;
}

export interface CreateElementSelectionData {
  start: [number, number];
  end: [number, number];
}

export type OperateLineHandler = 'start' | 'end' | 'mid'

export const enum OperateLineHandlers {
  START = 'start',
  END = 'end',
  MID = 'mid',
}

export type OperateBorderLine = 'top' | 'bottom' | 'left' | 'right'

export const enum OperateBorderLines {
  T = 'top',
  B = 'bottom',
  L = 'left',
  R = 'right',
}


export type OperateResizeHandler = '' | 'left-top' | 'top' | 'right-top' | 'left' | 'right' | 'left-bottom' | 'bottom' | 'right-bottom'

export const enum OperateResizeHandlers {
  LEFT_TOP = 'left-top',
  TOP = 'top',
  RIGHT_TOP = 'right-top',
  LEFT = 'left',
  RIGHT = 'right',
  LEFT_BOTTOM = 'left-bottom',
  BOTTOM = 'bottom',
  RIGHT_BOTTOM = 'right-bottom',
}