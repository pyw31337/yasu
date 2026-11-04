import React from 'react';
import { Newspaper, TrendingUp, AlertTriangle, X } from 'lucide-react';

export default function NewspaperModal({ yearData, onClose }) {
  if (!yearData) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="newspaper-container" onClick={(e) => e.stopPropagation()}>
        <button className="newspaper-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="newspaper-header">
          <div className="newspaper-meta">
            <span>대한민국 경제일보 호외 (特別號)</span>
            <span>서기 {yearData.year}년 특보</span>
            <span>지령 제{yearData.year * 7}호</span>
          </div>
          <h1 className="newspaper-title">{yearData.headline}</h1>
          <div className="newspaper-indices">
            <span className="index-pill">
              KOSPI <strong>{yearData.kospi} pt</strong> ({yearData.kospiChange >= 0 ? '+' : ''}{(yearData.kospiChange * 100).toFixed(1)}%)
            </span>
            <span className="index-pill">
              원/달러 환율 <strong>{yearData.exchangeRate} 원</strong>
            </span>
            <span className="index-pill">
              기준금리 <strong>{yearData.interestRate}%</strong>
            </span>
          </div>
        </div>

        <div className="newspaper-body">
          <div className="newspaper-article">
            <h3 className="article-subtitle">■ 당시 시대상과 경제 충격의 전말</h3>
            <p className="article-text">{yearData.eventDetail}</p>
          </div>

          {yearData.brokerTip && (
            <div className="broker-whisper">
              <div className="broker-whisper-title">
                <AlertTriangle size={18} color="#ffbe1a" />
                <span>여의도 증권가 특급 찌라시 (비공식 정보)</span>
              </div>
              <p className="broker-whisper-text">"{yearData.brokerTip}"</p>
              <span className="broker-warning">* 주의: 찌라시는 80%의 기회 또는 20%의 치명적 함정일 수 있습니다!</span>
            </div>
          )}
        </div>

        <div className="newspaper-footer">
          <button className="btn-newspaper-confirm" onClick={onClose}>
            호외 확인 완료 (장 개장 준비)
          </button>
        </div>
      </div>
    </div>
  );
}
