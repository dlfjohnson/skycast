import { clsx } from 'clsx';

import { Location } from '../types/types';

interface SearchResultItemProps {
  data: Location;
  isActive: boolean;
  onMouseOver: () => void;
  onSelect: () => void;
}

const SearchResultItem = ({
  data,
  isActive,
  onMouseOver,
  onSelect
}: SearchResultItemProps) => {
  const { name, admin1, country } = data;

  return (
    <li
      onMouseOver={onMouseOver}
      onClick={onSelect}
      className={clsx({
        'sc-autocomplete__search-result': true,
        'sc-autocomplete__search-result--active': isActive,
      })}
    >
      {name}{admin1 ? `, ${admin1}` : ''}{country ? `, ${country}` : null}
    </li>
  );
};

export default SearchResultItem;
