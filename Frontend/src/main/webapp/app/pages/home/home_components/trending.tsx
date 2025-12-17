import React, { useEffect, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './trending.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ITrendingEvent {
  id: string | number;
  name: string;
  image: string;
  date: string;
}

interface IApiResponse {
  data: ITrendingEvent[];
  message?: string;
  success?: boolean;
}

export const TrendingEvents: React.FC = () => {
  const navigate = useNavigate();
  const [trendingEvents, setTrendingEvents] = useState<ITrendingEvent[]>([]);

  //   useEffect(() => {
  //     axios
  //       .get<IApiResponse>('http://localhost:9999/api/binh/trendings')
  //       .then(res => {
  //         if (res.data && Array.isArray(res.data.data)) {
  //           setTrendingEvents(res.data.data);
  //         }
  //       })
  //       .catch(err => console.error(err));
  //   }, []);

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
        },
      },
    ],
  };

  return (
    <div className="container">
      <div className="trending-container">
        <div className="trending-header">
          <span className="emoji">🔥</span>
          <h1>Trending Events</h1>
        </div>
        {trendingEvents.length > 0 ? (
          <Slider {...settings}>
            {trendingEvents.map((event, index) => (
              <div key={event.id} className="trending-card">
                <span className="rank">{index + 1}</span>
                <div className="image-wrapper">
                  <img
                    onClick={() => navigate(`/event/${event.id}`)}
                    src={event.image}
                    alt={event.name}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </div>
                <p className="event-name">{event.name}</p>
                <p className="event-date">{event.date}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p>Đang tải sự kiện nổi bật...</p>
        )}
      </div>
    </div>
  );
};
