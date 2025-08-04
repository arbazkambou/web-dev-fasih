export function useLocaleStorage(key, initialState) {
  const storedValue = localStorage.getItem(key);

  const parsedValue = storedValue ? JSON.parse(storedValue) : initialState;

  return parsedValue;
}
