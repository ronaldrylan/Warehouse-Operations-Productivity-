import React from 'react';
import { RootCause } from '../../types/dashboard';

interface RootCauseChartProps {
  data: RootCause[];
  compact?: boolean;
}

export const RootCauseChart: React.FC<RootCauseChartProps> = ({
  data,
  compact = false,
}) => {
  const maxPercent = 40;

  return (
    <div
      className={`bg-[#0e1a32]/85 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-md flex flex-col justify-between h-full ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      <div className={`flex items-center justify-between ${compact ? 'mb-1' : 'mb-2'}`}>
        <h3 className={`font-bold text-white tracking-wide ${compact ? 'text-xs' : 'text-sm'}`}>
          Root Cause Analysis (Top Reasons)
        </h3>
        <span className="text-[10px] text-red-400 font-semibold">Loss Prevention</span>
      </div>

      <div className={`flex flex-col justify-between flex-1 ${compact ? 'space-y-1' : 'space-y-2'}`}>
        {data.map((item) => {
          const widthPercent = (item.percentage / maxPercent) * 100;
          return (
            <div key={item.reason} className="flex items-center text-xs group">
              <div className={`text-slate-300 group-hover:text-red-300 font-medium truncate text-right pr-2 select-none ${compact ? 'w-24 text-[10.5px]' : 'w-28 sm:w-32 text-xs'}`}>
                {item.reason}
              </div>

              <div className={`flex-1 bg-[#0a1324]/80 rounded-r-md overflow-hidden relative flex items-center ${compact ? 'h-3.5' : 'h-4 sm:h-5'}`}>
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400 rounded-r-md transition-all duration-700 relative flex items-center justify-end px-1.5 shadow-sm"
                  style={{ width: `${widthPercent}%` }}
                >
                  <div className="w-1.5 h-full absolute right-0 top-0 bg-white/40 blur-[1px]" />
                </div>

                <span className={`ml-1.5 font-mono font-bold text-slate-200 group-hover:text-white shrink-0 ${compact ? 'text-[9.5px]' : 'text-[11px]'}`}>
                  {item.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`border-t border-[#1d2d50] flex justify-between text-[10px] text-slate-400 ${compact ? 'mt-1 pt-1' : 'mt-2 pt-1.5'}`}>
        <span>Total Incidents: 525</span>
        <span className="text-amber-400 font-medium">60% Vehicle/System Delays</span>
      </div>
    </div>
  );
};
