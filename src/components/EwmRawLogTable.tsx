import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  FileSpreadsheet,
  Upload,
  Download,
  Plus,
  RefreshCw,
  Clock,
  Layers,
} from 'lucide-react';
import { EwmTaskLog } from '../types/dashboard';

interface EwmRawLogTableProps {
  tasks: EwmTaskLog[];
  onAddTask: (task: EwmTaskLog) => void;
}

export const EwmRawLogTable: React.FC<EwmRawLogTableProps> = ({ tasks, onAddTask }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stepFilter, setStepFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [processorFilter, setProcessorFilter] = useState('ALL');
  const [pasteModalOpen, setPasteModalOpen] = useState(false);
  const [rawPastedText, setRawPastedText] = useState('');

  // Extract unique steps and processors
  const uniqueSteps = Array.from(new Set(tasks.map((t) => t.externalProcessStep).filter(Boolean)));
  const uniqueProcessors = Array.from(new Set(tasks.map((t) => t.fullName).filter(Boolean)));

  const filtered = tasks.filter((t) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      t.description.toLowerCase().includes(q) ||
      t.referenceDocument.toLowerCase().includes(q) ||
      t.fullName.toLowerCase().includes(q) ||
      t.processor.toLowerCase().includes(q) ||
      t.lineManager.toLowerCase().includes(q) ||
      t.externalProcessStep.toLowerCase().includes(q);

    const matchesStep = stepFilter === 'ALL' || t.externalProcessStep === stepFilter;
    const matchesStatus = statusFilter === 'ALL' || t.ewrlStatus === statusFilter;
    const matchesProc = processorFilter === 'ALL' || t.fullName === processorFilter;

    return matchesSearch && matchesStep && matchesStatus && matchesProc;
  });

  const handleImportText = () => {
    if (!rawPastedText.trim()) return;

    const lines = rawPastedText.trim().split('\n');
    let importedCount = 0;

    for (const line of lines) {
      const cols = line.split('\t');
      if (cols.length >= 10) {
        // Skip header row if pasted
        if (cols[0].toLowerCase().includes('reporting') || cols[2]?.toLowerCase() === 'external process step') {
          continue;
        }

        const newTask: EwmTaskLog = {
          id: `ewm-imp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          reportingGroup: cols[0] || 'DISP',
          boeType: cols[1] || '',
          externalProcessStep: cols[2] || 'OUIM',
          description: cols[3] || 'Operational Warehouse Order',
          referenceObjectTypeDesc: cols[4] || 'Indirect Labor Task',
          referenceDocument: cols[5] || `JADC${Date.now()}`,
          startDate: cols[6] || '10/10/2026',
          startTime: cols[7] || '23:00:00',
          endDate: cols[8] || '10/10/2026',
          endTime: cols[9] || '23:05:00',
          actualExecutionDuration: cols[10] || '00:05:00',
          processor: cols[11] || '102602',
          fullName: cols[12] || 'PROCESSOR',
          createdBy: cols[13] || '',
          whseProcType: cols[14] || '',
          huMovement: cols[15] || '',
          actualQty: parseFloat(cols[16]) || 1,
          divisionDescription: cols[17] || '',
          channel: cols[18] || '',
          businessUnit: cols[19] || '',
          activityArea: cols[20] || 'IL',
          activityAreaDesc: cols[21] || '',
          referenceObjType: cols[22] || '1D00',
          partyEntitledToDispose: cols[23] || 'DC-UAE SSS UAE',
          descPersonEntToDispose: cols[24] || '',
          actualDurationTotalIndH: parseFloat(cols[25]) || 0.05,
          actualDurationIndirectIndH: parseFloat(cols[26]) || 0.0,
          employeeCode: cols[27] || '80017601',
          employeeSource: cols[28] || 'SSS',
          lineManager: cols[29] || 'CHOKKANA HALLI LAKSH',
          uom: cols[30] || 'CAR',
          efficiency: parseFloat(cols[31]) || 100,
          ewrlStatus: (cols[32]?.trim().toUpperCase() === 'ACHIEVED' ? 'ACHIEVED' : 'NOT ACHIEVED'),
          referenceDocumentNumber: cols[33] || '',
          remark: cols[34] || '',
          userName: cols[35] || cols[12] || '',
          resource: cols[36] || '',
          subProcessCategory: cols[37] || '',
          createdAt: cols[38] || '23:00:00',
          lmActivityArea: cols[39] || '',
          shift: (cols[40]?.trim().toUpperCase() === 'DAY' ? 'DAY' : 'NIGHT'),
          targetQty: parseFloat(cols[41]) || 1,
        };

        onAddTask(newTask);
        importedCount++;
      }
    }

    setPasteModalOpen(false);
    setRawPastedText('');
    alert(`Successfully imported ${importedCount} operational log entries!`);
  };

  const exportCsv = () => {
    const headers = [
      'Reporting Group',
      'Process Step',
      'Description',
      'Ref Document',
      'Start Time',
      'End Time',
      'Duration',
      'Processor',
      'Actual Qty',
      'Target Qty',
      'UOM',
      'Efficiency',
      'EWRL Status',
      'Line Manager',
      'Shift',
    ];

    const rows = filtered.map((t) => [
      t.reportingGroup,
      t.externalProcessStep,
      `"${t.description}"`,
      t.referenceDocument,
      t.startTime,
      t.endTime,
      t.actualExecutionDuration,
      t.fullName,
      t.actualQty,
      t.targetQty,
      t.uom,
      t.efficiency,
      t.ewrlStatus,
      `"${t.lineManager}"`,
      t.shift,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EWM_Labor_Logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#0e1a32]/90 rounded-xl p-4 sm:p-6 border border-[#1e3458] shadow-lg flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#1d2d50]">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              SAP EWM Operational Labor Logs
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-cyan-500/30">
              DISP Dispatch &amp; Interim
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Raw transactional task data feeds directly from SAP EWM / LM into the executive incentive dashboard
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={() => setPasteModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#12244a] hover:bg-[#183060] text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-semibold transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Paste / Import TSV</span>
          </button>
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg text-xs font-semibold shadow transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#0a1324] p-3 rounded-lg border border-[#1e3458]/70">
        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tasks, docs, staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0e1a32] text-slate-200 text-xs pl-8 pr-3 py-2 rounded-md border border-[#1e3458] focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Process Step Filter */}
        <div>
          <select
            value={stepFilter}
            onChange={(e) => setStepFilter(e.target.value)}
            className="w-full bg-[#0e1a32] text-slate-200 text-xs px-3 py-2 rounded-md border border-[#1e3458] focus:border-cyan-500 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Process Steps ({tasks.length})</option>
            {uniqueSteps.map((step) => (
              <option key={step} value={step}>
                Step: {step}
              </option>
            ))}
          </select>
        </div>

        {/* Processor Filter */}
        <div>
          <select
            value={processorFilter}
            onChange={(e) => setProcessorFilter(e.target.value)}
            className="w-full bg-[#0e1a32] text-slate-200 text-xs px-3 py-2 rounded-md border border-[#1e3458] focus:border-cyan-500 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Processors</option>
            {uniqueProcessors.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* EWRL Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#0e1a32] text-slate-200 text-xs px-3 py-2 rounded-md border border-[#1e3458] focus:border-cyan-500 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All EWRL Status</option>
            <option value="ACHIEVED">ACHIEVED</option>
            <option value="NOT ACHIEVED">NOT ACHIEVED</option>
          </select>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto rounded-lg border border-[#1e3458]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#122344] text-slate-300 font-semibold border-b border-[#1e3458]">
              <th className="py-2.5 px-3">Step</th>
              <th className="py-2.5 px-3">Description</th>
              <th className="py-2.5 px-3">Ref Document</th>
              <th className="py-2.5 px-3">Processor</th>
              <th className="py-2.5 px-3">Start / End Time</th>
              <th className="py-2.5 px-3 text-right">Actual Qty</th>
              <th className="py-2.5 px-3 text-right">Target Qty</th>
              <th className="py-2.5 px-3 text-center">UOM</th>
              <th className="py-2.5 px-3 text-right">Efficiency %</th>
              <th className="py-2.5 px-3 text-center">EWRL Status</th>
              <th className="py-2.5 px-3">Line Manager</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#182847]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center py-8 text-slate-400">
                  No operational records match criteria.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#13284d]/60 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {item.externalProcessStep}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-200 font-medium max-w-[220px] truncate" title={item.description}>
                    {item.description}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">
                    {item.referenceDocument}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-100">
                    <div>{item.fullName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">ID: {item.processor} / {item.employeeCode}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 font-mono text-[11px]">
                    <div>{item.startTime} → {item.endTime}</div>
                    <div className="text-[10px] text-slate-400">Dur: {item.actualExecutionDuration}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-100 text-right">
                    {item.actualQty}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-right">
                    {item.targetQty}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.uom}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-right">
                    <span
                      className={
                        item.efficiency >= 200
                          ? 'text-emerald-400'
                          : item.efficiency >= 100
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }
                    >
                      {item.efficiency.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.ewrlStatus === 'ACHIEVED' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3" />
                        ACHIEVED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        <XCircle className="w-3 h-3" />
                        NOT ACHIEVED
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 text-[11px] truncate max-w-[150px]">
                    {item.lineManager}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paste / Import Modal */}
      {pasteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0b132b] rounded-2xl border border-cyan-500/30 p-6 max-w-2xl w-full shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1d2d50]">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Import Raw SAP EWM / LM Log Data</h3>
              </div>
              <button
                onClick={() => setPasteModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Paste rows copied directly from SAP EWM / LM (tab-delimited or TSV format). The parser will automatically map all 42 columns including External Process Step, Processor, Actual Qty, Target Qty, Efficiency %, and EWRL Status.
            </p>

            <textarea
              rows={8}
              value={rawPastedText}
              onChange={(e) => setRawPastedText(e.target.value)}
              placeholder="Paste tab-delimited records here..."
              className="w-full bg-[#070e1e] border border-[#1e3458] rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
            />

            <div className="flex justify-end gap-3 pt-2 border-t border-[#1d2d50]">
              <button
                onClick={() => setPasteModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleImportText}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow"
              >
                Process &amp; Ingest Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
