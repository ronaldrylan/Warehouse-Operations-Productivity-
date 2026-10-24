import React, { useState } from 'react';
import { DailyTrendPoint } from '../../types/dashboard';

interface DailyAchievementTrendProps {
  data: DailyTrendPoint[];
  compact?: boolean;
}

export const DailyAchievementTrend: React.FC<DailyAchievementTrendProps> = ({
  data,
  compact = false,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = 300;
  const minVal = 0;
  const height = compact ? 100 : 140;
  const width = 360;

  const getY = (val: number) => {
    return height - ((val - minVal) / (maxVal - minVal)) * height;
  };

  const getX = (idx: number) => {
    return (idx / (data.length - 1)) * (width - 40) + 20;
  };

  const points = data.map((d, i) => `${getX(i)},${getY(d.achievementRate)}`).join(' ');
  const targetY = getY(100);

  return (
    <div
      className={`bg-[#0e1a32]/85 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-md flex flex-col justify-between h-full ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      <div className={`flex items-center justify-between ${compact ? 'mb-1' : 'mb-2'}`}>
        <h3 className={`font-bold text-white tracking-wide ${compact ? 'text-xs' : 'text-sm'}`}>
          Daily Achievement Trend
        </h3>
        <span className="text-[10px] text-cyan-400 font-mono">
          Avg: {Math.round(data.reduce((a, b) => a + b.achievementRate, 0) / data.length)}%
        </span>
      </div>

      <div className={`relative flex-1 flex items-center justify-center ${compact ? 'min-h-[115px]' : 'min-h-[155px]'}`}>
        {/* Y Axis Guides */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-1">
          {[300, 200, 100, 0].map((t) => (
            <div key={t} className="flex items-center w-full">
              <span className={`text-slate-500 font-mono text-right pr-1 ${compact ? 'text-[8px] w-5' : 'text-[9px] w-6'}`}>
                {t}%
              </span>
              <div className="flex-1 border-b border-slate-700/20" />
            </div>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${width} ${height + 22}`}
          className={`w-full h-full overflow-visible ${compact ? 'ml-6' : 'ml-7'}`}
        >
          <defs>
            <linearGradient id="blueAreaGradCompact" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <polygon
            points={`20,${height} ${points} ${getX(data.length - 1)},${height}`}
            fill="url(#blueAreaGradCompact)"
          />

          {/* Target 100% benchmark line */}
          <line
            x1="10"
            y1={targetY}
            x2={width - 10}
            y2={targetY}
            stroke="#f59e0b"
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />

          {/* Line */}
          <polyline
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Markers */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.achievementRate);
            const isHovered = hoveredIndex === i;

            return (
              <g key={d.date} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 4.5 : 3}
                  fill="#0b132b"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  className="cursor-pointer"
                />
                {isHovered && (
                  <g>
                    <rect
                      x={cx - 26}
                      y={cy - 24}
                      width="52"
                      height="18"
                      rx="3"
                      fill="#0284c7"
                    />
                    <text
                      x={cx}
                      y={cy - 12}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {d.achievementRate}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* X Axis Labels */}
          {data
            .filter((_, i) => i % 2 === 0 || i === data.length - 1)
            .map((d) => {
              const origIdx = data.findIndex((item) => item.date === d.date);
              return (
                <text
                  key={d.date}
                  x={getX(origIdx)}
                  y={height + 16}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="8.5"
                  fontFamily="sans-serif"
                >
                  {d.dayLabel}
                </text>
              );
            })}
        </svg>
      </div>

      <div className={`flex items-center justify-center gap-4 border-t border-[#1d2d50] text-[10px] text-slate-300 ${compact ? 'mt-1 pt-1' : 'mt-2 pt-2'}`}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_5px_#38bdf8]" />
          <span>Achievement %</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-0.5 border-t-2 border-dashed border-[#f59e0b]" />
          <span>Target (100%)</span>
        </div>
      </div>
    </div>
  );
};
