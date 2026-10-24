import React from 'react';
import { ProcessPerformance } from '../../types/dashboard';

interface ProcessActualVsTargetChartProps {
  data: ProcessPerformance[];
  compact?: boolean;
}

export const ProcessActualVsTargetChart: React.FC<ProcessActualVsTargetChartProps> = ({
  data,
  compact = false,
}) => {
  const maxVal = 80000;
  const ticks = [80000, 40000, 0];

  return (
    <div
      className={`bg-[#0e1a32]/85 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-md flex flex-col justify-between h-full ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      <div className={`flex flex-wrap items-center justify-between gap-1.5 ${compact ? 'mb-1' : 'mb-2'}`}>
        <h3 className={`font-bold text-white tracking-wide ${compact ? 'text-xs' : 'text-sm'}`}>
          Process Performance (Actual vs Target)
        </h3>
        <div className="flex items-center gap-3 text-[11px] font-medium">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0ea5e9]" />
            <span className="text-slate-300 text-[10px]">Actual</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" />
            <span className="text-slate-300 text-[10px]">Target</span>
          </div>
        </div>
      </div>

      <div className={`flex-1 flex items-end relative ${compact ? 'min-h-[115px] pt-4 pb-1' : 'min-h-[160px] pt-6 pb-2'}`}>
        {/* Y-Axis lines */}
        <div className={`absolute inset-0 flex flex-col justify-between pointer-events-none pr-1 ${compact ? 'pb-4 pl-7' : 'pb-6 pl-10'}`}>
          {ticks.map((t) => (
            <div key={t} className="flex items-center w-full">
              <span className={`text-slate-500 font-mono text-right pr-1 ${compact ? 'text-[8px] w-6' : 'text-[9.5px] w-8'}`}>
                {t === 0 ? '0' : `${t / 1000}k`}
              </span>
              <div className="flex-1 border-b border-slate-700/25" />
            </div>
          ))}
        </div>

        {/* Bar Groups Container */}
        <div className={`flex-1 flex justify-between items-end z-10 gap-1 ${compact ? 'h-[100px] pl-7' : 'h-[145px] pl-10'}`}>
          {data.map((proc) => {
            const actualHeight = Math.min(100, (proc.actualQty / maxVal) * 100);
            const targetHeight = Math.min(100, (proc.targetQty / maxVal) * 100);

            return (
              <div key={proc.name} className="flex-1 flex flex-col items-center group">
                <div className={`w-full flex justify-center items-end gap-0.5 ${compact ? 'h-[80px]' : 'h-[115px]'}`}>
                  {/* Actual Bar */}
                  <div className={`flex-1 flex flex-col items-center justify-end h-full relative ${compact ? 'max-w-[14px]' : 'max-w-[20px]'}`}>
                    <span className="text-[8px] font-mono font-bold text-cyan-300 mb-0.5 truncate drop-shadow opacity-90 group-hover:opacity-100">
                      {proc.actualQty >= 1000 ? `${Math.round(proc.actualQty / 1000)}k` : proc.actualQty}
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-blue-700 to-[#38bdf8] rounded-t-sm shadow transition-all duration-700"
                      style={{ height: `${actualHeight}%` }}
                    />
                  </div>

                  {/* Target Bar */}
                  <div className={`flex-1 flex flex-col items-center justify-end h-full relative ${compact ? 'max-w-[14px]' : 'max-w-[20px]'}`}>
                    <span className="text-[8px] font-mono font-bold text-amber-300 mb-0.5 truncate drop-shadow opacity-90 group-hover:opacity-100">
                      {proc.targetQty >= 1000 ? `${Math.round(proc.targetQty / 1000)}k` : proc.targetQty}
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-amber-700 to-[#f59e0b] rounded-t-sm shadow transition-all duration-700"
                      style={{ height: `${targetHeight}%` }}
                    />
                  </div>
                </div>

                <span className={`text-slate-300 font-medium truncate mt-1 text-center group-hover:text-white ${compact ? 'text-[8.5px] max-w-[50px]' : 'text-[10px] max-w-[65px]'}`}>
                  {proc.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`border-t border-[#1d2d50] flex justify-between text-[10px] text-slate-400 ${compact ? 'mt-1 pt-1' : 'mt-1 pt-1.5'}`}>
        <span>Total Output: 205,256</span>
        <span className="text-cyan-400 font-semibold">+103,470 Over Target</span>
      </div>
    </div>
  );
};
