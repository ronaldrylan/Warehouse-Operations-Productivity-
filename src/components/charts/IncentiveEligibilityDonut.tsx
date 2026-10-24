import React from 'react';

interface IncentiveEligibilityDonutProps {
  eligibleCount: number;
  notEligibleCount: number;
  eligibleRate: number;
  compact?: boolean;
}

export const IncentiveEligibilityDonut: React.FC<IncentiveEligibilityDonutProps> = ({
  eligibleCount,
  notEligibleCount,
  eligibleRate,
  compact = false,
}) => {
  const notEligibleRate = Math.max(0, 100 - eligibleRate);

  const size = compact ? 115 : 170;
  const strokeWidth = compact ? 15 : 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const eligibleOffset = 0;
  const eligibleLength = (eligibleRate / 100) * circumference;
  const notEligibleLength = (notEligibleRate / 100) * circumference;

  return (
    <div
      className={`bg-[#0e1a32]/85 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-md flex flex-col justify-between h-full ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      <div className={`flex items-center justify-between ${compact ? 'mb-1' : 'mb-2'}`}>
        <h3 className={`font-bold text-white tracking-wide ${compact ? 'text-xs' : 'text-sm'}`}>
          Incentive Eligibility
        </h3>
        <span className="text-[10px] text-cyan-400 uppercase font-semibold">Policy v2.4</span>
      </div>

      <div className={`flex items-center justify-around my-auto ${compact ? 'gap-2' : 'gap-4'}`}>
        {/* Donut SVG */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#0a1324"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#00e676"
              strokeWidth={strokeWidth}
              strokeDasharray={`${eligibleLength} ${circumference}`}
              strokeDashoffset={eligibleOffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#ef4444"
              strokeWidth={strokeWidth}
              strokeDasharray={`${notEligibleLength} ${circumference}`}
              strokeDashoffset={-eligibleLength - 3}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`font-black text-white font-mono tracking-tight drop-shadow ${compact ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
              {eligibleRate.toFixed(1)}%
            </span>
            <span className={`font-semibold text-slate-300 uppercase tracking-wider ${compact ? 'text-[9px]' : 'text-xs'}`}>
              Eligible
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className={`flex flex-col text-xs ${compact ? 'gap-2' : 'gap-3.5'}`}>
          <div className="flex items-start gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00e676] shadow-[0_0_6px_#00e676] mt-0.5 shrink-0" />
            <div>
              <div className={`font-semibold text-slate-200 ${compact ? 'text-xs' : 'text-sm'}`}>Eligible</div>
              <div className="text-slate-400 font-mono text-[10px] sm:text-xs">
                {eligibleCount} ({eligibleRate.toFixed(1)}%)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_6px_#ef4444] mt-0.5 shrink-0" />
            <div>
              <div className={`font-semibold text-slate-200 ${compact ? 'text-xs' : 'text-sm'}`}>Not Eligible</div>
              <div className="text-slate-400 font-mono text-[10px] sm:text-xs">
                {notEligibleCount} ({notEligibleRate.toFixed(1)}%)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t border-[#1d2d50] flex items-center justify-between text-[10px] text-slate-400 ${compact ? 'mt-1 pt-1' : 'mt-2 pt-2'}`}>
        <span>Min: 100% EWRL</span>
        <span className="text-emerald-400 font-semibold">Bonus pool unlocked</span>
      </div>
    </div>
  );
};
