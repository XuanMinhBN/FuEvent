import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { EventCard, IEvent } from './event_list_components/event_card';
import { FilterSidebar, IFilters } from './event_list_components/filter';
import { priceRanges } from './event_list_components/constants';
import Header from 'app/shared/layout/header/header';
import { SearchForm } from './event_list_components/searchbar';
import Footer from 'app/shared/layout/footer/footer';
import { CustomButton } from 'app/shared/components/button';
import { Translate } from 'react-jhipster';
import './events_list.scss';

interface LocationState {
  category?: string;
  location?: string;
}

interface PriceRangeItem {
  label: string;
  min: number | null;
  max: number | null;
}

interface ApiResponse {
  data: IEvent[];
  message: string;
}

export const EventList: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const initialCategory = state?.category || 'all';
  const initialLocation = state?.location || 'all';
  const [tempFilters, setTempFilters] = useState<IFilters>({
    from: '',
    to: '',
    location: initialLocation,
    price: 'all',
    category: initialCategory,
  });
  const [appliedFilters, setAppliedFilters] = useState<IFilters>(tempFilters);
  const [keyword, setKeyword] = useState<string>('');
  const [events, setEvents] = useState<IEvent[]>([]);

  //   useEffect(() => {
  //     axios
  //       .get<ApiResponse>(`http://localhost:9999/api/binh/events/category?category=All`)
  //       .then(res => {
  //         const allEvents = res.data.data || [];
  //         const lowerKeyword = keyword.toLowerCase();
  //         const filtered = allEvents.filter(event => {
  //           const start = new Date(event.date);
  //           const end = event.date_end ? new Date(event.date_end) : new Date(event.date);
  //           if (appliedFilters.from) {
  //             const fromDate = new Date(appliedFilters.from);
  //             if (end.getTime() < fromDate.getTime()) return false;
  //           }
  //           if (appliedFilters.to) {
  //             const toDate = new Date(appliedFilters.to);
  //             if (start.getTime() > toDate.getTime()) return false;
  //           }
  //           if (appliedFilters.price !== 'all') {
  //             const range = (priceRanges as PriceRangeItem[]).find(p => p.label === appliedFilters.price);
  //             const priceValue = Number(event.price);
  //             if (range) {
  //               if (range.min !== null && priceValue < range.min) return false;
  //               if (range.max !== null && priceValue > range.max) return false;
  //             }
  //           }
  //           if (appliedFilters.category.toLowerCase() !== 'all' && event.category?.toLowerCase() !== appliedFilters.category.toLowerCase()) {
  //             return false;
  //           }
  //           if (lowerKeyword) {
  //             const matchTitle = event.title?.toLowerCase().includes(lowerKeyword);
  //             const matchArtist = event.artist?.toLowerCase().includes(lowerKeyword);
  //             if (!matchTitle && !matchArtist) {
  //               return false;
  //             }
  //           }

  //           return true;
  //         });
  //         setEvents(filtered);
  //       })
  //       .catch(err => console.error(err));
  //   }, [appliedFilters, keyword]);

  return (
    <div className="app-container">
      <Header />
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <Translate contentKey="eventsList.title">Explore Events</Translate>
            </h1>
            <p>
              <Translate contentKey="eventsList.subtitle">Discover events tailored to your interests.</Translate>
            </p>
          </div>
        </div>
        <div>
          <SearchForm keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>
      <div className="main-content">
        <div className="content-layout">
          <div className="events-section">
            <div className="results-header">
              <div>
                <h2>
                  <Translate contentKey="global.all_events">All Events</Translate>
                </h2>
                <p>
                  {events.length} events found {appliedFilters.from && `from ${appliedFilters.from}`}{' '}
                  {appliedFilters.to && `to ${appliedFilters.to}`} {appliedFilters.location !== 'all' && `in ${appliedFilters.location}`}{' '}
                  {appliedFilters.category !== 'all' && `category: ${appliedFilters.category}`}
                </p>
              </div>
              <CustomButton contentKey="global.filter" name="Filters" onClick={() => setSidebarOpen(true)} className="filter-btn" />
            </div>
            <div className="events-grid">
              {events.length > 0 ? (
                events.map(event => <EventCard key={event.id} event={event} />)
              ) : (
                <div className="no-results">No events found matching your criteria.</div>
              )}
            </div>
          </div>
        </div>
        <FilterSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          filters={tempFilters}
          setFilters={setTempFilters}
          onApply={newFilters => {
            setAppliedFilters(newFilters);
            setSidebarOpen(false);
          }}
          onClear={() => {
            const reset: IFilters = {
              from: '',
              to: '',
              location: 'all',
              price: 'all',
              category: 'all',
            };
            setTempFilters(reset);
            setAppliedFilters(reset);
            setKeyword('');
          }}
        />
      </div>
      <Footer />
    </div>
  );
};
