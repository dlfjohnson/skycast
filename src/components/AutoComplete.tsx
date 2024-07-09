import React, { useState, Dispatch, SetStateAction } from 'react';
import { clsx } from 'clsx';

import { useDebounce } from '../hooks/useDebounce';

import useSearchLocation from '../hooks/useSearchLocation';

import { Location } from '../types/types';

import { INPUT_PLACEHOLDER, NO_RESULTS_FOUND_MESSAGE } from '../constants/constants';

import SearchInput from './SearchInput';
import ClearButton from './ClearButton';
import SearchResults from './SearchResults';

interface AutoCompleteProps {
  setLocation: Dispatch<SetStateAction<Location | null>>;
}

const Autocomplete: React.FC<AutoCompleteProps> = ({ setLocation }) => {
  const [inputValue, setInputValue] = useState('');
  const [cursor, setCursor] = useState(0);
  const debouncedInputValue = useDebounce(inputValue, 350);
  const { isLoading, error, locations } = useSearchLocation(debouncedInputValue);
  const showSearchResults = locations?.length && (locations.length > 0) ? true : false;
  const showClearButtonIcon = (inputValue !== '') && !isLoading;
  const showNoResultsFoundMsg = locations?.length === 0;
  const showResultsList = (showSearchResults || showNoResultsFoundMsg) && (inputValue !== '') ? true : false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCursor(0);
    setInputValue(e.target.value);
  };

  const handleClearButtonClick = () => {
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!locations) return;
    const locationsLength = locations.length ?? 0;

    if (e.key === 'ArrowUp' && (cursor > 0)) {
      e.preventDefault()
      setCursor(prevState => prevState - 1);
    } else if (e.key === 'ArrowDown' && (cursor < locationsLength - 1) ) {
      setCursor(prevState => prevState + 1);
    } else if (e.key === 'Enter') {
      handleSelect(locations[cursor]);
    }
  };

  const handleMouseOver = (index: number) => {
    setCursor(index);
  };

  const handleSelect = (location: any) => {
    // TODO: Execute required action when user selects an address
    setLocation(location);
    handleClearButtonClick();
    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement) {
      activeElement.blur();
    }
  };

  return (
    <div className="sc-autocomplete">
      <div
        className={clsx({
          'sc-autocomplete__container': true,
          'sc-autocomplete__container--pending': isLoading
        })}
      >
        <SearchInput
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={INPUT_PLACEHOLDER}
          error={!!error}
          isTyping={inputValue !== ''}
        />
        <div className="sc-autocomplete__icon">
          {isLoading && <div className="sc-autocomplete__spinner" />}
          {showClearButtonIcon &&
            <ClearButton onClick={handleClearButtonClick} />
          }
        </div>
      </div>
      {showResultsList && (
        <SearchResults
          data={locations}
          cursor={cursor}
          onMouseOver={handleMouseOver}
          onSelect={handleSelect}
          noResultsFoundMessage={NO_RESULTS_FOUND_MESSAGE}
        />
      )}
    </div>
  )
};

export default Autocomplete;