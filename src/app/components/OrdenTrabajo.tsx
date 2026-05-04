import { useState } from 'react';
import { Plus, Search, Eye, ShoppingBag, Calendar } from 'lucide-react';
import { NuevaOrden } from './NuevaOrden';

interface Orden {
  id: string;
  cliente: string;
  productos: string[];
  estado: 'pendiente' | 'en_proceso' | 'completada';
  fechaCreacion: string;
  fechaEntrega: string;
  total: number;
}

const mockOrdenes: Orden[] = [
  {
    id: 'ORD-001',
    cliente: 'María González',
    productos: ['Montura Ray-Ban', 'Lunas Progresivas', 'Estuche Premium'],
    estado: 'en_proceso',
    fechaCreacion: '2026-04-20',
    fechaEntrega: '2026-04-27',
    total: 450
  },
  {
    id: 'ORD-002',
    cliente: 'Carlos Rodríguez',
    productos: ['Montura Oakley', 'Lunas Antireflejantes'],
    estado: 'pendiente',
    fechaCreacion: '2026-04-21',
    fechaEntrega: '2026-04-28',
    total: 320
  },
  {
    id: 'ORD-003',
    cliente: 'Ana Martínez',
    productos: ['Montura Vogue', 'Lunas Fotocromáticas', 'Cordón para gafas'],
    estado: 'completada',
    fechaCreacion: '2026-04-15',
    fechaEntrega: '2026-04-22',
    total: 380
  }
];

export function OrdenTrabajo() {
  const [ordenes] = useState<Orden[]>(mockOrdenes);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNuevaOrden, setShowNuevaOrden] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState<string>('todas');

  const filteredOrdenes = ordenes.filter(orden => {
    const matchSearch = orden.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       orden.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = estadoFiltro === 'todas' || orden.estado === estadoFiltro;
    return matchSearch && matchEstado;
  });

  const getEstadoBadge = (estado: string) => {
    const styles = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      en_proceso: 'bg-blue-100 text-blue-800',
      completada: 'bg-green-100 text-green-800'
    };
    const labels = {
      pendiente: 'Pendiente',
      en_proceso: 'En Proceso',
      completada: 'Completada'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[estado as keyof typeof styles]}`}>
        {labels[estado as keyof typeof labels]}
      </span>
    );
  };

  if (showNuevaOrden) {
    return <NuevaOrden onClose={() => setShowNuevaOrden(false)} />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Órdenes de Trabajo</h2>
          <p className="text-gray-500 mt-1">Gestiona las órdenes de productos</p>
        </div>
        <button
          onClick={() => setShowNuevaOrden(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-5 h-5" />
          Nueva Orden
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por ID de orden o cliente..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>

          <select
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          >
            <option value="todas">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En Proceso</option>
            <option value="completada">Completada</option>
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-4">
        {filteredOrdenes.map((orden) => (
          <div key={orden.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{orden.id}</h3>
                  {getEstadoBadge(orden.estado)}
                </div>
                <p className="text-gray-600">{orden.cliente}</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800 p-2 hover:bg-indigo-50 rounded-lg transition">
                <Eye className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShoppingBag className="w-4 h-4" />
                <span>{orden.productos.length} productos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Entrega: {new Date(orden.fechaEntrega).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="text-sm font-medium text-gray-800">
                Total: €{orden.total.toFixed(2)}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500 mb-2">Productos:</p>
              <div className="flex flex-wrap gap-2">
                {orden.productos.map((producto, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {producto}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
