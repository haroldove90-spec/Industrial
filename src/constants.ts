import { 
  Database, 
  Settings, 
  Users, 
  Wrench, 
  ClipboardCheck, 
  Package, 
  BarChart3, 
  Truck, 
  ShoppingCart, 
  History,
  LayoutDashboard,
  LucideIcon,
  FileText,
  Calendar,
  QrCode,
  Search,
  ShieldCheck,
  Activity,
  AlertOctagon
} from 'lucide-react';
import { 
  OperatorProductivity, 
  NonConformity, 
  Machine, 
  MaintenanceSchedule, 
  Blueprint,
  AttendanceRecord,
  UserProfile
} from './types';

export interface Module {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  count?: string | number | null;
  roles: string[];
}

export const MODULES: Module[] = [
  { id: 'dashboard', name: 'Resumen', icon: Activity, description: 'Vista general del sistema', roles: ['admin', 'management', 'operator', 'quality', 'maintenance'] },
  { id: 'orders', name: 'Producción', icon: ClipboardCheck, description: 'Gestión de OT y planificación', roles: ['admin', 'operator', 'management'] },
  { id: 'inventory', name: 'Almacén', icon: Package, description: 'Control de stock y materias primas', count: 'Low', roles: ['admin', 'operator', 'management'] },
  { id: 'quality', name: 'Calidad (NC)', icon: ShieldCheck, description: 'Gestión de No Conformidades', count: 3, roles: ['admin', 'quality', 'management'] },
  { id: 'maintenance', name: 'Mantenimiento', icon: Wrench, description: 'Planes preventivos y herramientas', roles: ['admin', 'maintenance', 'management'] },
  { id: 'workforce', name: 'Operarios', icon: Users, description: 'Gestión de personal y Check-in', count: '80%', roles: ['admin', 'management'] },
  { id: 'blueprints', name: 'Planos Técnicos', icon: FileText, description: 'Catálogo de especificaciones', roles: ['admin', 'operator', 'quality', 'maintenance'] },
  { id: 'reports', name: 'Gerencia', icon: BarChart3, description: 'KPIs, OEE y Análisis de Calidad', roles: ['admin', 'management'] },
  { id: 'admin', name: 'Usuarios', icon: Settings, description: 'Gestión de accesos y roles', roles: ['admin'] },
];

export const MOCK_USERS: UserProfile[] = [
  { id: 'u-1', name: 'Alejandro Mendoza', email: 'a.mendoza@industrial.c', role: 'admin', lastAccess: '2024-05-04 08:30', isActive: true },
  { id: 'u-2', name: 'Carlos Ruiz', email: 'c.ruiz@industrial.c', role: 'operator', lastAccess: '2024-05-04 06:15', isActive: true },
  { id: 'u-3', name: 'Elena Torres', email: 'e.torres@industrial.c', role: 'quality', lastAccess: '2024-05-03 16:45', isActive: true },
  { id: 'u-4', name: 'Miguel Angel', email: 'm.angel@industrial.c', role: 'maintenance', lastAccess: '2024-05-04 07:00', isActive: true },
  { id: 'u-5', name: 'Sofia Vergara', email: 's.vergara@industrial.c', role: 'management', lastAccess: '2024-05-02 11:20', isActive: false },
];

export const MOCK_OEE_DATA = [
  { name: 'Lun', oee: 78, target: 85 },
  { name: 'Mar', oee: 82, target: 85 },
  { name: 'Mie', oee: 86, target: 85 },
  { name: 'Jue', oee: 84, target: 85 },
  { name: 'Vie', oee: 88, target: 85 },
  { name: 'Sab', oee: 81, target: 85 },
];

export const MOCK_QUALITY_DATA = [
  { name: 'Conformes', value: 945, color: '#10b981' },
  { name: 'No Conformidades', value: 55, color: '#ef4444' },
];

export const MOCK_INVENTORY_LEVELS = [
  { item: 'Acero Inox 304', stock: 12, min: 20 },
  { item: 'Aluminio 6061', stock: 8, min: 15 },
  { item: 'Electrodos E6013', stock: 45, min: 100 },
  { item: 'Pernos M12', stock: 150, min: 200 },
];

export const MOCK_WORK_ORDERS = [
  {
    id: 'wo-1',
    orderNumber: 'OT-2024-001',
    client: 'Industrial S.A.',
    status: 'in_progress' as const,
    priority: 'high' as const,
    machine: 'CNC-04',
    operator: 'Carlos Ruiz',
    materialUsed: 'Acero Inox 304',
    batchNumber: 'BATCH-2024-A9',
    progress: 65,
  },
  {
    id: 'wo-2',
    orderNumber: 'OT-2024-002',
    client: 'MetalMec Ltd.',
    status: 'quality_check' as const,
    priority: 'urgent' as const,
    machine: 'TOR-02',
    operator: 'Ana Beltrán',
    materialUsed: 'Aluminio 6061',
    batchNumber: 'BATCH-2024-B1',
    progress: 95,
  },
];

export const MOCK_OPERATOR_PRODUCTIVITY: OperatorProductivity[] = [
  { name: 'C. Ruiz', actual: 480, estimated: 500 },
  { name: 'A. Beltrán', actual: 520, estimated: 480 },
  { name: 'J. Gómez', actual: 450, estimated: 450 },
  { name: 'M. López', actual: 390, estimated: 480 },
];

export const MOCK_QUALITY_HEATMAP = [
  { machine: 'CNC-01', failures: 2 },
  { machine: 'CNC-02', failures: 5 },
  { machine: 'CNC-03', failures: 1 },
  { machine: 'CNC-04', failures: 0 },
  { machine: 'TOR-01', failures: 8 },
  { machine: 'TOR-02', failures: 3 },
];

export const MOCK_MACHINES: Machine[] = [
  {
    id: 'm-1',
    name: 'CNC-04',
    type: 'Centro de Mecanizado',
    status: 'operational',
    lastMaintenance: '2024-04-15',
    nextMaintenance: '2024-05-15',
    oee: 88,
    repairHistory: [
      { date: '2024-01-10', description: 'Cambio de husillo', cost: 1200 },
      { date: '2023-11-20', description: 'Calibración ejes X/Y', cost: 450 },
    ]
  },
  {
    id: 'm-2',
    name: 'TOR-01',
    type: 'Torno Paralelo',
    status: 'maintenance',
    lastMaintenance: '2024-03-20',
    nextMaintenance: '2024-05-04',
    oee: 72,
    repairHistory: [
      { date: '2024-05-01', description: 'Ruido excesivo motor principal', cost: 800 },
    ]
  }
];

export const MOCK_MAINTENANCE_SCHEDULE: MaintenanceSchedule[] = [
  { id: 'sch-1', machineId: 'm-1', date: '2024-05-15', type: 'preventive', description: 'Lubricación y limpieza filtros', technician: 'R. Mendez' },
  { id: 'sch-2', machineId: 'm-2', date: '2024-05-04', type: 'corrective', description: 'Revisión sistema eléctrico', technician: 'L. Vega' },
];

export const MOCK_BLUEPRINTS: Blueprint[] = [
  {
    id: 'bp-1',
    title: 'Eje de Transmisión Principal',
    code: 'PLN-2024-001',
    version: 'V2.1',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop',
    specifications: [
      { label: 'Material', value: 'Acero 4140' },
      { label: 'Dureza', value: '45-50 HRC' },
      { label: 'Tolerancia', value: '±0.05mm' },
    ]
  },
  {
    id: 'bp-2',
    title: 'Soporte de Motor Reforzado',
    code: 'PLN-2024-002',
    version: 'V1.0',
    imageUrl: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2070&auto=format&fit=crop',
    specifications: [
      { label: 'Material', value: 'Aluminio 6061-T6' },
      { label: 'Acabado', value: 'Anodizado Negro' },
    ]
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', operatorId: 'op-1', date: '2024-05-04', checkIn: '08:00:15', checkOut: '17:05:30' },
];

export const MOCK_NON_CONFORMITIES: NonConformity[] = [
  { id: '1', orderId: 'OT-2024-001', type: 'Dimensiones', description: 'Sobremedida en eje principal', status: 'pending', priority: 'high', costImpact: 450 },
  { id: '2', orderId: 'OT-2024-002', type: 'Acabado', description: 'Rugosidad superior a norma', status: 'analysis', priority: 'medium', costImpact: 120 },
  { id: '3', orderId: 'OT-2024-003', type: 'Material', description: 'Porosidad detectada en fundición', status: 'corrective', priority: 'urgent', costImpact: 1200 },
];
