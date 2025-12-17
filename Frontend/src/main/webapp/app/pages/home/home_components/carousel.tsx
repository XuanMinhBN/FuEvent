import React, { useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './EventCarousel.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from 'app/shared/components/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Translate } from 'react-jhipster';
import './carousel.scss';

export interface IEvent {
  id: string | number;
  img: string;
  title: string;
  price: number;
  date: string;
  [key: string]: any;
}

interface IApiResponse {
  data: IEvent[];
  success?: boolean;
  message?: string;
}

type TabType = 'week' | 'month';

export const EventCarousel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('week');
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchEvents = async () => {
  //       setLoading(true);
  //       try {
  //         const res = await axios.get<IApiResponse>(`http://localhost:9999/api/binh/events?mode=${activeTab}`);

  //         if (res.data && Array.isArray(res.data.data)) {
  //           setEvents(res.data.data);
  //         } else {
  //           setEvents([]);
  //         }
  //       } catch (err) {
  //         console.error('Error fetching events:', err);
  //         setEvents([]);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchEvents();
  //   }, [activeTab]);

  return (
    <div className="container">
      <div className="event-section">
        <div className="flex justify-between items-center mb-4">
          <div className="tabs flex gap-2">
            <CustomButton
              name="Cuối tuần này"
              contentKey="global.this_weekend"
              variant={activeTab === 'week' ? 'default' : 'outline'}
              onClick={() => setActiveTab('week')}
              className={`rounded-full transition-all ${activeTab === 'week' ? 'shadow-md' : ''}`}
            />
            <CustomButton
              name="Tháng này"
              contentKey="global.this_month"
              variant={activeTab === 'month' ? 'default' : 'outline'}
              onClick={() => setActiveTab('month')}
              className={`rounded-full transition-all ${activeTab === 'month' ? 'shadow-md' : ''}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <Link to="/events" className="see-more mr-4 text-blue-600 hover:underline">
              <Translate contentKey="global.more">Xem thêm</Translate>
            </Link>
            <CustomButton
              variant="outline"
              size="icon"
              icon={ChevronLeft}
              name=""
              disabled={isBeginning || events.length === 0}
              onClick={() => swiperInstance?.slidePrev()}
            />
            <CustomButton
              variant="outline"
              size="icon"
              icon={ChevronRight}
              name=""
              disabled={isEnd || events.length === 0}
              onClick={() => swiperInstance?.slideNext()}
            />
          </div>
        </div>
        <div className="event-carousel">
          {loading && <p>Đang tải dữ liệu...</p>}
          {!loading && events.length === 0 && <p className="no-events-text">Khoảng thời gian này không có sự kiện</p>}
          {!loading && events.length > 0 && (
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={3.5}
              onSwiper={swiper => setSwiperInstance(swiper)}
              onSlideChange={swiper => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 10 },
                640: { slidesPerView: 2.2, spaceBetween: 15 },
                1024: { slidesPerView: 3.5, spaceBetween: 20 },
              }}
            >
              {events.map(event => (
                <SwiperSlide key={event.id}>
                  <div
                    className="event-card cursor-pointer group"
                    onClick={() => navigate(`/event/${event.id}`)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={event.img}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="card-body mt-2">
                      <h3 className="card-title font-bold text-lg">{event.title}</h3>
                      <p className="card-price text-red-500 font-semibold">
                        {event.price === 0 ? 'Miễn phí' : `${event.price.toLocaleString('vi-VN')} ₫`}
                      </p>
                      <p className="card-date text-gray-500 text-sm">📅 {event.date}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};
