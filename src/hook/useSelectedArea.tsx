import { useState } from "react";

function useSelectedArea<T>(initialValue: T) {
  const [selected, setSelected] = useState<T>(initialValue);
  const toggleSelect = (value: T): void => {
    setSelected(value);
  };

  return { selected, toggleSelect };
}

export default useSelectedArea;
