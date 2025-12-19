import React from 'react';
import './details.scss';
import { Translate } from 'react-jhipster';

interface EventData {
  title: string;
  videoUrl?: string;
}

interface EventDetailsProps {
  event: EventData;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="event-details">
      <h2>
        <Translate contentKey="global.introduction">Giới thiệu</Translate>
      </h2>
      <div className="video-container">
        {event.videoUrl ? (
          <iframe
            src={event.videoUrl}
            title={event.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="video-placeholder">
            <div className="play-button">▶</div>
            <div className="video-title">{event.title}</div>
          </div>
        )}
      </div>
    </div>
  );
}
