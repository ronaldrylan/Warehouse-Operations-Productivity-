import React from 'react';
import { ProcessPerformance } from '../../types/dashboard';

interface ProcessAchievementChartProps {
  data: ProcessPerformance[];
  compact?: boolean;
}

export const ProcessAchievementChart: React.FC<ProcessAchievementChartProps> = ({
  data,
  compact = false,
}) => {
  const maxAxis = 300;
  const ticks = [0, 50, 100, 150, 200, 250, 300];

  const getGradient = (rate: number) => {
    if (rate >= 220) return 'from-emerald-400 to-[#00e676]';
    if (rate >= 180) return 'from-teal-400 to-emerald-400';
    if (rate >= 160) return 'from-cyan-400 to-teal-400';
    if (rate >= 130) return 'from-amber-400 to-orange-400';
    if (rate >= 100) return 'from-orange-400 to-amber-500';
    return 'from-rose-500 to-red-500';
  };

  return (
    <div
      className={`bg-[#0e1a32]/85 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-md flex flex-col justify-between h-full ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      <div className={`flex items-center justify-between ${compact ? 'mb-1' : 'mb-2'}`}>
        <h3 className={`font-bold text-white tracking-wide ${compact ? 'text-xs' : 'text-sm'}`}>
          Achievement by Process
        </h3>
        <span className="text-[10px] text-slate-400">Target: 100%</span>
      </div>

      <div className={`flex flex-col justify-between flex-1 ${compact ? 'space-y-1' : 'space-y-2'}`}>
        {data.map((item) => {
          const widthPercent = Math.min(100, (item.achievementRate / maxAxis) * 100);
          return (
            <div key={item.name} className="flex items-center text-xs group">
              <div className={`text-slate-300 group-hover:text-cyan-300 font-medium truncate text-right pr-2 select-none ${compact ? 'w-20 text-[10.5px]' : 'w-24 sm:w-28 text-xs'}`}>
                {item.name}
              </div>

              <div className={`flex-1 bg-[#0a1324]/80 rounded-r-md overflow-hidden relative flex items-center ${compact ? 'h-3.5' : 'h-4 sm:h-5'}`}>
                <div
                  className="absolute top-0 bottom-0 w-[1px] bg-slate-600/60 z-10"
                  style={{ left: `${(100 / maxAxis) * 100}%` }}
                />

                <div
                  className={`h-full bg-gradient-to-r ${getGradient(
                    item.achievementRate
                  )} rounded-r-md transition-all duration-700 relative flex items-center justify-end px-1.5 shadow-sm`}
                  style={{ width: `${widthPercent}%` }}
                >
                  <div className="w-1.5 h-full absolute right-0 top-0 bg-white/40 blur-[1px]" />
                </div>

                <span className={`ml-1.5 font-mono font-bold text-slate-200 group-hover:text-white shrink-0 ${compact ? 'text-[9.5px]' : 'text-[11px]'}`}>
                  {item.achievementRate}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`border-t border-[#1d2d50] flex justify-between text-[9px] text-slate-400 font-mono ${compact ? 'mt-1 pt-1 pl-20' : 'mt-2 pt-1.5 pl-24 sm:pl-28'}`}>
        {ticks.map((t) => (
          <span key={t}>{t}%</span>
        ))}
      </div>
    </div>
  );
};
