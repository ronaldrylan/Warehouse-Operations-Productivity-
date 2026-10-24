import React, { useState } from 'react';
import { SlidersHorizontal, DollarSign, Users, Award, CheckCircle2, RotateCcw } from 'lucide-react';
import { IncentiveConfig, StaffRecord } from '../types/dashboard';

interface IncentiveSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffList: StaffRecord[];
  onApplyConfig: (config: IncentiveConfig) => void;
}

export const IncentiveSimulatorModal: React.FC<IncentiveSimulatorModalProps> = ({
  isOpen,
  onClose,
  staffList,
  onApplyConfig,
}) => {
  const [threshold, setThreshold] = useState<number>(100);
  const [ratePer1000, setRatePer1000] = useState<number>(65);
  const [nightAllowance, setNightAllowance] = useState<number>(50);
  const [requireQualityGate, setRequireQualityGate] = useState<boolean>(true);
  const [maxCap, setMaxCap] = useState<number>(1000);

  if (!isOpen) return null;

  // Calculate simulated numbers
  const simulatedStaff = staffList.map((s) => {
    const isEligible = s.achievementRate >= threshold;
    let bonus = 0;
    if (isEligible) {
      const unitsOverTarget = Math.max(0, s.actualQty - s.targetQty);
      bonus = (unitsOverTarget / 1000) * ratePer1000;
      if (s.shift === 'Night') {
        bonus += nightAllowance;
      }
      bonus = Math.min(bonus, maxCap);
    }
    return {
      ...s,
      simulatedEligible: isEligible,
      simulatedBonus: Math.round(bonus),
    };
  });

  const totalSimulatedCost = simulatedStaff.reduce((sum, s) => sum + s.simulatedBonus, 0);
  const eligibleCount = simulatedStaff.filter((s) => s.simulatedEligible).length;
  const eligiblePercent = ((eligibleCount / staffList.length) * 100).toFixed(1);

  const handleApply = () => {
    onApplyConfig({
      baseThreshold: threshold,
      tier1BonusPer1000: ratePer1000,
      nightShiftAllowance: nightAllowance,
      qualityGatePassRequired: requireQualityGate,
      maxIncentiveCap: maxCap,
    });
    onClose();
  };

  const handleReset = () => {
    setThreshold(100);
    setRatePer1000(65);
    setNightAllowance(50);
    setRequireQualityGate(true);
    setMaxCap(1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#0b132b] rounded-2xl border border-cyan-500/30 p-6 max-w-2xl w-full shadow-2xl relative my-8 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#1d2d50]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600/20 text-cyan-400 border border-cyan-500/30">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                Warehouse Incentive Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Model bonus scheme budgets, threshold gates &amp; night shift allowances
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg p-1"
          >
            ✕
          </button>
        </div>

        {/* Live Simulation Metric Cards */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="bg-[#0e1a32] p-3 rounded-xl border border-indigo-500/30">
            <span className="text-[11px] font-semibold text-slate-400">Projected Budget</span>
            <div className="text-xl font-black font-mono text-emerald-400 mt-0.5">
              ${totalSimulatedCost.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400">Total monthly incentive</span>
          </div>

          <div className="bg-[#0e1a32] p-3 rounded-xl border border-emerald-500/30">
            <span className="text-[11px] font-semibold text-slate-400">Eligible Staff</span>
            <div className="text-xl font-black font-mono text-cyan-300 mt-0.5">
              {eligibleCount} / {staffList.length}
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">{eligiblePercent}% eligibility rate</span>
          </div>

          <div className="bg-[#0e1a32] p-3 rounded-xl border border-amber-500/30">
            <span className="text-[11px] font-semibold text-slate-400">Avg. Payout / Eligible</span>
            <div className="text-xl font-black font-mono text-amber-300 mt-0.5">
              ${eligibleCount > 0 ? Math.round(totalSimulatedCost / eligibleCount) : 0}
            </div>
            <span className="text-[10px] text-slate-400">Per qualified worker</span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 my-5 text-xs">
          {/* Threshold slider */}
          <div className="bg-[#0a1324] p-3.5 rounded-xl border border-[#1e3458]">
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-semibold text-slate-200">
                Minimum Eligibility Threshold: <strong className="text-cyan-400">{threshold}%</strong>
              </label>
              <span className="text-slate-400 text-[11px]">Staff below this receive $0</span>
            </div>
            <input
              type="range"
              min={80}
              max={150}
              step={5}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Rate per 1000 units */}
          <div className="bg-[#0a1324] p-3.5 rounded-xl border border-[#1e3458]">
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-semibold text-slate-200">
                Incentive Rate per 1,000 Units Over Target: <strong className="text-emerald-400">${ratePer1000}</strong>
              </label>
              <span className="text-slate-400 text-[11px]">Scaled velocity bonus</span>
            </div>
            <input
              type="range"
              min={20}
              max={150}
              step={5}
              value={ratePer1000}
              onChange={(e) => setRatePer1000(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Night Shift Allowance */}
          <div className="bg-[#0a1324] p-3.5 rounded-xl border border-[#1e3458]">
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-semibold text-slate-200">
                Night Shift Differential Premium: <strong className="text-amber-400">${nightAllowance}</strong>
              </label>
              <span className="text-slate-400 text-[11px]">Added to eligible night staff</span>
            </div>
            <input
              type="range"
              min={0}
              max={150}
              step={10}
              value={nightAllowance}
              onChange={(e) => setNightAllowance(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Quality gate toggle */}
          <div className="bg-[#0a1324] p-3.5 rounded-xl border border-[#1e3458] flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-200 block">Require EWRL Quality Gate</span>
              <span className="text-slate-400 text-[11px]">
                Workers with unresolved stock discrepancies or severe errors are flagged
              </span>
            </div>
            <input
              type="checkbox"
              checked={requireQualityGate}
              onChange={(e) => setRequireQualityGate(e.target.checked)}
              className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-3 border-t border-[#1d2d50]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Policy Defaults</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold shadow hover:from-blue-500 hover:to-cyan-500"
            >
              Apply Simulation Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
