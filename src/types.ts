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

export interface NonConformity {
  id: string;
  title: string;
  machine: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  cost: number;
  status: 'pending' | 'analyzing' | 'action' | 'closed';
  date: string;
}
