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
  LucideIcon
} from 'lucide-react';

export interface Module {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  count?: number;
}

export const MODULES: Module[] = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, description: 'Vista general del sistema' },
  { id: 'work-orders', name: 'Órdenes de Trabajo', icon: ClipboardCheck, description: 'Gestión de OT y planificación' },
  { id: 'inventory', name: 'Inventario Crítico', icon: Package, description: 'Control de stock y materias primas', count: 12 },
  { id: 'production', name: 'Producción', icon: BarChart3, description: 'Seguimiento de planta en tiempo real' },
  { id: 'quality', name: 'Control de Calidad', icon: History, description: 'Registros de inspección y trazabilidad' },
  { id: 'machinery', name: 'Maquinaria (OEE)', icon: Wrench, description: 'Estado y eficiencia de equipos' },
  { id: 'maintenance', name: 'Mantenimiento', icon: Settings, description: 'Planes preventivos y correcciones' },
  { id: 'workforce', name: 'Operarios', icon: Users, description: 'Gestión de personal y especialidades' },
  { id: 'reports', name: 'Reportes Gerenciales', icon: BarChart3, description: 'KPIs, OEE y Análisis de Calidad' },
  { id: 'purchasing', name: 'Compras', icon: ShoppingCart, description: 'Proveedores e insumos' },
  { id: 'logistics', name: 'Logística', icon: Truck, description: 'Despachos y envíos a clientes' },
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

export const MOCK_NON_CONFORMITIES: NonConformity[] = [
  { id: 'nc-1', title: 'Desviación Milimétrica Eje X', machine: 'TOR-01', priority: 'high', cost: 1250, status: 'pending', date: '2024-05-01' },
  { id: 'nc-2', title: 'Acabado Superficial Rugoso', machine: 'CNC-02', priority: 'medium', cost: 450, status: 'analyzing', date: '2024-05-02' },
  { id: 'nc-3', title: 'Grieta en Tratamiento Térmico', machine: 'TOR-01', priority: 'critical', cost: 3800, status: 'action', date: '2024-05-03' },
  { id: 'nc-4', title: 'Error de Etiquetado Lote 44', machine: 'ALM-01', priority: 'low', cost: 50, status: 'closed', date: '2024-04-30' },
];
