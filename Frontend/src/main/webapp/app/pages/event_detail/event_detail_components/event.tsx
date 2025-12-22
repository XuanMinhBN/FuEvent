import React from 'react';
import { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import './event.scss';
import { Helmet } from 'react-helmet';
import { CustomButton } from 'app/shared/components/button';
import { Translate } from 'react-jhipster';

interface EventData {
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  date_end?: string;
}

interface EventHeroProps {
  event: EventData | null;
}

interface ShareOptions {
  url?: string;
  quote?: string;
}

export const EventHero: React.FC<EventHeroProps> = ({ event }) => {
  const [copied, setCopied] = useState<boolean>(false);
  if (!event) return null;
  const link = 'https://ticketfu-font-end.vercel.app/';
  const onShare = (e: React.MouseEvent<HTMLButtonElement>, { url = link, quote }: ShareOptions) => {
    e.preventDefault();
    const shareUrl =
      'https://www.facebook.com/sharer/sharer.php?u=' +
      encodeURIComponent(url) +
      '&quote=' +
      encodeURIComponent(quote || `Tham gia ngay sự kiện ${event.title}!`);
    const w = 650;
    const h = 450;
    const left = Math.floor((window.screen.width - w) / 2);
    const top = Math.floor((window.screen.height - h) / 2);
    window.open(shareUrl, 'fbshare', `width=${w},height=${h},left=${left},top=${top},menubar=0,toolbar=0,scrollbars=1`);
  };

  const onCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const parseDate = (dateStr?: string): Date | null => {
    if (!dateStr) return null;
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateStr);
  };

  const now = new Date();
  const eventEnd = parseDate(event.date_end) || parseDate(event.date);
  const isExpired = eventEnd ? eventEnd < now : false;

  return (
    <div className="event-hero">
      {/* 🌐 SEO + Facebook share meta tags */}
      <Helmet>
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={`Tham gia ngay sự kiện ${event.title}!`} />
        <meta property="og:image" content={event.image} />
        <meta property="og:url" content={link} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="event-hero-content">
        <div className="event-info">
          <h1 className="event-title">{event.title}</h1>
          <div className="event-meta">
            <span className="event-date">
              📅 {event.date} {event.time}
            </span>
          </div>
          <div className="location">
            <span className="location-icon">📍</span>
            <div className="location-text">
              <p>{event.location}</p>
              {event.date_end && (
                <p className="location-detail">
                  <Translate contentKey="global.end_date">Kết thúc:</Translate>
                  {event.date_end}
                </p>
              )}
            </div>
          </div>
          <div className="pricing">
            <span className="price-label">Giá từ</span>
            <span className="price">
              {event.price === 0 ? <Translate contentKey="global.free">Miễn phí</Translate> : `${event.price.toLocaleString('vi-VN')} ₫`}
            </span>
            <span className="price-arrow">›</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isExpired ? (
              <CustomButton name="Đã quá hạn" contentKey="global.out_expired" className="cta-button expired" disabled />
            ) : (
              <CustomButton name="Chọn loại vé" contentKey="global.out_expired" className="cta-button" />
            )}
            <div className="share-buttons">
              {/* 📤 Chia sẻ Facebook */}
              <CustomButton
                name="Chia sẻ lên Facebook"
                icon={Share2}
                contentKey="global.out_expired"
                className="share-button"
                onClick={e =>
                  onShare(e, {
                    url: link,
                    quote: `Tham gia ngay sự kiện ${event.title}!`,
                  })
                }
              />
              {/* 🔗 Sao chép liên kết */}
              <CustomButton
                name={copied ? 'Đã sao chép' : 'Sao chép liên kết'}
                contentKey="global.copy_link"
                icon={copied ? Check : LinkIcon}
                onClick={onCopyLink}
                className={`share-button ${copied ? 'copied' : ''}`}
              />
            </div>
          </div>
        </div>
        <div className="event-artwork">
          <div className="artwork-container">
            <img src={event.image} alt={event.title} className="event-image" />
          </div>
        </div>
      </div>
    </div>
  );
};
