import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Users, Star, Info, MessageSquare } from 'lucide-react';
import './event_card.scss';
import { CustomButton } from 'app/shared/components/button';
import { ReviewPopup } from './review_popup';

export interface IEvent {
  category: any;
  id: number | string;
  image: string;
  title: string;
  price: number;
  date: string;
  date_end?: string;
  time: string;
  location: string;
  artist?: string;
  attendees: number;
}

interface EventCardProps {
  event: IEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const [avgRating, setAvgRating] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const getUserId = () => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser).id : null;
    } catch (error) {
      return null;
    }
  };
  const userId = getUserId();

  //   useEffect(() => {
  //     const fetchReviews = async () => {
  //       try {
  //         const res = await axios.get(`http://localhost:9999/api/review/${event.id}`);
  //         setAvgRating(res.data.averageRating || 0);
  //       } catch (err) {
  //         console.error('Lỗi khi tải review:', err);
  //       }
  //     };
  //     fetchReviews();
  //   }, [event.id]);

  const handleReviewSubmit = async () => {
    // try {
    //   const res = await axios.get(`http://localhost:9999/api/review/${event.id}`);
    //   setAvgRating(res.data.averageRating || 0);
    // } catch (err) {
    //   console.error('Không thể tải lại rating:', err);
    // }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getEventStatus = (startDate: string, endDate?: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(startDate);

    if (today < start) return 'Sắp tới';
    if (today > end) return 'Đã qua';
    return 'Đang diễn ra';
  };

  return (
    <div className="event-card">
      <div className="event-card__image">
        <img src={event.image} alt={event.title} />
        <div className="event-card__price">{event.price === 0 ? 'Miễn phí' : `${event.price.toLocaleString('vi-VN')} ₫`}</div>
        <div className={`event-status ${getEventStatus(event.date, event.date_end) === 'Sắp tới' ? 'upcoming' : ''}`}>
          {getEventStatus(event.date, event.date_end)}
        </div>
      </div>
      <div className="event-card__details">
        <h3 className="line-clamp-2" title={event.title}>
          {event.title}
        </h3>
        {event.artist && <p className="text-muted-foreground">{event.artist}</p>}
        <div className="event-card__info-group">
          <div className="event-card__row">
            <Calendar className="icon-sm" />
            <span>
              {formatDate(event.date)} • {event.time}
            </span>
          </div>
          <div className="event-card__row">
            <MapPin className="icon-sm" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        <div className="event-card__attendees">
          <div className="flex items-center gap-1">
            <Users className="icon-sm" />
            <span>{event.attendees.toLocaleString()} quan tâm</span>
          </div>
          <div className="rating flex items-center gap-1 text-yellow-500 font-medium">
            <Star className="icon-sm fill-yellow-500" />
            {avgRating > 0 ? avgRating.toFixed(1) : 'N/A'}
          </div>
        </div>
        <div className="event-card__actions grid grid-cols-2 gap-2 mt-4">
          <CustomButton variant="default" icon={Info} name="Chi tiết" onClick={() => navigate(`/event/${event.id}`)} className="w-full" />
          <CustomButton
            variant="outline"
            icon={MessageSquare}
            name="Đánh giá"
            onClick={e => {
              e.stopPropagation();
              if (!userId) {
                alert('Bạn cần đăng nhập để đánh giá!');
                return;
              }
              setShowPopup(true);
            }}
            className="w-full"
          />
        </div>
      </div>

      {showPopup && userId && (
        <ReviewPopup eventId={event.id} userId={userId} onClose={() => setShowPopup(false)} onReviewSubmit={handleReviewSubmit} />
      )}
    </div>
  );
};
