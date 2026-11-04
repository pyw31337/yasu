import React, { useEffect, useRef } from 'react';
import { Heart, Activity, AlertTriangle } from 'lucide-react';

export default function BeastHeartRate({ leverage = 1, loan = 0, isTrading = false }) {
  const canvasRef = useRef(null);

  // 레버리지 및 사채에 따른 심박수 계산
  // 1배: 72 bpm (안정)
  // 2배: 105 bpm (긴장)
  // 3배: 135 bpm (흥분)
  // 4배: 165 bpm (과열)
  // 5배: 198 bpm (심장마비 직전 광기)
  const baseBpm = 65 + (leverage - 1) * 32 + (loan > 0 ? 25 : 0) + (isTrading ? 20 : 0);
  const bpm = Math.min(220, Math.max(60, baseBpm));

  const isDanger = bpm >= 160;
  const isWarning = bpm >= 120 && bpm < 160;

  const heartColor = isDanger ? '#ff334b' : isWarning ? '#ffbe1a' : '#00f37c';
  const beatDuration = (60 / bpm).toFixed(2);

  // 실시간 ECG 심전도 파형 캔버스 애니메이션
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let x = 0;
    const points = [];
    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    // 초기 파형 버퍼 채우기
    for (let i = 0; i < width; i++) {
      points.push(midY);
    }

    let pulseCycle = 0;
    const cycleLength = Math.max(12, Math.floor(180 / (bpm / 60)));

    const render = () => {
      pulseCycle = (pulseCycle + 1) % cycleLength;

      // 심장 박동 피크 (QRS 파형) 계산
      let y = midY;
      if (pulseCycle === 1) y = midY - 4; // P파
      else if (pulseCycle === 3) y = midY + 6; // Q파
      else if (pulseCycle === 4) y = midY - (isDanger ? 24 : 16); // R파 (급격한 상승 피크)
      else if (pulseCycle === 5) y = midY + (isDanger ? 16 : 10); // S파
      else if (pulseCycle === 7) y = midY - 6; // T파
      else {
        // 미세 노이즈
        y = midY + (Math.random() - 0.5) * 1.5;
      }

      points.shift();
      points.push(y);

      // 캔버스 클리어 및 파형 드로잉
      ctx.clearRect(0, 0, width, height);

      // 배경 미세 모눈 그리드
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < width; gx += 15) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }

      // ECG 라인 그리기
      ctx.beginPath();
      ctx.strokeStyle = heartColor;
      ctx.lineWidth = isDanger ? 2.5 : 2;
      ctx.shadowBlur = isDanger ? 12 : 6;
      ctx.shadowColor = heartColor;

      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx.moveTo(i, points[i]);
        else ctx.lineTo(i, points[i]);
      }
      ctx.stroke();

      // 전두부 스파크 점
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(width - 2, points[points.length - 1], isDanger ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [bpm, heartColor, isDanger]);

  return (
    <div className={`beast-heart-hud ${isDanger ? 'heart-alarm-pulse' : ''}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Heart 
            size={18} 
            color={heartColor} 
            fill={heartColor}
            style={{ animation: `heartbeatBeat ${beatDuration}s infinite ease-in-out` }} 
          />
          <span className="text-xs font-black tracking-wider uppercase" style={{ color: heartColor }}>
            야수의 심박수 // ECG
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isDanger && <AlertTriangle size={14} className="text-red-500 animate-bounce" />}
          <span className="font-mono text-sm font-black" style={{ color: heartColor }}>
            {bpm} <span className="text-[10px] text-slate-400 font-normal">BPM</span>
          </span>
        </div>
      </div>

      {/* 실시간 캔버스 심전도 파형 */}
      <div className="ecg-canvas-wrapper">
        <canvas ref={canvasRef} width={260} height={52} className="w-full h-full block" />
      </div>

      <div className="flex justify-between items-center mt-1 text-[11px] font-mono">
        <span className="text-slate-400">
          레버리지: <strong className={leverage >= 4 ? 'text-red-400' : 'text-amber-400'}>{leverage}X</strong>
        </span>
        <span className="font-bold" style={{ color: heartColor }}>
          {bpm >= 180 ? '🚨 광기의 풀미수 위험' : bpm >= 130 ? '⚡ 도파민 폭발' : '🧘 침착한 관망'}
        </span>
      </div>
    </div>
  );
}
