import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Ticket } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './banner.scss';
import { CustomButton } from 'app/shared/components/button';

export interface IBannerEvent {
  id: string | number;
  image: string;
  title: string;
  subtitle?: string;
  category?: string;
  date: string;
  time: string;
  location: string;
}

interface IApiResponse {
  success: boolean;
  data: IBannerEvent[];
  message?: string;
}

export const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [featuredEvents, setFeaturedEvents] = useState<IBannerEvent[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get<IApiResponse>('http://localhost:9999/api/binh/banners')
      .then(res => {
        if (res.data && Array.isArray(res.data.data)) {
          setFeaturedEvents(res.data.data);
        } else {
          console.warn('API response format unexpected', res.data);
        }
      })
      .catch(err => console.error('Error fetching banners:', err));
  }, []);

  useEffect(() => {
    if (featuredEvents.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredEvents.length]);

  const nextSlide = () => {
    if (featuredEvents.length === 0) return;
    setCurrentSlide(prev => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    if (featuredEvents.length === 0) return;
    setCurrentSlide(prev => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (featuredEvents.length === 0) {
    return null;
  }

  return (
    <section className="banner">
      <div className="banner-container">
        <div className="banner-slider">
          {featuredEvents.map((event, index) => (
            <div key={event.id} className={`banner-slide ${index === currentSlide ? 'active' : ''}`}>
              <div className="banner-image">
                <img src={event.image} alt={event.title} />
                <div className="banner-overlay"></div>
              </div>
              <div className="banner-content">
                <div className="container">
                  <div className="banner-text">
                    <span className="banner-category">{event.category}</span>
                    <h1 className="banner-title">{event.title}</h1>
                    <p className="banner-subtitle">{event.subtitle}</p>
                    <div className="banner-details">
                      <div className="banner-detail">
                        <Calendar size={18} />
                        <span>
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <div className="banner-detail">
                        <MapPin size={18} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="banner-actions">
                      <CustomButton
                        name="Get Tickets"
                        icon={Ticket}
                        contentKey="global.get_ticket"
                        className="btn-secondary"
                        onClick={() => navigate(`/event/${event.id}`)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CustomButton
          icon={ChevronLeft}
          contentKey="global.previous"
          className="banner-nav banner-nav-prev"
          onClick={prevSlide}
          type="button"
        />
        <CustomButton
          icon={ChevronRight}
          contentKey="global.next"
          className="banner-nav banner-nav-next"
          onClick={nextSlide}
          type="button"
        />
        <div className="banner-dots">
          {featuredEvents.map((_, index) => (
            <CustomButton
              key={index}
              className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
              contentKey="global.banner_dot"
              onClick={() => goToSlide(index)}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
