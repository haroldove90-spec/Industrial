-- Esquema de Base de Datos para MetalFlow ERP (Supabase/PostgreSQL)
-- Diseñado para el sector metalmecánico con integridad referencial completa.

-- 1. Módulo de Operarios (Recursos Humanos)
CREATE TABLE operators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    employee_id TEXT UNIQUE NOT NULL,
    specialty TEXT, -- Soldador, Tornero, Operario CNC
    status TEXT DEFAULT 'active', -- active, on_leave, terminated
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Módulo de Maquinaria y Equipos
CREATE TABLE machines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL, -- e.g., CNC-01, TOR-05
    name TEXT NOT NULL,
    type TEXT,
    location TEXT,
    status TEXT DEFAULT 'operational', -- operational, maintenance, repair, idle
    oee_target DECIMAL(5,2) DEFAULT 85.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Módulo de Materia Prima e Inventario
CREATE TABLE materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    material_type TEXT, -- Acero Inox, Aluminio, Hierro
    dimensions TEXT,
    unit_measure TEXT DEFAULT 'kg', -- kg, unidades, metros
    stock_level DECIMAL(12,2) DEFAULT 0.00,
    critical_threshold DECIMAL(12,2) DEFAULT 10.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Módulo de Clientes
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    tax_id TEXT UNIQUE NOT NULL,
    contact_name TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Módulo de Órdenes de Trabajo (OT)
CREATE TABLE work_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL, -- e.g., OT-2024-001
    client_id UUID REFERENCES clients(id),
    status TEXT DEFAULT 'pending', -- pending, in_progress, quality_check, finished, cancelled
    priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Módulo de Trazabilidad y Producción
-- Conexión de OTs con Operarios, Maquinaria y Lotes
CREATE TABLE production_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
    machine_id UUID REFERENCES machines(id),
    operator_id UUID REFERENCES operators(id),
    material_id UUID REFERENCES materials(id),
    quantity_produced INTEGER NOT NULL,
    scrap_quantity INTEGER DEFAULT 0,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    batch_number TEXT NOT NULL, -- Core for traceability
    oee_availability DECIMAL(5,2),
    oee_performance DECIMAL(5,2),
    oee_quality DECIMAL(5,2)
);

-- 7. Módulo de Calidad (No Conformidades)
CREATE TABLE quality_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    production_log_id UUID REFERENCES production_logs(id),
    is_conform BOOLEAN DEFAULT TRUE,
    fault_description TEXT,
    severity TEXT, -- minor, major, critical
    inspector_id UUID REFERENCES operators(id),
    inspected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Módulo de Compras y Proveedores
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    contact_person TEXT,
    category TEXT, -- Metales, Herramientas, Insumos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Módulo de Mantenimiento
CREATE TABLE maintenance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    machine_id UUID REFERENCES machines(id),
    logged_by UUID REFERENCES operators(id),
    maintenance_type TEXT, -- preventive, corrective
    description TEXT,
    scheduled_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 10. Módulo de Despachos y Logística
CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_order_id UUID REFERENCES work_orders(id),
    destination_address TEXT,
    carrier TEXT,
    tracking_number TEXT,
    shipped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimización de reportes (OEE e Inventario)
CREATE INDEX idx_production_machine ON production_logs(machine_id);
CREATE INDEX idx_production_wo ON production_logs(work_order_id);
CREATE INDEX idx_quality_status ON quality_reports(is_conform);
CREATE INDEX idx_inventory_stock ON materials(stock_level);

-- FUNCIÓN CORE: Deducción automática de inventario
-- Se dispara cuando se crea un registro de producción (production_logs)
CREATE OR REPLACE FUNCTION fn_deduct_inventory()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE materials
    SET stock_level = stock_level - NEW.quantity_produced
    WHERE id = NEW.material_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_on_production_deduct_stock
AFTER INSERT ON production_logs
FOR EACH ROW
EXECUTE FUNCTION fn_deduct_inventory();

-- FUNCIÓN CORE: Registro de No-Conformidad Automática
-- Si el reporte de calidad es falso (is_conform = false), se bloquea la OT
CREATE OR REPLACE FUNCTION fn_handle_no_conformity()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_conform = FALSE THEN
        -- Actualizamos el estatus de la OT a 'blocked'
        UPDATE work_orders
        SET status = 'blocked'
        FROM production_logs
        WHERE work_orders.id = production_logs.work_order_id
        AND production_logs.id = NEW.production_log_id;
        
        -- Aquí se podría disparar una notificación vía Edge Function
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_on_quality_failure
AFTER INSERT ON quality_reports
FOR EACH ROW
EXECUTE FUNCTION fn_handle_no_conformity();
