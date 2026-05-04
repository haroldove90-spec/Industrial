/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WOStatus = 'pending' | 'in_progress' | 'quality_check' | 'finished' | 'blocked';

export interface WorkOrder {
  id: string;
  orderNumber: string;
  client: string;
  status: WOStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  machine?: string;
  operator?: string;
  materialUsed?: string;
  batchNumber?: string;
  progress: number;
}

export interface QualityInspection {
  id: string;
  woId: string;
  nominalValue: number;
  actualValue: number;
  tolerance: number;
  result: 'pass' | 'fail';
  inspector: string;
  timestamp: string;
}

export interface InventoryMovement {
  materialId: string;
  quantity: number;
  type: 'consumption' | 'replenishment';
  woId?: string;
}

export interface OperatorProductivity {
  name: string;
  actual: number;
  estimated: number;
}

export type UserRole = 'admin' | 'operator' | 'quality' | 'maintenance' | 'management';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastAccess: string;
  isActive: boolean;
}

export interface RootCauseAnalysis {
  method: '5whys' | 'ishikawa';
  data: string[]; // for 5whys it's the 5 questions, for ishikawa it could be categories
}

export interface AppNotification {
  id: string;
  type: 'maintenance' | 'production' | 'inventory' | 'quality';
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface FinancialMetric {
  orderId: string;
  budget: number;
  actualCost: number;
  variance: number;
  materialsCost: number;
  laborCost: number;
}

export interface NonConformity {
  id: string;
  orderId: string;
  type: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
  costImpact: number;
  status: 'pending' | 'analysis' | 'corrective' | 'closed';
  date?: string;
  evidenceUrl?: string;
  rootCause?: RootCauseAnalysis;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'maintenance' | 'broken';
  lastMaintenance: string;
  nextMaintenance: string;
  oee: number;
  repairHistory: { date: string; description: string; cost: number }[];
}

export interface MaintenanceSchedule {
  id: string;
  machineId: string;
  date: string;
  type: 'preventive' | 'corrective';
  description: string;
  technician: string;
}

export interface Blueprint {
  id: string;
  title: string;
  code: string;
  version: string;
  imageUrl: string;
  specifications: { label: string; value: string }[];
}

export interface AttendanceRecord {
  id: string;
  operatorId: string;
  checkIn: string;
  checkOut?: string;
  date: string;
}
