<<<<<<< HEAD
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
=======
export { cn } from "cn"
>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43
