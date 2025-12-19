import React, { useEffect, useState } from 'react';
import './loading_page.scss';
import { Translate } from 'react-jhipster';

export const LoadingPage: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  //   useEffect(() => {
  //     let p = 0;
  //     let animationFrameId: number;
  //     const tick = () => {
  //       const inc = Math.max(0.4, (100 - p) * 0.03);
  //       p = Math.min(100, +(p + inc).toFixed(2));
  //       setProgress(p);
  //       if (p < 99.7) {
  //         animationFrameId = requestAnimationFrame(tick);
  //       } else {
  //         setTimeout(() => setProgress(100), 300);
  //       }
  //     };
  //     animationFrameId = requestAnimationFrame(tick);
  //     return () => cancelAnimationFrame(animationFrameId);
  //   }, []);

  return (
    <main className="lp-card" role="status" aria-live="polite">
      <div className="lp-logo-wrap">
        <div className="lp-blob">
          <div className="lp-glow"></div>
          <div className="lp-ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="48" strokeOpacity="0.06" />
              <circle className="lp-dash" cx="60" cy="60" r="48" />
            </svg>
          </div>
          <div className="lp-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="12" rx="2" fill="white" fillOpacity="0.12" />
              <rect x="6" y="7" width="12" height="1.6" rx="0.8" fill="white" fillOpacity="0.2" />
              <rect x="6" y="10.2" width="6" height="1.6" rx="0.8" fill="white" fillOpacity="0.2" />
            </svg>
          </div>
        </div>
      </div>

      <div className="lp-meta">
        <h1>
          <Translate contentKey="global.loading">Đang tải — Xin chờ tý</Translate>
        </h1>
        <p>
          <Translate contentKey="eventDetail.loadingMessage">Chuẩn bị nội dung cho bạn...</Translate>
        </p>
        <div className="lp-progress">
          <div className="lp-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="lp-sub">
          <div className="lp-dots">
            <span className="lp-dot"></span>
            <span className="lp-dot"></span>
            <span className="lp-dot"></span>
          </div>
          <div className="lp-small">{Math.floor(progress)}%</div>
        </div>
        <div className="lp-small">© Tymie / FlexiCore</div>
      </div>
    </main>
  );
};
