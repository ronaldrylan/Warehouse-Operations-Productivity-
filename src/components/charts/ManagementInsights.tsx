import React from 'react';
import {
  Trophy,
  Users,
  Cog,
  CheckCircle2,
  FileCheck,
  AlertTriangle,
  Moon,
  Clock,
  BarChart3,
  Award,
} from 'lucide-react';
import { ManagementInsightData } from '../../types/dashboard';

interface ManagementInsightsProps {
  insights: ManagementInsightData;
  compact?: boolean;
}

export const ManagementInsights: React.FC<ManagementInsightsProps> = ({
  insights,
  compact = false,
}) => {
  return (
    <div
      className={`bg-[#0e1a32]/85 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-md flex flex-col justify-between h-full ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      <div className={`flex items-center justify-between ${compact ? 'mb-1' : 'mb-2'}`}>
        <h3 className={`font-bold text-white tracking-wide ${compact ? 'text-xs' : 'text-sm'}`}>
          Management Insights
        </h3>
        <span className="text-[9px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
          Executive Summary
        </span>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 flex-1 text-xs ${compact ? 'gap-x-2 gap-y-1' : 'gap-x-4 gap-y-2'}`}>
        {/* Left Column */}
        <div className={`flex flex-col justify-between ${compact ? 'space-y-1' : 'space-y-1.5'}`}>
          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-emerald-500/10 text-emerald-400">
                <Trophy className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>Best Performer</span>
            </div>
            <span className={`font-semibold text-emerald-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              {insights.bestPerformer.name} ({insights.bestPerformer.achievement})
            </span>
          </div>

          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-emerald-500/10 text-emerald-400">
                <Users className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>Best Shift</span>
            </div>
            <span className={`font-semibold text-emerald-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              {insights.bestShift.name} ({insights.bestShift.achievement})
            </span>
          </div>

          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-cyan-500/10 text-cyan-400">
                <Cog className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>Top Process</span>
            </div>
            <span className={`font-semibold text-cyan-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              {insights.topProcess.name} ({insights.topProcess.achievement})
            </span>
          </div>

          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>OTIF Compliance</span>
            </div>
            <span className={`font-semibold text-emerald-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              98.4%
            </span>
          </div>

          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-blue-500/10 text-blue-400">
                <FileCheck className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>Orders</span>
            </div>
            <span className={`font-semibold text-blue-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              {insights.ordersProcessed.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right Column */}
        <div className={`flex flex-col justify-between ${compact ? 'space-y-1' : 'space-y-1.5'}`}>
          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-rose-500/10 text-rose-400">
                <Award className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>Lowest Performer</span>
            </div>
            <span className={`font-semibold text-rose-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              {insights.lowestPerformer.name} ({insights.lowestPerformer.achievement})
            </span>
          </div>

          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-rose-500/10 text-rose-400">
                <Moon className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>Night Shift Focus</span>
            </div>
            <span className={`font-semibold text-rose-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              {insights.shiftRequiringAttention.name} ({insights.shiftRequiringAttention.achievement})
            </span>
          </div>

          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-amber-500/10 text-amber-400">
                <AlertTriangle className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>Process Focus</span>
            </div>
            <span className={`font-semibold text-amber-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              {insights.processRequiringAttention.name} ({insights.processRequiringAttention.achievement})
            </span>
          </div>

          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-rose-500/10 text-rose-400">
                <Clock className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>Outside TAT</span>
            </div>
            <span className={`font-semibold text-rose-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              {insights.ordersOutsideTAT.count} ({insights.ordersOutsideTAT.percentage})
            </span>
          </div>

          <div className="flex items-center justify-between p-1 rounded bg-slate-900/50 border border-slate-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <div className="p-0.5 rounded bg-blue-500/10 text-blue-400">
                <BarChart3 className="w-3 h-3" />
              </div>
              <span className={`text-slate-300 font-medium truncate ${compact ? 'text-[9.5px]' : 'text-xs'}`}>Avg Productivity</span>
            </div>
            <span className={`font-semibold text-blue-400 font-mono shrink-0 ${compact ? 'text-[9.5px]' : 'text-xs'}`}>
              {insights.averageProductivity.count.toLocaleString()} / staff
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
