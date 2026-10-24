import React from 'react';
import {
  Warehouse,
  Calendar,
  Clock,
  Download,
  SlidersHorizontal,
  TableProperties,
  LayoutDashboard,
  RefreshCw,
  Sparkles,
  Film,
  Maximize,
  Minimize,
  Monitor,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface HeaderProps {
  currentView: 'executive' | 'ewm-logs' | 'simulator';
  onViewChange: (view: 'executive' | 'ewm-logs' | 'simulator') => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  onExport: () => void;
  lastUpdated: string;
  onRefresh: () => void;
  // Cinematic background controls
  onOpenVideoSettings: () => void;
  isPlayingVideo: boolean;
  // Screen Fit controls
  fitToScreen: boolean;
  onToggleFitToScreen: () => void;
  zoomScale: number;
  onZoomChange: (newScale: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  dateRange,
  onDateRangeChange,
  onExport,
  lastUpdated,
  onRefresh,
  onOpenVideoSettings,
  isPlayingVideo,
  fitToScreen,
  onToggleFitToScreen,
  zoomScale,
  onZoomChange,
}) => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <header className="bg-[#0b132b]/90 backdrop-blur-md border-b border-[#1d2d50] sticky top-0 z-40 px-3 lg:px-5 py-2 transition-all shadow-lg">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-3">
        {/* Left Branding */}
        <div className="flex items-center gap-2.5 self-start xl:self-auto">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1d4ed8] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-blue-900/40 border border-blue-400/30 shrink-0">
            <Warehouse className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black tracking-wider text-sm sm:text-base">
                WAREHOUSE OPERATIONS
              </span>
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse">
                Live EWM
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">
              PEOPLE <span className="text-cyan-500">|</span> PRODUCTIVITY <span className="text-cyan-500">|</span> PERFORMANCE
            </p>
          </div>
        </div>

        {/* Center Title & Tagline */}
        <div className="text-center my-0.5 xl:my-0">
          <h1 className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-white drop-shadow-sm">
            STAFF PERFORMANCE & INCENTIVE DASHBOARD
          </h1>
          <p className="text-[10px] font-semibold tracking-wider text-cyan-300/90 uppercase mt-0.5 flex items-center justify-center gap-1.5">
            <span>DRIVE PERFORMANCE</span>
            <span className="inline-block w-1 h-1 rounded-full bg-cyan-400"></span>
            <span>RECOGNIZE EFFORT</span>
            <span className="inline-block w-1 h-1 rounded-full bg-cyan-400"></span>
            <span>ACHIEVE MORE</span>
          </p>
        </div>

        {/* Right Controls & Tools */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-end xl:self-auto">
          {/* Fit to Screen (Single Viewport Mode) Button */}
          <button
            onClick={onToggleFitToScreen}
            title={fitToScreen ? 'Switch to Standard Scroll View' : 'Fit Entire Dashboard on Screen (No Scroll)'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm ${
              fitToScreen
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/40 shadow-emerald-500/20'
                : 'bg-[#0e1a32] text-slate-300 hover:text-white border-[#1e3458]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">
              {fitToScreen ? 'Fit to Screen: ON' : 'Fit Screen'}
            </span>
          </button>

          {/* Cinematic Background Settings Button */}
          <button
            onClick={onOpenVideoSettings}
            title="Configure Cinematic Clip Video Background"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0e1a32] hover:bg-[#15274d] text-cyan-300 border border-cyan-500/30 transition-all shadow-sm"
          >
            <Film className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span className="hidden sm:inline">Cinematic Clip</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </button>

          {/* View Mode Switcher */}
          <div className="bg-[#0e1a32] p-0.5 rounded-lg border border-[#1e3458] flex items-center text-xs font-medium">
            <button
              onClick={() => onViewChange('executive')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                currentView === 'executive'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Dashboard Overview"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span className="hidden md:inline">Dashboard</span>
            </button>
            <button
              onClick={() => onViewChange('ewm-logs')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                currentView === 'ewm-logs'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="View SAP EWM task logs"
            >
              <TableProperties className="w-3 h-3" />
              <span className="hidden md:inline">EWM Tasks</span>
            </button>
            <button
              onClick={() => onViewChange('simulator')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                currentView === 'simulator'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Incentive Simulator"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden md:inline">Simulator</span>
            </button>
          </div>

          {/* Date Range Selector Pill */}
          <div className="relative">
            <div className="flex items-center gap-1.5 bg-[#0e1a32] text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-[#1e3458] hover:border-cyan-500/50 transition-colors shadow-inner">
              <Calendar className="w-3 h-3 text-cyan-400" />
              <select
                value={dateRange}
                onChange={(e) => onDateRangeChange(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer pr-1 text-xs font-medium"
              >
                <option value="Oct 01, 2024 - Oct 31, 2024" className="bg-[#0b132b] text-slate-200">
                  Oct 01, 2024 - Oct 31, 2024
                </option>
                <option value="Oct 01, 2026 - Oct 10, 2026" className="bg-[#0b132b] text-slate-200">
                  Oct 01, 2026 - Oct 10, 2026 (Recent Tasks)
                </option>
                <option value="Last 7 Days" className="bg-[#0b132b] text-slate-200">
                  Last 7 Days
                </option>
                <option value="Current Shift (Night)" className="bg-[#0b132b] text-slate-200">
                  Current Shift (Night)
                </option>
              </select>
            </div>
          </div>

          {/* Zoom controls for fine-tuning fit on small screens */}
          <div className="hidden xl:flex items-center bg-[#0e1a32] rounded-lg border border-[#1e3458] px-1 py-0.5 text-slate-400 text-[10px]">
            <button
              onClick={() => onZoomChange(Math.max(0.65, zoomScale - 0.05))}
              title="Zoom Out"
              className="p-1 hover:text-white"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="font-mono px-1 font-bold text-slate-300">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => onZoomChange(Math.min(1.2, zoomScale + 0.05))}
              title="Zoom In"
              className="p-1 hover:text-white"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullScreen}
            title="Toggle Monitor Fullscreen"
            className="p-1.5 bg-[#0e1a32] text-slate-400 hover:text-white rounded-lg border border-[#1e3458] hover:border-cyan-500/40 transition-colors"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>

          {/* Quick Refresh */}
          <button
            onClick={onRefresh}
            title="Refresh Data"
            className="p-1.5 bg-[#0e1a32] text-slate-400 hover:text-cyan-300 rounded-lg border border-[#1e3458] hover:border-cyan-500/40 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Export Report */}
          <button
            onClick={onExport}
            title="Export CSV"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold shadow transition-all active:scale-95"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
