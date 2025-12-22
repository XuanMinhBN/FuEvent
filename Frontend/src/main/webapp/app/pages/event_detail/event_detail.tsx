/* eslint-disable no-constant-condition */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './event_detail.scss';
import { LoadingPage } from './event_detail_components/loading_page';
import Header from 'app/shared/layout/header/header';
import { EventHero } from './event_detail_components/event';
import { TicketInfo } from './event_detail_components/ticket_info';
import { ReviewSection } from './event_detail_components/review_section';
import { EventCard } from '../events_list/event_list_components/event_card';
import Footer from 'app/shared/layout/footer/footer';
import { Sidebar } from './event_detail_components/sidebar';

interface Seller {
  full_name: string;
  email: string;
  phone_number: string;
  [key: string]: any;
}

interface EventData {
  id: string | number;
  category: string;
  seller?: Seller;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number | 0;
  date_end?: string;
  [key: string]: any;
  attendees?: any[];
}

interface Discount {
  id?: string;
  code?: string;
  percentage?: number;
  type?: string;
  [key: string]: any;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<EventData[]>([]);
  const [discount, setDiscount] = useState<Discount | Record<string, unknown>>({});
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    axios
      .get<ApiResponse<EventData>>(`http://localhost:9999/api/binh/events/${id}`)
      .then(res => {
        const eventData = res.data.data;
        setEvent(eventData);
        if (eventData?.category) {
          axios
            .get<ApiResponse<EventData[]>>(`http://localhost:9999/api/binh/events/category?category=${eventData.category}`)
            .then(res2 => {
              setRelatedEvents(res2.data.data || []);
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!event) return <LoadingPage />;

  const safeId = id || '';

  return (
    <div className="de-app">
      <Header />

      {/* EventHero đã có typing */}
      <EventHero event={event} />
      <div className="de-main-content">
        <div className="de-content-wrapper">
          <div className={`de-left-column ${!true ? 'de-full-width' : ''}`}>
            {/* <EventDetails event={event} /> */}
            <TicketInfo id={safeId} discount={discount} event={event} />
            <div className="de-sponsor-info">
              <h3>Nhà tổ chức</h3>
              <p>
                <strong>{event.seller?.full_name}</strong>
              </p>
              <p>Email: {event.seller?.email}</p>
              <p>Điện thoại: {event.seller?.phone_number}</p>
            </div>
            <div>{event && id && <ReviewSection eventId={safeId} reviews={reviews} setReviews={setReviews} />}</div>
            <div className="de-recommend-title">Có thể bạn cũng thích</div>
            <div className="de-events-grid">
              {relatedEvents
                .filter(e => e.id !== event.id)
                .map(e => (
                  <EventCard
                    key={e.id}
                    event={{
                      ...e,
                      id: e.id,
                      title: e.title || 'Sự kiện không tên',
                      image: e.image || 'https://via.placeholder.com/400x200?text=No+Image',
                      category: e.category || 'Khác',
                      attendees: e.attendees || [],
                      date: e.date || '',
                      time: e.time || '',
                      location: e.location || '',
                      price: e.price || 0,
                    }}
                  />
                ))}
            </div>
          </div>
          {/* Sidebar props đã được typing ở bước trước */}
          <div className="de-right-column">
            <Sidebar discount={discount} id={safeId} setDiscount={setDiscount} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
