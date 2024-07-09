import { Feature } from '../types/types';

import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  data: any;
  cursor: number;
  onMouseOver: (e: number) => void;
  onSelect: (address: Feature) => void;
  noResultsFoundMessage: string;
}

const SearchResults = ({
  data,
  cursor,
  onMouseOver,
  onSelect,
  noResultsFoundMessage
}: SearchResultsProps) => (
  <ul className="sc-autocomplete__search-results">
    {data?.length ? (
      data.map((item: any, i: number) => 
        <SearchResultItem
          key={item.id}
          data={item}
          isActive={cursor === i}
          onMouseOver={() => onMouseOver(i)}
          onSelect={() => onSelect(item)}
        />
      )
    ) : (
      <li className="sc-autocomplete__search-result" style={{width: '400px'}}>
        {noResultsFoundMessage}
      </li>
    )}
  </ul>
);

export default SearchResults;
