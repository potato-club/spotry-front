export interface UseInputFieldResult {
  value: string;
  setValue: (value: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}
