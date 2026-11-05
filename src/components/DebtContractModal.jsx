import React from 'react';
import { sound } from '../utils/audio';
import { X, ShieldAlert, DollarSign } from 'lucide-react';

export default function DebtContractModal({ isOpen, onClose, loan, assets, onBorrow, onRepay }) {
  if (!isOpen) return null;

  return (
    <div className="noir-modal-backdrop animate-fadeIn" onClick={onClose}>
      <div className="noir-debt-modal-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="noir-debt-header">
          <div className="noir-debt-title">
            <span>📜</span>
            <span>명동 사채 차용증 각서 (신체포기조항)</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#ff9999', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="noir-debt-body">
          
          {/* Visual Contract Parchment Box */}
          <div className="debt-parchment-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #5a3122', paddingBottom: '4px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: '#ffbe1a', fontWeight: 800 }}>채권자 : 명동 큰손 마동석</span>
              <span style={{ fontSize: '0.72rem', color: '#ff4d63', fontWeight: 800 }}>이자율 : 연 35% (월복리)</span>
            </div>

            <p style={{ margin: '0 0 8px 0', fontSize: '0.78rem', lineHeight: 1.45 }}>
              "본 차용인은 명동 지하 금융사로부터 상기 원금을 차용하며, 기한 내 원리금을 전액 상환하지 못할 시 본인의 모든 주식 계좌와 자산을 즉시 강제 압류 및 처분함에 동의함."
            </p>

            {/* Blood Thumbprint Seal */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>채무자 각서 날인 (피지장):</span>
              <div style={{
                width: '32px',
                height: '38px',
                borderRadius: '4px',
                border: '1px solid #ff334b',
                background: 'rgba(255, 51, 75, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff334b',
                fontWeight: 900,
                fontSize: '1.2rem',
                transform: 'rotate(-10deg)',
                boxShadow: '0 0 8px rgba(255, 0, 0, 0.6)'
              }}>
                印
              </div>
            </div>
          </div>

          {/* Current Debt & Asset Status */}
          <div className="debt-stats-grid">
            <div className="debt-stat-cell">
              <div className="debt-stat-label">현재 총 사채 잔액</div>
              <div className="debt-stat-val text-bear" style={{ color: '#ff4d63' }}>
                {loan > 0 ? (loan / 100000000 >= 1 ? `${(loan / 100000000).toFixed(1)}억 원` : `${(loan / 10000).toLocaleString()}만 원`) : '0원 (깨끗한 상태)'}
              </div>
            </div>
            <div className="debt-stat-cell">
              <div className="debt-stat-label">가용 현금 자산</div>
              <div className="debt-stat-val text-bull" style={{ color: '#ffbe1a' }}>
                {assets / 100000000 >= 1 ? `${(assets / 100000000).toFixed(1)}억 원` : `${Math.floor(assets / 10000).toLocaleString()}만 원`}
              </div>
            </div>
          </div>

          {/* Loan Shark Ma Dong-seok Warning */}
          <div style={{
            padding: '8px 10px',
            borderRadius: '6px',
            background: 'rgba(255, 51, 75, 0.12)',
            border: '1px solid rgba(255, 51, 75, 0.4)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px',
            fontSize: '0.75rem',
            color: '#ff9999'
          }}>
            <ShieldAlert size={16} color="#ff334b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, wordBreak: 'keep-all' }}>
              "야 김 사장, 원금 못 갚으면 손모가지 날아가는 거야. 돈 더 필요하면 땡겨줄 테니 도장 찍든가."
            </p>
          </div>

          {/* Actions */}
          <div className="debt-actions-row">
            <button
              type="button"
              onClick={() => { sound.playBuy(); onBorrow(50000000); }}
              className="btn-debt-borrow"
            >
              🩸 5,000만 원 추가 대출
            </button>
            <button
              type="button"
              disabled={loan <= 0 || assets < 50000000}
              onClick={() => { sound.playBuy(); onRepay(50000000); }}
              className="btn-debt-repay"
            >
              💰 5,000만 원 우선 상환
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
