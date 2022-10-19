export function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function normalizeBetween(val: number, min: number, max: number) {
  return (val - min) / (max - min);
}
