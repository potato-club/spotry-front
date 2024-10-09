import { useState, useCallback } from "react";
import { UseInputFieldResult } from "../types/Login";

const useLoginInput = (initialPlaceholder: string): UseInputFieldResult => {
  const [value, setValue] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>(initialPlaceholder);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    if (!isFocused) {
      setPlaceholder("");
    }
    setIsFocused(true);
  }, [isFocused]);

  const onBlur = useCallback(() => {
    if (value === "") {
      setPlaceholder(initialPlaceholder);
    }
    setIsFocused(false);
  }, [value, initialPlaceholder]);

  return {
    value,
    setValue,
    placeholder,
    onFocus,
    onBlur,
    isFocused,
  };
};

export default useLoginInput;
