import React, { useEffect, useState } from 'react';

export default function RollingNumber({ value, prefix = '', suffix = '', duration = 800, className = '' }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = displayValue;
    const endValue = value;
    const diff = endValue - startValue;

    if (diff === 0) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + diff * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  // 한국 원화 포맷
  const formatValue = (num) => {
    const abs = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    if (abs >= 100000000) {
      const eok = Math.floor(abs / 100000000);
      const man = Math.floor((abs % 100000000) / 10000);
      return `${sign}${eok.toLocaleString()}억 ${man > 0 ? man.toLocaleString() + '만' : ''}`;
    }
    if (abs >= 10000) {
      return `${sign}${Math.floor(abs / 10000).toLocaleString()}만`;
    }
    return `${sign}${abs.toLocaleString()}`;
  };

  return (
    <span className={`rolling-odometer ${className}`}>
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
}
