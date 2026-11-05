import React from 'react';
import { sound } from '../utils/audio';
import { X, ShieldAlert, DollarSign } from 'lucide-react';

export default function DebtContractModal({ isOpen, onClose, loan, assets, onBorrow, onRepay }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 md:p-6 animate-fadeIn select-none">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#18110c] to-[#0a0705] border-2 border-red-700/80 rounded-2xl shadow-[0_0_50px_rgba(255,51,75,0.4)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-red-950/70 border-b border-red-800/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h3 className="text-lg md:text-xl font-black text-red-200 tracking-tight font-serif">
              명동 사채 차용증 각서 (신체포기조항)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-red-900/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-5 text-slate-300 text-sm">
          
          {/* Visual Contract Parchment Box */}
          <div className="relative p-5 rounded-xl border border-amber-900/40 bg-[#1e1610]/80 shadow-inner space-y-3 font-serif">
            <div className="flex justify-between items-start border-b border-amber-800/30 pb-2">
              <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">채권자 : 명동 큰손 마동석</span>
              <span className="text-xs text-red-400 font-bold">이자율 : 연 35% (월복리)</span>
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-amber-200/90 break-keep">
              "본 차용인은 명동 지하 금융사로부터 상기 원금을 차용하며, 기한 내 원리금을 전액 상환하지 못할 시 본인의 모든 주식 계좌와 자산을 즉시 강제 압류 및 처분함에 동의함."
            </p>

            {/* Blood Thumbprint Seal */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <span className="text-xs text-slate-400">채무자 각서 날인 (피지장):</span>
              <div className="w-12 h-14 rounded border border-red-800/60 bg-red-950/50 flex items-center justify-center shadow-lg relative overflow-hidden">
                <span className="text-2xl text-red-600 font-black rotate-[-12deg] filter drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">印</span>
              </div>
            </div>
          </div>

          {/* Current Debt & Asset Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">현재 총 사채 잔액</div>
              <div className="text-lg md:text-xl font-black text-red-400 truncate">
                {loan > 0 ? (loan / 100000000 >= 1 ? `${(loan / 100000000).toFixed(1)}억 원` : `${(loan / 10000).toLocaleString()}만 원`) : '0원 (깨끗한 상태)'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">가용 현금 자산</div>
              <div className="text-lg md:text-xl font-black text-amber-300 truncate">
                {assets / 100000000 >= 1 ? `${(assets / 100000000).toFixed(1)}억 원` : `${Math.floor(assets / 10000).toLocaleString()}만 원`}
              </div>
            </div>
          </div>

          {/* Loan Shark Ma Dong-seok Warning */}
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/50 flex items-start gap-2 text-xs text-red-300">
            <ShieldAlert size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="break-keep">
              "야 김 사장, 원금 못 갚으면 손모가지 날아가는 거야. 돈 더 필요하면 땡겨줄 테니 도장 찍든가."
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => { sound.playBuy(); onBorrow(50000000); }}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-black text-xs md:text-sm shadow-lg border border-red-500/50 active:scale-95 transition-all text-center"
            >
              🩸 5,000만 원 추가 대출
            </button>
            <button
              type="button"
              disabled={loan <= 0 || assets < 50000000}
              onClick={() => { sound.playBuy(); onRepay(50000000); }}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 disabled:opacity-40 disabled:pointer-events-none text-white font-black text-xs md:text-sm shadow-lg border border-amber-400/50 active:scale-95 transition-all text-center"
            >
              💰 5,000만 원 우선 상환
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
