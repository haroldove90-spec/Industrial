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
