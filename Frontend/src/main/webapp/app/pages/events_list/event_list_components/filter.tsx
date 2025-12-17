import React, { Dispatch, SetStateAction } from 'react';
import './FilterSidebar.css';
import { priceRanges } from './constants';
import { CustomSelect } from 'app/shared/components/select';
import { CustomButton } from 'app/shared/components/button';
import { Check, RotateCcw, X } from 'lucide-react';

export interface IFilters {
  category: string;
  price: string;
  location: string;
  from: string;
  to: string;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  onApply: (filters: IFilters) => void;
  onClear: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, filters, setFilters, onApply, onClear }) => {
  const categories: string[] = ['All', 'Academic', 'Music', 'Workshop', 'Club', 'Sports', 'Career', 'Festival', 'Technology', 'Other'];
  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'FPT University Hanoi Campus', label: 'Hà Nội' },
    { value: 'FPT University HCM Campus', label: 'Hồ Chí Minh' },
    { value: 'FPT University Can Tho Campus', label: 'Cần Thơ' },
  ];

  const handleFilterChange = (field: keyof IFilters, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Filters</h3>
          <CustomButton variant="ghost" size="icon" icon={X} onClick={onClose} className="h-8 w-8" name="" />
        </div>
        <div className="filter-section">
          <h4>Categories</h4>
          <div className="radio-group-grid">
            {' '}
            {categories.map(cat => (
              <label key={cat} className="radio-label">
                <input
                  type="radio"
                  name="category"
                  value={cat.toLowerCase()}
                  checked={filters.category === cat.toLowerCase()}
                  onChange={e => handleFilterChange('category', e.target.value)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <h4>Price Range</h4>
          <div>
            {priceRanges.map((price: { label: string }) => (
              <label key={price.label} className="radio-label">
                <input
                  type="radio"
                  name="price"
                  value={price.label}
                  checked={filters.price === price.label}
                  onChange={e => handleFilterChange('price', e.target.value)}
                />
                {price.label}
              </label>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <h4>Location</h4>
          <CustomSelect
            options={locationOptions}
            value={filters.location}
            onChange={value => handleFilterChange('location', value)}
            placeholder="Select a campus"
            className="w-full"
          />
        </div>
        <div className="filter-section">
          <h4>Date Range</h4>
          <div className="date-range">
            <div className="date-input-group">
              <label>From</label>
              <input type="date" value={filters.from || ''} onChange={e => handleFilterChange('from', e.target.value)} />
            </div>
            <div className="date-input-group">
              <label>To</label>
              <input type="date" value={filters.to || ''} onChange={e => handleFilterChange('to', e.target.value)} />
            </div>
          </div>
        </div>
        <div className="filter-actions">
          <CustomButton
            variant="default"
            name="Apply Filters"
            icon={Check}
            onClick={() => {
              onApply(filters);
              onClose();
            }}
            className="w-full justify-center apply-btn"
          />
          <CustomButton variant="outline" name="Clear All" icon={RotateCcw} onClick={onClear} className="w-full justify-center clear-btn" />
        </div>
      </div>
    </>
  );
};
