import React, { useState } from 'react';
import { DailyTrendPoint } from '../../types/dashboard';

interface ActualVsTargetTrendProps {
  data: DailyTrendPoint[];
  compact?: boolean;
}

export const ActualVsTargetTrend: React.FC<ActualVsTargetTrendProps> = ({
  data,
  compact = false,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = 20000;
  const minVal = 0;
  const height = compact ? 100 : 140;
  const width = 360;

  const getY = (val: number) => {
    return height - ((val - minVal) / (maxVal - minVal)) * height;
  };

  const getX = (idx: number) => {
    return (idx / (data.length - 1)) * (width - 40) + 20;
  };

  const actualPoints = data.map((d, i) => `${getX(i)},${getY(d.actualQty)}`).join(' ');
  const targetPoints = data.map((d, i) => `${getX(i)},${getY(d.targetQty)}`).join(' ');

  return (
    <div
      className={`bg-[#0e1a32]/85 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-md flex flex-col justify-between h-full ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      <div className={`flex items-center justify-between ${compact ? 'mb-1' : 'mb-2'}`}>
        <h3 className={`font-bold text-white tracking-wide ${compact ? 'text-xs' : 'text-sm'}`}>
          Actual vs Target Trend
        </h3>
        <span className="text-[10px] text-slate-400">Monthly Volume</span>
      </div>

      <div className={`relative flex-1 flex items-center justify-center ${compact ? 'min-h-[115px]' : 'min-h-[155px]'}`}>
        {/* Y Axis Guide lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-1">
          {[20000, 10000, 0].map((t) => (
            <div key={t} className="flex items-center w-full">
              <span className={`text-slate-500 font-mono text-right pr-1 ${compact ? 'text-[8px] w-6' : 'text-[9px] w-8'}`}>
                {t === 0 ? '0' : `${t / 1000}k`}
              </span>
              <div className="flex-1 border-b border-slate-700/20" />
            </div>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${width} ${height + 22}`}
          className={`w-full h-full overflow-visible ${compact ? 'ml-7' : 'ml-8'}`}
        >
          {/* Actual Qty line */}
          <polyline
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={actualPoints}
          />

          {/* Target Qty line */}
          <polyline
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={targetPoints}
          />

          {/* Markers */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cyActual = getY(d.actualQty);
            const cyTarget = getY(d.targetQty);
            const isHovered = hoveredIdx === i;

            return (
              <g key={d.date} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                <circle
                  cx={cx}
                  cy={cyActual}
                  r={isHovered ? 4.5 : 3}
                  fill="#0b132b"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  className="cursor-pointer"
                />
                <circle
                  cx={cx}
                  cy={cyTarget}
                  r={isHovered ? 4.5 : 3}
                  fill="#0b132b"
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                  className="cursor-pointer"
                />

                {isHovered && (
                  <g>
                    <rect
                      x={cx - 40}
                      y={Math.min(cyActual, cyTarget) - 34}
                      width="80"
                      height="30"
                      rx="4"
                      fill="#0f172a"
                      stroke="#1e3458"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={Math.min(cyActual, cyTarget) - 22}
                      textAnchor="middle"
                      fill="#38bdf8"
                      fontSize="8.5"
                      fontWeight="bold"
                    >
                      Act: {d.actualQty.toLocaleString()}
                    </text>
                    <text
                      x={cx}
                      y={Math.min(cyActual, cyTarget) - 10}
                      textAnchor="middle"
                      fill="#f59e0b"
                      fontSize="8.5"
                      fontWeight="bold"
                    >
                      Tgt: {d.targetQty.toLocaleString()}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* X Axis labels */}
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
          <span>Actual Qty</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_5px_#f59e0b]" />
          <span>Target Qty</span>
        </div>
      </div>
    </div>
  );
};
