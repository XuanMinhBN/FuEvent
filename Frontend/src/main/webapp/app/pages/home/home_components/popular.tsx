import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './popular.scss';
import { CustomButton } from 'app/shared/components/button';
import { Translate } from 'react-jhipster';

export interface IPopularEvent {
  id: string | number;
  title: string;
  image: string;
  category: string;
  price: number;
  date: string;
  time: string;
  location: string;
  attendees: number;
}

interface IApiResponse {
  data: IPopularEvent[];
  success?: boolean;
  message?: string;
}

interface PopularEventsProps {
  selectedCategory: string;
}

export const PopularEvents: React.FC<PopularEventsProps> = ({ selectedCategory }) => {
  const [events, setEvents] = useState<IPopularEvent[]>([]);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchEvents = async () => {
  //       try {
  //         const res = await axios.get<IApiResponse>(`http://localhost:9999/api/binh/events/category?category=${selectedCategory}`);
  //         const eventList = res.data && res.data.data ? res.data.data : [];
  //         setEvents(eventList);
  //       } catch (err) {
  //         console.error('Error fetching popular events:', err);
  //         setEvents([]);
  //       }
  //     };
  //     fetchEvents();
  //   }, [selectedCategory]);

  return (
    <section className="popular-events section">
      <div className="container">
        <div
          className="section-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 className="section-title">{selectedCategory === 'All' ? 'Popular Events' : `${selectedCategory} Events`}</h3>
          <a href="/events" className="view-all">
            <Translate contentKey="global.view_all">View All Events →</Translate>
          </a>
        </div>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-category">{event.category}</div>
                <p className="event-price">{event.price === 0 ? 'Miễn phí' : `${event.price.toLocaleString('vi-VN')} ₫`}</p>
              </div>
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-details">
                  <div className="event-detail">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="event-detail">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="event-footer">
                  <div className="event-attendees">
                    {event.attendees} <Translate contentKey="global.attending">attending</Translate>
                  </div>
                  <CustomButton
                    name="View Details"
                    variant="outline"
                    className="btn btn-primary event-btn"
                    contentKey="global.view_detail"
                    icon={ArrowRight}
                    onClick={() => navigate(`/event/${event.id}`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {events.length === 0 && (
          <div className="no-events">
            <p>
              <Translate contentKey="global.no_event">No events found in this category.</Translate>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
