import { useEffect, useState } from "react";

/** Кастомный хук: возвращает значение, обновлённое с задержкой. */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // cleanup при изменении value / размонтировании
  }, [value, delay]);
  return debounced;
}
