import React from 'react';
import { Info, X } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ArcadeInfoModal({ info, onClose }) {
  if (!info) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="arcade-info-dialog" 
        onClick={(e) => e.stopPropagation()}
      >
        <span className="hud-corner-tl"></span>
        <span className="hud-corner-tr"></span>
        <span className="hud-corner-bl"></span>
        <span className="hud-corner-br"></span>

        <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-700/80">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
              i
            </span>
            <h3 className="text-sm font-black text-amber-300 tracking-wide uppercase m-0">
              {info.title || '정보 도감'}
            </h3>
          </div>
          <button 
            type="button" 
            onClick={() => {
              sound.playBuy();
              onClose();
            }}
            className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center border border-slate-600 transition"
          >
            <X size={15} />
          </button>
        </div>

        <div className="text-xs text-slate-200 leading-relaxed min-h-[50px] font-medium">
          {info.content}
        </div>

        {info.tip && (
          <div className="mt-3 p-2 rounded bg-amber-950/40 border border-amber-600/30 text-[11px] text-amber-300/90 font-mono">
            💡 {info.tip}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button 
            type="button" 
            onClick={() => {
              sound.playBuy();
              onClose();
            }} 
            className="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition shadow-lg shadow-amber-500/20 active:scale-95"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
