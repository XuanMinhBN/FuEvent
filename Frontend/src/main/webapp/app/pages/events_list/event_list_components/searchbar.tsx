import React, { Dispatch, SetStateAction } from 'react';
import { Search } from 'lucide-react';
import './searchbar.scss';

interface SearchFormProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

export const SearchForm: React.FC<SearchFormProps> = ({ keyword, setKeyword }) => {
  return (
    <div className="search-form">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search events, artists, venues..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="input search-input"
          />
        </div>
      </div>
    </div>
  );
};
