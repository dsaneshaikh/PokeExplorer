// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from "react";

/**
 * A hook that synchronizes state with localStorage.
 * @param {string} key - The localStorage key.
 * @param {*} initialValue - The initial state value.
 * @returns {[any, function]} - The stored value and a setter function.
 */
export default function useLocalStorage(key, initialValue) {
  // Lazy initialize state from localStorage (or fallback to initialValue)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // Wrap setStoredValue to write-through to localStorage
  const setValue = useCallback(
    (valueOrUpdater) => {
      try {
        // Allow functional updates
        const valueToStore =
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(storedValue)
            : valueOrUpdater;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  // In case key changes, keep local state in sync
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error syncing localStorage key “${key}”:`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}
