export interface StaffRecord {
  id: string;
  rank: number;
  name: string;
  employeeCode: string;
  shift: 'Day' | 'Night';
  process: string;
  actualQty: number;
  targetQty: number;
  achievementRate: number; // e.g. 312.5%
  incentiveStatus: 'Eligible' | 'Review' | 'Not Eligible';
  incentiveAmount: number;
  remarks: string;
  lineManager: string;
  ordersProcessed: number;
  hoursWorked: number;
  location: string;
}

export interface EwmTaskLog {
  id: string;
  reportingGroup: string;
  boeType: string;
  externalProcessStep: string;
  description: string;
  referenceObjectTypeDesc: string;
  referenceDocument: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  actualExecutionDuration: string;
  processor: string;
  fullName: string;
  createdBy: string;
  whseProcType: string;
  huMovement: string;
  actualQty: number;
  divisionDescription: string;
  channel: string;
  businessUnit: string;
  activityArea: string;
  activityAreaDesc: string;
  referenceObjType: string;
  partyEntitledToDispose: string;
  descPersonEntToDispose: string;
  actualDurationTotalIndH: number;
  actualDurationIndirectIndH: number;
  employeeCode: string;
  employeeSource: string;
  lineManager: string;
  uom: string;
  efficiency: number;
  ewrlStatus: 'ACHIEVED' | 'NOT ACHIEVED';
  referenceDocumentNumber: string;
  remark: string;
  userName: string;
  resource: string;
  subProcessCategory: string;
  createdAt: string;
  lmActivityArea: string;
  shift: 'DAY' | 'NIGHT';
  targetQty: number;
}

export interface ProcessPerformance {
  name: string;
  code: string;
  achievementRate: number;
  actualQty: number;
  targetQty: number;
  color: string;
}

export interface ShiftMetric {
  name: 'Day Shift' | 'Night Shift';
  achievementRate: number;
  actualQty: number;
  targetQty: number;
  staffCount: number;
  color: string;
}

export interface DailyTrendPoint {
  date: string;
  dayLabel: string;
  achievementRate: number;
  targetRate: number;
  actualQty: number;
  targetQty: number;
}

export interface RootCause {
  reason: string;
  percentage: number;
  count: number;
}

export interface ManagementInsightData {
  bestPerformer: { name: string; achievement: string };
  lowestPerformer: { name: string; achievement: string };
  bestShift: { name: string; achievement: string };
  shiftRequiringAttention: { name: string; achievement: string };
  topProcess: { name: string; achievement: string };
  processRequiringAttention: { name: string; achievement: string };
  totalIncentiveCost?: number;
  ordersOutsideTAT: { count: number; percentage: string };
  ordersProcessed: number;
  averageProductivity: { count: number; unit: string };
}

export interface FilterOptions {
  dateRange: string;
  shift: string;
  staff: string;
  process: string;
  eligibilityStatus: string;
  location: string;
  searchQuery?: string;
}

export interface IncentiveConfig {
  baseThreshold: number; // e.g. 100%
  tier1BonusPer1000: number; // e.g. $50
  nightShiftAllowance: number; // e.g. $100
  qualityGatePassRequired: boolean; // EWRL check
  maxIncentiveCap: number; // e.g. $1200
}
