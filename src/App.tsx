import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { FilterSidebar } from './components/FilterSidebar';
import { TopStaffChart } from './components/charts/TopStaffChart';
import { IncentiveEligibilityDonut } from './components/charts/IncentiveEligibilityDonut';
import { ShiftAchievementChart } from './components/charts/ShiftAchievementChart';
import { DailyAchievementTrend } from './components/charts/DailyAchievementTrend';
import { ActualVsTargetTrend } from './components/charts/ActualVsTargetTrend';
import { ProcessAchievementChart } from './components/charts/ProcessAchievementChart';
import { ProcessActualVsTargetChart } from './components/charts/ProcessActualVsTargetChart';
import { RootCauseChart } from './components/charts/RootCauseChart';
import { ManagementInsights } from './components/charts/ManagementInsights';
import { StaffTable } from './components/StaffTable';
import { EwmRawLogTable } from './components/EwmRawLogTable';
import { StaffDetailModal } from './components/StaffDetailModal';
import { IncentiveSimulatorModal } from './components/IncentiveSimulatorModal';
import { Footer } from './components/Footer';
import { CinematicBackground, DEFAULT_WAREHOUSE_VIDEO } from './components/CinematicBackground';
import { VideoSettingsModal } from './components/VideoSettingsModal';

import {
  initialStaffList,
  topStaffChartData,
  processPerformanceData,
  shiftMetricsData,
  dailyTrendData,
  rootCausesData,
  managementInsightsData,
  initialEwmTasks,
} from './data/mockData';

import { FilterOptions, StaffRecord, EwmTaskLog, IncentiveConfig } from './types/dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'executive' | 'ewm-logs' | 'simulator'>('executive');
  const [staffList, setStaffList] = useState<StaffRecord[]>(initialStaffList);
  const [ewmTasks, setEwmTasks] = useState<EwmTaskLog[]>(initialEwmTasks);
  const [selectedStaff, setSelectedStaff] = useState<StaffRecord | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('31 Oct 2024 10:45 AM');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cinematic Background States
  const [videoUrl, setVideoUrl] = useState<string>(DEFAULT_WAREHOUSE_VIDEO);
  const [videoOpacity, setVideoOpacity] = useState<number>(75);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  // Screen Fit & Zoom States
  const [fitToScreen, setFitToScreen] = useState<boolean>(true);
  const [zoomScale, setZoomScale] = useState<number>(1.0);

  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'Oct 01, 2024 - Oct 31, 2024',
    shift: 'All',
    staff: 'All',
    process: 'All',
    eligibilityStatus: 'All',
    location: 'All',
  });

  // Calculate auto-fit zoom on window resize when fitToScreen is active
  useEffect(() => {
    const handleResize = () => {
      if (fitToScreen) {
        const vh = window.innerHeight;
        // Typical full dashboard height in compact mode is around 880px
        if (vh < 750) {
          setZoomScale(0.8);
        } else if (vh < 850) {
          setZoomScale(0.88);
        } else if (vh < 960) {
          setZoomScale(0.94);
        } else {
          setZoomScale(1.0);
        }
      } else {
        setZoomScale(1.0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitToScreen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: 'Oct 01, 2024 - Oct 31, 2024',
      shift: 'All',
      staff: 'All',
      process: 'All',
      eligibilityStatus: 'All',
      location: 'All',
    });
    showToast('Filters reset to default view.');
  };

  const handleAddTask = (newTask: EwmTaskLog) => {
    setEwmTasks((prev) => [newTask, ...prev]);
    setStaffList((prev) => {
      const existing = prev.find((s) => s.name.toLowerCase() === newTask.fullName.toLowerCase());
      if (existing) {
        return prev.map((s) =>
          s.id === existing.id
            ? {
                ...s,
                actualQty: s.actualQty + newTask.actualQty,
                ordersProcessed: s.ordersProcessed + 1,
              }
            : s
        );
      }
      return prev;
    });
    showToast(`Ingested task ${newTask.referenceDocument} (${newTask.externalProcessStep})`);
  };

  const handleApplyIncentivePolicy = (config: IncentiveConfig) => {
    setStaffList((prev) =>
      prev.map((s) => {
        const isEligible = s.achievementRate >= config.baseThreshold;
        let bonus = 0;
        if (isEligible) {
          const over = Math.max(0, s.actualQty - s.targetQty);
          bonus = (over / 1000) * config.tier1BonusPer1000;
          if (s.shift === 'Night') bonus += config.nightShiftAllowance;
          bonus = Math.min(bonus, config.maxIncentiveCap);
        }
        return {
          ...s,
          incentiveStatus: isEligible ? 'Eligible' : 'Not Eligible',
          incentiveAmount: Math.round(bonus),
        };
      })
    );
    showToast('Incentive policy applied! Payouts updated across all staff.');
  };

  const handleRefresh = () => {
    const now = new Date();
    const formatted =
      now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) +
      ' ' +
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastUpdated(formatted);
    showToast('Data refreshed successfully.');
  };

  const handleExport = () => {
    const headers = [
      'Rank',
      'Staff Name',
      'Shift',
      'Process',
      'Actual Qty',
      'Target Qty',
      'Achievement %',
      'Incentive Status',
      'Incentive Amount ($)',
      'Remarks',
    ];
    const rows = filteredStaff.map((s) => [
      s.rank,
      `"${s.name}"`,
      s.shift,
      `"${s.process}"`,
      s.actualQty,
      s.targetQty,
      `${s.achievementRate.toFixed(1)}%`,
      s.incentiveStatus,
      s.incentiveAmount,
      `"${s.remarks}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Staff_Performance_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Staff Performance Report to CSV.');
  };

  const filteredStaff = useMemo(() => {
    return staffList.filter((s) => {
      if (filters.shift !== 'All' && s.shift !== filters.shift) return false;
      if (filters.staff !== 'All' && s.name !== filters.staff) return false;
      if (filters.process !== 'All' && !s.process.toLowerCase().includes(filters.process.toLowerCase())) {
        return false;
      }
      if (filters.eligibilityStatus !== 'All' && s.incentiveStatus !== filters.eligibilityStatus) {
        return false;
      }
      return true;
    });
  }, [staffList, filters]);

  const isFiltered =
    filters.shift !== 'All' ||
    filters.staff !== 'All' ||
    filters.process !== 'All' ||
    filters.eligibilityStatus !== 'All';

  const kpiData = useMemo(() => {
    if (!isFiltered) {
      return {
        totalStaff: 47,
        eligibleStaff: 44,
        notEligibleStaff: 3,
        achievementRate: 201.7,
        totalActualQty: 205256,
        totalTargetQty: 101786,
        eligibilityRate: 93.6,
        totalIncentiveCost: 12540,
        ordersProcessed: 8432,
        productivityPerStaff: 4367,
      };
    }

    const totalStaff = filteredStaff.length;
    const eligibleStaff = filteredStaff.filter((s) => s.incentiveStatus === 'Eligible').length;
    const notEligibleStaff = filteredStaff.filter((s) => s.incentiveStatus === 'Not Eligible').length;
    const totalActualQty = filteredStaff.reduce((sum, s) => sum + s.actualQty, 0);
    const totalTargetQty = filteredStaff.reduce((sum, s) => sum + s.targetQty, 0);
    const achievementRate = totalTargetQty > 0 ? (totalActualQty / totalTargetQty) * 100 : 0;
    const eligibilityRate = totalStaff > 0 ? (eligibleStaff / totalStaff) * 100 : 0;
    const totalIncentiveCost = filteredStaff.reduce((sum, s) => sum + s.incentiveAmount, 0);
    const ordersProcessed = filteredStaff.reduce((sum, s) => sum + s.ordersProcessed, 0);
    const productivityPerStaff = totalStaff > 0 ? Math.round(totalActualQty / totalStaff) : 0;

    return {
      totalStaff,
      eligibleStaff,
      notEligibleStaff,
      achievementRate,
      totalActualQty,
      totalTargetQty,
      eligibilityRate,
      totalIncentiveCost,
      ordersProcessed,
      productivityPerStaff,
    };
  }, [isFiltered, filteredStaff]);

  const staffNames = useMemo(
    () => Array.from(new Set(staffList.map((s) => s.name))),
    [staffList]
  );
  const processNames = useMemo(
    () => [
      'Picking',
      'Packing',
      'Put-away',
      'Replenishment',
      'Loading',
      'Inventory Count',
      'Shiplane Pallet Building Outbound',
      'Picking from 9062 to 9063 Out interim',
      'Shipping lane 9020 to 9061 Interim bin',
      'bin to bin transfer in 9062',
      'Final Pallet Building Outbound',
    ],
    []
  );

  return (
    <div
      className={`min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white relative ${
        fitToScreen ? 'h-screen max-h-screen overflow-hidden' : ''
      }`}
    >
      {/* 1. Cinematic Background Video Clip */}
      <CinematicBackground
        videoUrl={videoUrl}
        overlayOpacity={videoOpacity}
        isPlaying={isPlayingVideo}
      />

      {/* Cinematic Video Controls Modal */}
      <VideoSettingsModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        currentVideoUrl={videoUrl}
        onSelectVideoUrl={setVideoUrl}
        overlayOpacity={videoOpacity}
        onOpacityChange={setVideoOpacity}
        isPlaying={isPlayingVideo}
        onTogglePlay={() => setIsPlayingVideo(!isPlayingVideo)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#0f244a]/95 text-cyan-200 border border-cyan-500/40 px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Top Navigation Header */}
      <Header
        currentView={currentView}
        onViewChange={(v) => {
          if (v === 'simulator') {
            setIsSimulatorOpen(true);
          } else {
            setCurrentView(v);
          }
        }}
        dateRange={filters.dateRange}
        onDateRangeChange={(r) => handleFilterChange('dateRange', r)}
        onExport={handleExport}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        onOpenVideoSettings={() => setShowVideoModal(true)}
        isPlayingVideo={isPlayingVideo}
        fitToScreen={fitToScreen}
        onToggleFitToScreen={() => {
          setFitToScreen(!fitToScreen);
          showToast(!fitToScreen ? 'Fit to Screen enabled' : 'Scrollable view enabled');
        }}
        zoomScale={zoomScale}
        onZoomChange={setZoomScale}
      />

      {/* 3. Main Content Container */}
      <div
        className={`flex-1 flex flex-col z-10 transition-transform origin-top ${
          fitToScreen ? 'overflow-hidden px-2 sm:px-3 py-1.5' : 'px-3 sm:px-4 lg:px-6 py-4'
        }`}
        style={
          fitToScreen && zoomScale !== 1.0
            ? {
                transform: `scale(${zoomScale})`,
                width: `${100 / zoomScale}%`,
                transformOrigin: 'top left',
              }
            : undefined
        }
      >
        <div className="max-w-[1920px] w-full mx-auto flex flex-col flex-1 gap-2">
          {/* 10 KPI Cards */}
          <KpiCards
            totalStaff={kpiData.totalStaff}
            eligibleStaff={kpiData.eligibleStaff}
            notEligibleStaff={kpiData.notEligibleStaff}
            achievementRate={kpiData.achievementRate}
            totalActualQty={kpiData.totalActualQty}
            totalTargetQty={kpiData.totalTargetQty}
            eligibilityRate={kpiData.eligibilityRate}
            ordersProcessed={kpiData.ordersProcessed}
            productivityPerStaff={kpiData.productivityPerStaff}
            isFiltered={isFiltered}
            compact={fitToScreen}
          />

          {/* View Modes */}
          {currentView === 'executive' ? (
            <div className={`flex flex-col lg:flex-row gap-2.5 items-start flex-1 ${fitToScreen ? 'overflow-hidden min-h-0' : ''}`}>
              {/* Left Sidebar: Filters */}
              <div className={`shrink-0 ${fitToScreen ? 'w-full lg:w-56 h-full flex flex-col' : 'w-full lg:w-64'}`}>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                  staffNames={staffNames}
                  processNames={processNames}
                  compact={fitToScreen}
                />
              </div>

              {/* Main Analytics Grid + Table */}
              <div className={`flex-1 flex flex-col gap-2 w-full ${fitToScreen ? 'h-full overflow-y-auto pr-1' : ''}`}>
                {/* Row 1: Top 10 Staff | Donut | Achievement by Shift */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                  <TopStaffChart
                    staffList={filteredStaff}
                    onSelectStaff={(staff) => setSelectedStaff(staff)}
                    compact={fitToScreen}
                  />
                  <IncentiveEligibilityDonut
                    eligibleCount={kpiData.eligibleStaff}
                    notEligibleCount={kpiData.notEligibleStaff}
                    eligibleRate={kpiData.eligibilityRate}
                    compact={fitToScreen}
                  />
                  <ShiftAchievementChart
                    shiftMetrics={shiftMetricsData}
                    compact={fitToScreen}
                  />
                </div>

                {/* Row 2: Daily Trend | Actual vs Target Trend | Process Achievement */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                  <DailyAchievementTrend
                    data={dailyTrendData}
                    compact={fitToScreen}
                  />
                  <ActualVsTargetTrend
                    data={dailyTrendData}
                    compact={fitToScreen}
                  />
                  <ProcessAchievementChart
                    data={processPerformanceData}
                    compact={fitToScreen}
                  />
                </div>

                {/* Row 3: Process Actual vs Target | Root Cause | Management Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                  <ProcessActualVsTargetChart
                    data={processPerformanceData}
                    compact={fitToScreen}
                  />
                  <RootCauseChart
                    data={rootCausesData}
                    compact={fitToScreen}
                  />
                  <ManagementInsights
                    insights={managementInsightsData}
                    compact={fitToScreen}
                  />
                </div>

                {/* Row 4: Staff Performance Details Table */}
                <StaffTable
                  staffList={filteredStaff}
                  onSelectStaff={(staff) => setSelectedStaff(staff)}
                  compact={fitToScreen}
                />

                {/* Footer in scroll mode or at bottom */}
                <Footer compact={fitToScreen} />
              </div>
            </div>
          ) : (
            /* EWM Operational Task Logs View */
            <div className="w-full flex-1 overflow-y-auto">
              <EwmRawLogTable
                tasks={ewmTasks}
                onAddTask={handleAddTask}
              />
              <Footer compact={fitToScreen} />
            </div>
          )}
        </div>
      </div>

      {/* Staff Detail Drawer / Modal */}
      <StaffDetailModal
        staff={selectedStaff}
        onClose={() => setSelectedStaff(null)}
        tasks={ewmTasks}
      />

      {/* Incentive Simulator Modal */}
      <IncentiveSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        staffList={staffList}
        onApplyConfig={handleApplyIncentivePolicy}
      />
    </div>
  );
}
