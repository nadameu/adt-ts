export const Ordering = { LT: -1, EQ: 0, GT: +1 } as const;
export type Ordering = typeof Ordering[keyof typeof Ordering];
