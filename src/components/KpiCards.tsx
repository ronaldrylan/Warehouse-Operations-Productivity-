import React from 'react';
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Package,
  Target,
  Award,
  DollarSign,
  FileText,
  Zap,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface KpiCardsProps {
  totalStaff: number;
  eligibleStaff: number;
  notEligibleStaff: number;
  achievementRate: number;
  totalActualQty: number;
  totalTargetQty: number;
  eligibilityRate: number;
  totalIncentiveCost?: number;
  ordersProcessed: number;
  productivityPerStaff: number;
  isFiltered?: boolean;
  compact?: boolean;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  totalStaff,
  eligibleStaff,
  notEligibleStaff,
  achievementRate,
  totalActualQty,
  totalTargetQty,
  eligibilityRate,
  ordersProcessed,
  productivityPerStaff,
  isFiltered,
  compact = false,
}) => {
  const cards = [
    {
      title: 'Total Staff',
      value: totalStaff.toLocaleString(),
      change: '+4.4%',
      isPositive: true,
      icon: Users,
      cardBg: 'bg-[#0b2447]/65 hover:bg-[#0b2447]/90 border-blue-500/35 backdrop-blur-sm',
      iconBg: 'bg-blue-600/25 text-blue-400 border border-blue-500/40',
      accentColor: 'text-blue-400',
    },
    {
      title: 'Eligible Staff',
      value: eligibleStaff.toLocaleString(),
      change: '+2.3%',
      isPositive: true,
      icon: UserCheck,
      cardBg: 'bg-[#063327]/65 hover:bg-[#063327]/90 border-emerald-500/35 backdrop-blur-sm',
      iconBg: 'bg-emerald-600/25 text-emerald-400 border border-emerald-500/40',
      accentColor: 'text-emerald-400',
    },
    {
      title: 'Not Eligible',
      value: notEligibleStaff.toLocaleString(),
      change: '-25.0%',
      isPositive: false,
      icon: UserX,
      cardBg: 'bg-[#3b1219]/65 hover:bg-[#3b1219]/90 border-red-500/35 backdrop-blur-sm',
      iconBg: 'bg-red-600/25 text-red-400 border border-red-500/40',
      accentColor: 'text-red-400',
    },
    {
      title: 'Achievement %',
      value: `${achievementRate.toFixed(1)}%`,
      change: '+18.2%',
      isPositive: true,
      icon: TrendingUp,
      cardBg: 'bg-[#0a2e48]/65 hover:bg-[#0a2e48]/90 border-cyan-500/35 backdrop-blur-sm',
      iconBg: 'bg-cyan-600/25 text-cyan-400 border border-cyan-500/40',
      accentColor: 'text-cyan-400',
    },
    {
      title: 'Total Actual Qty',
      value: totalActualQty.toLocaleString(),
      change: '+12.6%',
      isPositive: true,
      icon: Package,
      cardBg: 'bg-[#08382d]/65 hover:bg-[#08382d]/90 border-green-500/35 backdrop-blur-sm',
      iconBg: 'bg-green-600/25 text-green-400 border border-green-500/40',
      accentColor: 'text-green-400',
    },
    {
      title: 'Total Target Qty',
      value: totalTargetQty.toLocaleString(),
      change: '+3.1%',
      isPositive: true,
      icon: Target,
      cardBg: 'bg-[#3b2d0c]/65 hover:bg-[#3b2d0c]/90 border-amber-500/35 backdrop-blur-sm',
      iconBg: 'bg-amber-600/25 text-amber-400 border border-amber-500/40',
      accentColor: 'text-amber-400',
    },
    {
      title: 'Eligibility Rate',
      value: `${eligibilityRate.toFixed(1)}%`,
      change: '+1.8%',
      isPositive: true,
      icon: Award,
      cardBg: 'bg-[#29174d]/65 hover:bg-[#29174d]/90 border-purple-500/35 backdrop-blur-sm',
      iconBg: 'bg-purple-600/25 text-purple-400 border border-purple-500/40',
      accentColor: 'text-purple-400',
    },
    {
      title: 'Orders Processed',
      value: ordersProcessed.toLocaleString(),
      change: '+11.7%',
      isPositive: true,
      icon: FileText,
      cardBg: 'bg-[#182338]/65 hover:bg-[#182338]/90 border-blue-400/35 backdrop-blur-sm',
      iconBg: 'bg-slate-700/40 text-blue-300 border border-blue-400/40',
      accentColor: 'text-blue-300',
    },
    {
      title: 'Productivity / Staff',
      value: productivityPerStaff.toLocaleString(),
      change: '+9.1%',
      isPositive: true,
      icon: Zap,
      cardBg: 'bg-[#3d250f]/65 hover:bg-[#3d250f]/90 border-orange-500/35 backdrop-blur-sm',
      iconBg: 'bg-orange-600/25 text-orange-400 border border-orange-500/40',
      accentColor: 'text-orange-400',
    },
  ];

  return (
    <div className="w-full">
      {isFiltered && !compact && (
        <div className="mb-1 text-[11px] text-cyan-300/80 flex items-center justify-between px-1">
          <span>* Metrics filtered based on current selections</span>
          <span className="text-slate-400">Baseline values correspond to full October period</span>
        </div>
      )}
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-9 ${compact ? 'gap-1.5' : 'gap-2.5'}`}>
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 shadow-md ${c.cardBg} flex flex-col justify-between relative overflow-hidden group ${
                compact ? 'p-1.5 sm:p-2' : 'p-3'
              }`}
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className={`font-semibold text-slate-300 truncate tracking-tight ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
                  {c.title}
                </span>
                <div className={`rounded-md shrink-0 ${c.iconBg} ${compact ? 'p-1' : 'p-1.5'}`}>
                  <Icon className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
                </div>
              </div>

              <div className="my-0.5">
                <span className={`font-black tracking-tight text-white font-mono ${compact ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'}`}>
                  {c.value}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[9px] sm:text-[10px]">
                <span
                  className={`inline-flex items-center font-bold px-1 py-0.2 rounded ${
                    c.isPositive
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-red-400 bg-red-500/10'
                  }`}
                >
                  {c.isPositive ? (
                    <ArrowUp className="w-2.5 h-2.5 mr-0.5" />
                  ) : (
                    <ArrowDown className="w-2.5 h-2.5 mr-0.5" />
                  )}
                  {c.change}
                </span>
                {!compact && <span className="text-slate-400 truncate">vs last month</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
