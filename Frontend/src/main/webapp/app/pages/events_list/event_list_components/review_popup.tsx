import React, { useState } from 'react';
import axios from 'axios';
import './review_popup.scss';
import { Translate } from 'react-jhipster';
import { CustomTextarea } from 'app/shared/components/textarea';
import { CustomButton } from 'app/shared/components/button';

interface ReviewPopupProps {
  eventId: string | number;
  userId: string | number;
  onClose: () => void;
  onReviewSubmit?: () => void;
}

export const ReviewPopup: React.FC<ReviewPopupProps> = ({ eventId, userId, onClose, onReviewSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //   e.preventDefault();
    //   if (!rating) return alert('Vui lòng chọn số sao trước khi gửi!');
    //   try {
    //     setLoading(true);
    //     await axios.post(`http://localhost:9999/api/review/${eventId}`, {
    //       user_id: userId,
    //       event_id: eventId,
    //       rating,
    //       comments: comment.trim(),
    //     });
    //     if (onReviewSubmit) {
    //       onReviewSubmit();
    //     }
    //     onClose();
    //   } catch (err) {
    //     console.error(err);
    //     alert('Gửi đánh giá thất bại!');
    //   } finally {
    //     setLoading(false);
    //   }
  };

  return (
    <div className="pu-review-popup" onClick={onClose}>
      <div className="pu-review-popup__content" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <h2>
          <Translate contentKey="global.feedback">Đánh giá sự kiện</Translate>
        </h2>
        <div className="pu-rating-stars">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`pu-star ${star <= (hover || rating) ? 'active' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        <CustomTextarea
          label="Comment"
          contentKey="global.share_feedback"
          className="pu-textarea"
          placeholder="Chia sẻ cảm nhận của bạn..."
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
        />

        <div className="pu-review-popup__actions">
          <CustomButton name="Gửi" className="pu-btn primary" onClick={handleSubmit} disabled={loading} />
          <CustomButton name="Đóng" className="pu-btn" onClick={onClose} disabled={loading} />
        </div>
      </div>
    </div>
  );
};
