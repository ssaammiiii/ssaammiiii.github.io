/**
 * Simplified handshapes for the SignSpeak playground illustration.
 * flex: thumb, index, middle, ring, pinky (0 straight, 1 fully bent).
 * These are drawn approximations, not the real GSL letterforms or model output.
 */
export type Shape = {
  flex: [number, number, number, number, number];
  tilt: number; // degrees, read by the IMU
  spread: number; // 0..1, index/middle apart
  contact: boolean; // contact pad closed
};

const s = (flex: Shape["flex"], tilt = 0, spread = 0, contact = false): Shape => ({ flex, tilt, spread, contact });

export const REST: Shape = s([0.15, 0.08, 0.08, 0.1, 0.12]);

export const SHAPES: Record<string, Shape> = {
  A: s([0.25, 1, 1, 1, 1], 0, 0, false),
  B: s([1, 0, 0, 0, 0]),
  C: s([0.35, 0.5, 0.5, 0.5, 0.5], -6),
  D: s([0.6, 0, 0.85, 0.85, 0.85]),
  E: s([0.95, 0.8, 0.8, 0.8, 0.8]),
  F: s([0.6, 0.8, 0, 0, 0]),
  G: s([0.2, 0, 1, 1, 1], -24),
  H: s([0.8, 0, 0, 1, 1], -28),
  I: s([0.85, 1, 1, 1, 0]),
  J: s([0.85, 1, 1, 1, 0], 18),
  K: s([0.3, 0, 0, 1, 1], 0, 0.6),
  L: s([0, 0, 1, 1, 1]),
  M: s([0.95, 0.9, 0.9, 0.9, 1]),
  N: s([0.95, 0.9, 0.9, 1, 1]),
  O: s([0.55, 0.62, 0.62, 0.62, 0.62]),
  P: s([0.3, 0, 0, 1, 1], 22, 0.6),
  Q: s([0.2, 0, 1, 1, 1], 26),
  R: s([0.8, 0, 0.05, 1, 1], 0, 0, true),
  S: s([0.75, 1, 1, 1, 1]),
  T: s([0.45, 1, 1, 1, 1], 0, 0, true),
  U: s([0.8, 0, 0, 1, 1], 0, 0, true),
  V: s([0.8, 0, 0, 1, 1], 0, 1),
  W: s([0.8, 0, 0, 0, 1], 0, 0.7),
  X: s([0.8, 0.55, 1, 1, 1]),
  Y: s([0, 1, 1, 1, 0]),
  Z: s([0.8, 0, 1, 1, 1], -10),
};

export function shapeFor(ch: string | undefined): Shape {
  if (!ch) return REST;
  return SHAPES[ch.toUpperCase()] ?? REST;
}

/** 24 simulated channels: 12 per glove (5 flex, 6 inertial, 1 contact). */
export function channelsFor(shape: Shape, ch = "", active = true): number[] {
  const seed = ch ? ch.charCodeAt(0) : 7;
  const n = (k: number) => {
    const v = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  const left = [
    ...shape.flex,
    0.5 + shape.tilt / 60,
    0.35 + n(1) * 0.3,
    0.4 + n(2) * 0.25,
    0.3 + Math.abs(shape.tilt) / 50,
    0.25 + n(3) * 0.3,
    0.3 + n(4) * 0.2,
    shape.contact ? 1 : 0.06,
  ];
  const right = Array.from({ length: 12 }, (_, k) => 0.08 + n(k + 10) * (active ? 0.18 : 0.08));
  return [...left, ...right].map((v) => Math.max(0.04, Math.min(1, v)));
}
