import React from 'react';
import {
  X,
  Award,
  Clock,
  TrendingUp,
  Target,
  DollarSign,
  User,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { StaffRecord, EwmTaskLog } from '../types/dashboard';

interface StaffDetailModalProps {
  staff: StaffRecord | null;
  onClose: () => void;
  tasks: EwmTaskLog[];
}

export const StaffDetailModal: React.FC<StaffDetailModalProps> = ({ staff, onClose, tasks }) => {
  if (!staff) return null;

  // Filter tasks belonging to this processor or staff member
  const relatedTasks = tasks.filter(
    (t) =>
      t.fullName.toLowerCase().includes(staff.name.toLowerCase()) ||
      staff.name.toLowerCase().includes(t.fullName.toLowerCase()) ||
      t.employeeCode === staff.employeeCode
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#0b132b] rounded-2xl border border-cyan-500/30 p-6 max-w-3xl w-full shadow-2xl relative my-8 animate-in fade-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-[#1d2d50]">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg border border-cyan-400/30">
            {staff.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-white tracking-wide">{staff.name}</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-cyan-500/30">
                {staff.employeeCode}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Rank #{staff.rank}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Shift: <strong className="text-slate-200">{staff.shift} Shift</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-cyan-400" />
                Line Manager: <strong className="text-slate-200">{staff.lineManager}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="bg-[#0e1a32] p-3 rounded-xl border border-[#1e3458]">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
              Achievement %
            </span>
            <span
              className={`text-2xl font-black font-mono ${
                staff.achievementRate >= 200
                  ? 'text-emerald-400'
                  : staff.achievementRate >= 120
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {staff.achievementRate.toFixed(1)}%
            </span>
            <div className="text-[10px] text-slate-400 mt-1">vs 100% Target Standard</div>
          </div>

          <div className="bg-[#0e1a32] p-3 rounded-xl border border-[#1e3458]">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Actual Qty</span>
            <span className="text-2xl font-black font-mono text-cyan-300">
              {staff.actualQty.toLocaleString()}
            </span>
            <div className="text-[10px] text-slate-400 mt-1">Target: {staff.targetQty.toLocaleString()}</div>
          </div>

          <div className="bg-[#0e1a32] p-3 rounded-xl border border-[#1e3458]">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
              Incentive Status
            </span>
            <div className="mt-1">
              {staff.incentiveStatus === 'Eligible' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Eligible
                </span>
              ) : staff.incentiveStatus === 'Review' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  In Review
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  Not Eligible
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Policy threshold met</div>
          </div>

          <div className="bg-[#0e1a32] p-3 rounded-xl border border-[#1e3458]">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
              Incentive Amount
            </span>
            <span className="text-2xl font-black font-mono text-emerald-400">
              ${staff.incentiveAmount.toLocaleString()}
            </span>
            <div className="text-[10px] text-slate-400 mt-1">Direct bonus calculation</div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-[#0a1324] rounded-xl p-4 border border-[#1e3458] mb-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Operational Summary &amp; Productivity Rating
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-[#0e1a32] border border-slate-800">
              <span className="text-slate-400 block">Primary Process</span>
              <strong className="text-slate-200 font-semibold">{staff.process}</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0e1a32] border border-slate-800">
              <span className="text-slate-400 block">Orders Processed</span>
              <strong className="text-slate-200 font-semibold font-mono">
                {staff.ordersProcessed} Orders
              </strong>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0e1a32] border border-slate-800">
              <span className="text-slate-400 block">Hours Worked</span>
              <strong className="text-slate-200 font-semibold font-mono">
                {staff.hoursWorked} hrs (100% active)
              </strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-xs">
            <span className="font-semibold text-cyan-300">Supervisor Remarks: </span>
            <span className="text-slate-300">{staff.remarks}</span>
          </div>
        </div>

        {/* Related EWM Raw Tasks if any */}
        {relatedTasks.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Recent SAP EWM Transactional Tasks ({relatedTasks.length})
            </h4>
            <div className="max-h-40 overflow-y-auto rounded-lg border border-[#1e3458] text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#122344] text-slate-300 text-[11px] sticky top-0">
                  <tr>
                    <th className="p-2">Step</th>
                    <th className="p-2">Ref Document</th>
                    <th className="p-2">Time</th>
                    <th className="p-2 text-right">Actual</th>
                    <th className="p-2 text-right">Target</th>
                    <th className="p-2 text-right">Efficiency</th>
                    <th className="p-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                  {relatedTasks.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/40">
                      <td className="p-2 font-bold text-cyan-400">{t.externalProcessStep}</td>
                      <td className="p-2 text-slate-300">{t.referenceDocument}</td>
                      <td className="p-2 text-slate-400">{t.startTime}</td>
                      <td className="p-2 text-right text-white font-bold">{t.actualQty}</td>
                      <td className="p-2 text-right text-slate-400">{t.targetQty}</td>
                      <td className="p-2 text-right text-emerald-400">{t.efficiency.toFixed(1)}%</td>
                      <td className="p-2 text-center">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            t.ewrlStatus === 'ACHIEVED'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {t.ewrlStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs rounded-lg shadow-lg hover:from-blue-500 hover:to-cyan-500 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
