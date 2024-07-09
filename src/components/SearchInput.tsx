import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { clsx } from 'clsx';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  error: boolean;
  isTyping: boolean;
}

const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  error,
  isTyping
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <input 
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={clsx({
        'sc-autocomplete__input': true,
        'sc-autocomplete__input--focused': isFocused && !isTyping,
        'sc-autocomplete__input--error': error,
        'sc-autocomplete__input--typing': isTyping && !error
      })}
    />
  );
}
export default SearchInput;
