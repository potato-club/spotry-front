import { useState, useCallback } from "react";
import { UseInputFieldResult } from "../types/Login";

const useLoginInput = (placeholder: string): UseInputFieldResult => {
  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // 포커스 상태를 설정하는 함수
  const onFocus = useCallback(() => {
    if (value === placeholder) {
      setValue("");
    }
    setIsFocused(true);
  }, [value, placeholder]);

  // 블러 상태를 설정하는 함수
  const onBlur = useCallback(() => {
    if (value === "") {
      setValue(placeholder);
    }
    setIsFocused(false);
  }, [value, placeholder]);

  return {
    value,
    setValue,
    isFocused,
    onFocus,
    onBlur,
  };
};

export default useLoginInput;
