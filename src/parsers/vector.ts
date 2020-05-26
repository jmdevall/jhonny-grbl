export interface Vector {
  x: number;
  y: number;
  z: number;
}

export const parsePositionVector = (str: string): Vector => {
  const parts = str.split(',');
  return {
    x: parseFloat(parts[0]),
    y: parseFloat(parts[1]),
    z: parseFloat(parts[2]),
  };
};
export const fixedDecimals = 3;

export const composePositionVector = (obj: Vector): string => {
  return obj.x.toFixed(fixedDecimals) + ',' + obj.y.toFixed(fixedDecimals) + ',' + obj.z.toFixed(fixedDecimals);
};
