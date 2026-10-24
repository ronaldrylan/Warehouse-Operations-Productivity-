import React from 'react';
import { Filter, RotateCcw, ChevronDown, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { FilterOptions } from '../types/dashboard';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
  onReset: () => void;
  staffNames: string[];
  processNames: string[];
  compact?: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  staffNames,
  processNames,
  compact = false,
}) => {
  return (
    <aside
      className={`w-full bg-[#0e1a32]/80 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-lg flex flex-col transition-all overflow-y-auto ${
        compact ? 'p-2.5 gap-2.5 text-xs max-h-full' : 'p-4 gap-4'
      }`}
    >
      {/* Header with Reset */}
      <div className={`flex items-center justify-between border-b border-[#1d2d50] ${compact ? 'pb-2' : 'pb-3'}`}>
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <h2 className="text-xs font-bold text-white tracking-wide uppercase">Filters</h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold px-1.5 py-0.5 rounded hover:bg-cyan-500/10 transition-colors"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Filter Fields */}
      <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-3.5'}`}>
        {/* Date Range */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-300 mb-0.5">Date Range</label>
          <div className="relative">
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange('dateRange', e.target.value)}
              className="w-full bg-[#0a1324]/90 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-[#1e3458] focus:border-cyan-500 focus:outline-none appearance-none pr-7 cursor-pointer"
            >
              <option value="Oct 01, 2024 - Oct 31, 2024">Oct 01, 2024 - Oct 31, 2024</option>
              <option value="Oct 01, 2026 - Oct 10, 2026">Oct 01, 2026 - Oct 10, 2026</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Yesterday">Yesterday</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Shift */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-300 mb-0.5">Shift</label>
          <div className="relative">
            <select
              value={filters.shift}
              onChange={(e) => onFilterChange('shift', e.target.value)}
              className="w-full bg-[#0a1324]/90 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-[#1e3458] focus:border-cyan-500 focus:outline-none appearance-none pr-7 cursor-pointer"
            >
              <option value="All">All Shifts</option>
              <option value="Day">Day Shift</option>
              <option value="Night">Night Shift</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Staff */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-300 mb-0.5">Staff</label>
          <div className="relative">
            <select
              value={filters.staff}
              onChange={(e) => onFilterChange('staff', e.target.value)}
              className="w-full bg-[#0a1324]/90 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-[#1e3458] focus:border-cyan-500 focus:outline-none appearance-none pr-7 cursor-pointer"
            >
              <option value="All">All Staff</option>
              {staffNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Process */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-300 mb-0.5">Process</label>
          <div className="relative">
            <select
              value={filters.process}
              onChange={(e) => onFilterChange('process', e.target.value)}
              className="w-full bg-[#0a1324]/90 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-[#1e3458] focus:border-cyan-500 focus:outline-none appearance-none pr-7 cursor-pointer"
            >
              <option value="All">All Processes</option>
              {processNames.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Eligibility Status */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-300 mb-0.5">Eligibility Status</label>
          <div className="relative">
            <select
              value={filters.eligibilityStatus}
              onChange={(e) => onFilterChange('eligibilityStatus', e.target.value)}
              className="w-full bg-[#0a1324]/90 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-[#1e3458] focus:border-cyan-500 focus:outline-none appearance-none pr-7 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Eligible">Eligible (Achieved)</option>
              <option value="Review">Review (100% - 130%)</option>
              <option value="Not Eligible">Not Eligible (&lt;100%)</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Location / Store */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-300 mb-0.5">Location / Store</label>
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full bg-[#0a1324]/90 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-[#1e3458] focus:border-cyan-500 focus:outline-none appearance-none pr-7 cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="DC-UAE SSS UAE">DC-UAE SSS UAE</option>
              <option value="DC North Fulfillment">DC North Fulfillment</option>
              <option value="DC Central Hub">DC Central Hub</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Quick Filter Presets */}
      <div className={`border-t border-[#1d2d50] flex flex-col ${compact ? 'pt-1.5 gap-1' : 'pt-2 gap-1.5'}`}>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Quick Presets</span>
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => onFilterChange('eligibilityStatus', 'Eligible')}
            className="text-[10px] px-1.5 py-1 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 rounded border border-emerald-800/40 text-left truncate flex items-center gap-1"
          >
            <CheckCircle2 className="w-2.5 h-2.5 shrink-0 text-emerald-400" />
            <span>Eligible</span>
          </button>
          <button
            onClick={() => onFilterChange('eligibilityStatus', 'Not Eligible')}
            className="text-[10px] px-1.5 py-1 bg-red-950/40 hover:bg-red-900/50 text-red-300 rounded border border-red-800/40 text-left truncate flex items-center gap-1"
          >
            <ShieldAlert className="w-2.5 h-2.5 shrink-0 text-red-400" />
            <span>Not Eligible</span>
          </button>
          <button
            onClick={() => onFilterChange('shift', 'Night')}
            className="text-[10px] px-1.5 py-1 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 rounded border border-amber-800/40 text-left truncate flex items-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5 shrink-0 text-amber-400" />
            <span>Night Shift</span>
          </button>
          <button
            onClick={() => onFilterChange('process', 'Picking')}
            className="text-[10px] px-1.5 py-1 bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 rounded border border-blue-800/40 text-left truncate flex items-center gap-1"
          >
            <span>Picking</span>
          </button>
        </div>
      </div>

      {/* Live Operational Status */}
      {!compact && (
        <div className="mt-auto pt-2 border-t border-[#1d2d50] text-[10px] text-slate-400 space-y-0.5">
          <div className="flex justify-between items-center">
            <span>Warehouse:</span>
            <span className="font-semibold text-slate-200">DC-UAE 1D00</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Group:</span>
            <span className="font-semibold text-cyan-400">DISP Dispatch</span>
          </div>
        </div>
      )}
    </aside>
  );
};
