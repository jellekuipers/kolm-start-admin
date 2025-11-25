import { tv } from "tailwind-variants";

export const ring = tv({
  base: "outline-0 outline-ring outline-offset-2 focus-within:outline-2 focus-visible:outline-2",
});

export const ringNegative = tv({
  base: "-outline-offset-2 outline-0 outline-ring focus-within:outline-2 focus-visible:outline-2",
});
