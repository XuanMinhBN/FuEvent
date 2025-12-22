import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import './review_section.scss';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import { Translate } from 'react-jhipster';
import { CustomTextarea } from 'app/shared/components/textarea';
import { CustomButton } from 'app/shared/components/button';

interface ReviewUser {
  _id: string;
  full_name: string;
}

export interface ReviewData {
  _id?: string;
  user_id: ReviewUser | null;
  rating: number;
  comments: string;
  event_id?: string;
}

interface CurrentUser {
  id: string;
  full_name?: string;
  [key: string]: any;
}

interface ReviewSectionProps {
  eventId: string;
  reviews: ReviewData[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewData[]>>;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ eventId, reviews, setReviews }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const store = useStore<CurrentUser>();
  //   const user = store.dataUser || {};
  //   const userId = user.id || null;
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchReviews = async () => {
  //       if (!eventId) return;
  //       try {
  //         const res = await axios.get<{ reviews: ReviewData[] }>(`http://localhost:9999/api/review/${eventId}`);
  //         setReviews(res.data.reviews || []);
  //       } catch (err) {
  //         console.error('Lỗi khi tải review:', err);
  //       }
  //     };
  //     fetchReviews();
  //   }, [eventId, setReviews]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    // if (!userId) {
    //   alert('Vui lòng đăng nhập để gửi đánh giá!');
    //   navigate('/signin');
    //   return;
    // }
    // try {
    //   await axios.post(`http://localhost:9999/api/review/${eventId}`, {
    //     user_id: userId,
    //     event_id: eventId,
    //     rating,
    //     comments: comment,
    //   });
    //   setComment('');
    //   setRating(0);
    //   const res = await axios.get<{ reviews: ReviewData[] }>(`http://localhost:9999/api/review/${eventId}`);
    //   setReviews(res.data.reviews || []);
    // } catch (err) {
    //   console.error(err);
    //   alert('Gửi đánh giá thất bại!');
    // }
  };

  //   const sortedReviews = useMemo(() => {
  //     if (!reviews) return [];
  //     const myReviews = reviews.filter(r => r.user_id?._id === userId);
  //     const others = reviews.filter(r => r.user_id?._id !== userId);
  //     return [...myReviews, ...others];
  //   }, [reviews, userId]);

  return (
    <div className="review-section">
      {/* Form nhập */}
      <div className="review-form">
        <h4>
          <Translate contentKey="global.feedback">Đánh giá sự kiện này</Translate>
        </h4>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? 'active' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>
        <CustomTextarea
          contentKey="global.comment"
          label="Comment"
          placeholder="Viết cảm nhận của bạn..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <CustomButton name="Gửi đánh giá" contentKey="global.send_feedback" className="btn primary" onClick={handleSubmit} />
      </div>
      <div className="review-list">
        {/* {sortedReviews.length === 0 ? (
          <p className="no-review">
            <Translate contentKey="global.no_reviews">Chưa có đánh giá nào cho sự kiện này.</Translate>
          </p>
        ) : (
          sortedReviews.map((r, idx) => (
            <div key={r._id || idx} className={`review-item ${r.user_id?._id === userId ? 'my-review' : ''}`}>
              <div className="review-header">
                <span className="review-user">{r.user_id?._id === userId ? 'Bạn' : r.user_id?.full_name || 'Người dùng ẩn danh'}</span>
                <span className="review-stars">
                  {'★'.repeat(r.rating)}
                  {'☆'.repeat(5 - r.rating)}
                </span>
              </div>
              <p className="review-comment">{r.comments}</p>
            </div>
          ))
        )} */}
      </div>
    </div>
  );
};
