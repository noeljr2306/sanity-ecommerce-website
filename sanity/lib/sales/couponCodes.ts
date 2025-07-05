export const COUPON_CODES = {
    MARHO: "MARHO",
    XMAS2025: "XMAS2025",
    NEWYEAR2025: "NEWYEAR2025",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;