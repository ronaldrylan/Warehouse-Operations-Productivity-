import React from 'react';
import { Warehouse } from 'lucide-react';

interface FooterProps {
  compact?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ compact = false }) => {
  return (
    <footer
      className={`border-t border-[#1d2d50] text-slate-400 text-xs transition-all ${
        compact ? 'mt-1 pt-1.5 pb-2' : 'mt-6 pt-4 pb-6'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-2">
        {/* Left Branding */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-blue-600/30 flex items-center justify-center border border-blue-500/30 text-cyan-400">
            <Warehouse className="w-3 h-3" />
          </div>
          <span className="font-bold text-slate-200 tracking-wider uppercase text-[10px]">
            WAREHOUSE OPERATIONS
          </span>
        </div>

        {/* Center Tagline */}
        <div className="text-center font-medium tracking-wider text-[10px] text-slate-400">
          PEOPLE MAKE PERFORMANCE <span className="text-cyan-500 mx-1">|</span> DATA DRIVES PROGRESS{' '}
          <span className="text-cyan-500 mx-1">|</span> TOGETHER WE DELIVER
        </div>

        {/* Right Version */}
        <div className="font-mono text-[10px] text-slate-400">
          <span>Oct 2024</span> <span className="text-slate-600">|</span> <span>Version 1.0</span>
        </div>
      </div>
    </footer>
  );
};
