import React from 'react';

export default function StatsCard({ value, label, ringColor, percentage }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="cs-stat-modern">
      <div className="cs-stat-ring-wrapper">
        <svg width="72" height="72" className="cs-stat-ring">
          <circle 
            stroke="#F1F5F9" 
            strokeWidth="6" 
            fill="transparent" 
            r={radius} 
            cx="36" 
            cy="36" 
          />
          <circle 
            stroke={ringColor} 
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            fill="transparent" 
            r={radius} 
            cx="36" 
            cy="36" 
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
      </div>
      <div className="cs-stat-info">
        <div className="cs-stat-val-modern">{value}</div>
        <div className="cs-stat-label-modern">{label}</div>
      </div>
    </div>
  );
}
