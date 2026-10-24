import React from 'react';
import { ShiftMetric } from '../../types/dashboard';

interface ShiftAchievementChartProps {
  shiftMetrics: ShiftMetric[];
  compact?: boolean;
}

export const ShiftAchievementChart: React.FC<ShiftAchievementChartProps> = ({
  shiftMetrics,
  compact = false,
}) => {
  const maxAxis = 300;
  const ticks = [300, 250, 200, 150, 100, 50, 0];

  return (
    <div
      className={`bg-[#0e1a32]/85 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-md flex flex-col justify-between h-full ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      <div className={`flex items-center justify-between ${compact ? 'mb-1' : 'mb-2'}`}>
        <h3 className={`font-bold text-white tracking-wide ${compact ? 'text-xs' : 'text-sm'}`}>
          Achievement by Shift
        </h3>
        <span className="text-[10px] text-slate-400">Benchmark: 100%</span>
      </div>

      <div className={`flex-1 flex items-end gap-2 relative ${compact ? 'min-h-[120px] pt-4 pb-1' : 'min-h-[160px] pt-6 pb-2'}`}>
        {/* Y Axis Grid lines */}
        <div className={`absolute inset-0 flex flex-col justify-between pointer-events-none pr-1 ${compact ? 'pb-4 pl-7' : 'pb-6 pl-9'}`}>
          {ticks.map((tick) => (
            <div key={tick} className="flex items-center w-full">
              <span className={`text-slate-500 font-mono text-right pr-1 ${compact ? 'text-[8.5px] w-6' : 'text-[10px] w-8'}`}>
                {tick}%
              </span>
              <div className="flex-1 border-b border-slate-700/30" />
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className={`flex-1 flex justify-around items-end z-10 ${compact ? 'h-[105px] pl-7' : 'h-[140px] pl-9'}`}>
          {shiftMetrics.map((item) => {
            const heightPercent = Math.min(100, (item.achievementRate / maxAxis) * 100);
            const isDay = item.name === 'Day Shift';
            return (
              <div key={item.name} className={`flex flex-col items-center gap-1 group ${compact ? 'w-20' : 'w-24 sm:w-28'}`}>
                <span className={`font-mono font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow ${compact ? 'text-[10.5px]' : 'text-xs'}`}>
                  {item.achievementRate.toFixed(1)}%
                </span>

                <div className={`w-full bg-[#0a1324]/80 rounded-t-lg relative flex items-end justify-center overflow-hidden ${compact ? 'h-[85px]' : 'h-[120px]'}`}>
                  <div
                    className="absolute w-full h-[1px] bg-amber-400/50 z-20"
                    style={{ bottom: `${(100 / maxAxis) * 100}%` }}
                  />

                  <div
                    className={`w-full rounded-t-lg transition-all duration-700 relative shadow-lg ${
                      isDay
                        ? 'bg-gradient-to-t from-blue-600 to-sky-400 shadow-blue-500/20'
                        : 'bg-gradient-to-t from-orange-600 to-amber-500 shadow-orange-500/20'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/40" />
                  </div>
                </div>

                <span className={`font-medium text-slate-300 group-hover:text-white truncate ${compact ? 'text-[10px]' : 'text-xs'}`}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`border-t border-[#1d2d50] flex justify-between text-[10px] text-slate-400 ${compact ? 'mt-1 pt-1' : 'mt-2 pt-1.5'}`}>
        <span>Day: 26 Active</span>
        <span>Night: 21 Active</span>
      </div>
    </div>
  );
};
