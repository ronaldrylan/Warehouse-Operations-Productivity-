import React, { useState } from 'react';
import {
  ArrowUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { StaffRecord } from '../types/dashboard';

interface StaffTableProps {
  staffList: StaffRecord[];
  onSelectStaff: (staff: StaffRecord) => void;
  compact?: boolean;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  staffList,
  onSelectStaff,
  compact = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof StaffRecord>('rank');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = compact ? 8 : 10;

  const handleSort = (field: keyof StaffRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filtered = staffList.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.process.toLowerCase().includes(q) ||
      s.shift.toLowerCase().includes(q) ||
      s.incentiveStatus.toLowerCase().includes(q) ||
      (s.remarks && s.remarks.toLowerCase().includes(q))
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusBadge = (status: StaffRecord['incentiveStatus']) => {
    switch (status) {
      case 'Eligible':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Award className="w-2.5 h-2.5" />
            Eligible
          </span>
        );
      case 'Review':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertCircle className="w-2.5 h-2.5" />
            Review
          </span>
        );
      case 'Not Eligible':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-2.5 h-2.5" />
            Not Eligible
          </span>
        );
    }
  };

  return (
    <div
      className={`bg-[#0e1a32]/85 backdrop-blur-md rounded-xl border border-[#1e3458] shadow-md flex flex-col ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      {/* Table Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
        <div>
          <h3 className={`font-bold text-white tracking-wide ${compact ? 'text-sm' : 'text-base'}`}>
            Staff Performance Details
          </h3>
          {!compact && (
            <p className="text-xs text-slate-400 mt-0.5">
              Individual labor metrics, target fulfillment &amp; calculated incentive payouts
            </p>
          )}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search staff, process..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#0a1324]/90 text-slate-200 text-xs pl-8 pr-2.5 py-1.5 rounded-lg border border-[#1e3458] focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Responsive Table Container */}
      <div
        className={`overflow-x-auto rounded-lg border border-[#1e3458]/70 ${
          compact ? 'max-h-[175px] overflow-y-auto' : ''
        }`}
      >
        <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#122344] text-slate-300 font-semibold border-b border-[#1e3458]">
              <th
                onClick={() => handleSort('rank')}
                className="py-2 px-2.5 cursor-pointer hover:text-white transition-colors w-10"
              >
                <div className="flex items-center gap-1">
                  <span>#</span>
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('name')}
                className="py-2 px-2.5 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Staff Name</span>
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('shift')}
                className="py-2 px-2.5 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Shift</span>
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('process')}
                className="py-2 px-2.5 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Process</span>
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('actualQty')}
                className="py-2 px-2.5 cursor-pointer hover:text-white transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Actual Qty</span>
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('targetQty')}
                className="py-2 px-2.5 cursor-pointer hover:text-white transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Target Qty</span>
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('achievementRate')}
                className="py-2 px-2.5 cursor-pointer hover:text-white transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Achievement %</span>
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('incentiveStatus')}
                className="py-2 px-2.5 cursor-pointer hover:text-white transition-colors text-center"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Incentive Status</span>
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('incentiveAmount')}
                className="py-2 px-2.5 cursor-pointer hover:text-white transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Incentive Amount</span>
                  <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                </div>
              </th>
              <th className="py-2 px-2.5">
                <span>Remarks</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#182847]">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-slate-400">
                  No staff members match the selected criteria.
                </td>
              </tr>
            ) : (
              paged.map((staff, idx) => {
                const globalIdx = (currentPage - 1) * pageSize + idx + 1;
                return (
                  <tr
                    key={staff.id || staff.name}
                    onClick={() => onSelectStaff(staff)}
                    className="hover:bg-[#13284d]/75 transition-colors cursor-pointer group"
                  >
                    <td className="py-1.5 px-2.5 font-mono text-slate-400 group-hover:text-cyan-400 font-semibold">
                      {globalIdx}
                    </td>
                    <td className="py-1.5 px-2.5 font-semibold text-slate-100 group-hover:text-cyan-300 flex items-center gap-1.5">
                      <span>{staff.name}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                    <td className="py-1.5 px-2.5 text-slate-300">
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-medium ${
                          staff.shift === 'Day'
                            ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        }`}
                      >
                        {staff.shift}
                      </span>
                    </td>
                    <td className="py-1.5 px-2.5 text-slate-300 max-w-[170px] truncate">
                      {staff.process}
                    </td>
                    <td className="py-1.5 px-2.5 font-mono font-medium text-slate-200 text-right">
                      {staff.actualQty.toLocaleString()}
                    </td>
                    <td className="py-1.5 px-2.5 font-mono text-slate-400 text-right">
                      {staff.targetQty.toLocaleString()}
                    </td>
                    <td className="py-1.5 px-2.5 font-mono font-bold text-right">
                      <span
                        className={
                          staff.achievementRate >= 200
                            ? 'text-emerald-400'
                            : staff.achievementRate >= 120
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }
                      >
                        {staff.achievementRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-1.5 px-2.5 text-center">{getStatusBadge(staff.incentiveStatus)}</td>
                    <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-400 text-right">
                      {staff.incentiveAmount > 0 ? `$${staff.incentiveAmount.toLocaleString()}` : '$0'}
                    </td>
                    <td className="py-1.5 px-2.5 text-slate-300 max-w-[200px] truncate text-[10.5px]">
                      {staff.remarks}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#1d2d50] text-[11px] text-slate-400 ${compact ? 'pt-1.5 mt-1.5' : 'pt-3 mt-3'}`}>
        <div>
          Showing{' '}
          <span className="font-semibold text-slate-200">
            {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-slate-200">
            {Math.min(currentPage * pageSize, filtered.length)}
          </span>{' '}
          of <span className="font-semibold text-slate-200">{filtered.length}</span> staff
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded bg-[#0a1324] border border-[#1e3458] text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-mono text-slate-300">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded bg-[#0a1324] border border-[#1e3458] text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
