import { useState } from 'react';
import { Calendar, Clock, User, Phone, Plus, X } from 'lucide-react';

interface Cita {
  id: string;
  cliente: string;
  telefono: string;
  fecha: string;
  hora: string;
  tipo: 'examen' | 'entrega' | 'ajuste' | 'consulta';
  notas: string;
  estado: 'programada' | 'completada' | 'cancelada';
}

const mockCitas: Cita[] = [
  {
    id: '1',
    cliente: 'María González',
    telefono: '+34 612 345 678',
    fecha: '2026-04-25',
    hora: '10:00',
    tipo: 'examen',
    notas: 'Primera visita - examen de vista completo',
    estado: 'programada'
  },
  {
    id: '2',
    cliente: 'Carlos Rodríguez',
    telefono: '+34 623 456 789',
    fecha: '2026-04-25',
    hora: '11:30',
    tipo: 'entrega',
    notas: 'Entrega de gafas nuevas ORD-002',
    estado: 'programada'
  },
  {
    id: '3',
    cliente: 'Ana Martínez',
    telefono: '+34 634 567 890',
    fecha: '2026-04-26',
    hora: '09:00',
    tipo: 'ajuste',
    notas: 'Ajuste de montura',
    estado: 'programada'
  },
  {
    id: '4',
    cliente: 'Pedro Sánchez',
    telefono: '+34 645 678 901',
    fecha: '2026-04-26',
    hora: '15:00',
    tipo: 'consulta',
    notas: 'Consulta sobre lentes de contacto',
    estado: 'programada'
  }
];

export function Citas() {
  const [citas, setCitas] = useState<Cita[]>(mockCitas);
  const [showModal, setShowModal] = useState(false);
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [formData, setFormData] = useState({
    cliente: '',
    telefono: '',
    fecha: '',
    hora: '',
    tipo: 'examen' as const,
    notas: ''
  });

  const filteredCitas = citas.filter(cita => {
    if (!fechaFiltro) return cita.estado === 'programada';
    return cita.fecha === fechaFiltro && cita.estado === 'programada';
  });

  const citasPorFecha = filteredCitas.reduce((acc, cita) => {
    if (!acc[cita.fecha]) {
      acc[cita.fecha] = [];
    }
    acc[cita.fecha].push(cita);
    return acc;
  }, {} as Record<string, Cita[]>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCita: Cita = {
      id: Date.now().toString(),
      ...formData,
      estado: 'programada'
    };
    setCitas([...citas, newCita]);
    setFormData({
      cliente: '',
      telefono: '',
      fecha: '',
      hora: '',
      tipo: 'examen',
      notas: ''
    });
    setShowModal(false);
  };

  const getTipoColor = (tipo: string) => {
    const colors = {
      examen: 'bg-blue-100 text-blue-800',
      entrega: 'bg-green-100 text-green-800',
      ajuste: 'bg-yellow-100 text-yellow-800',
      consulta: 'bg-purple-100 text-purple-800'
    };
    return colors[tipo as keyof typeof colors];
  };

  const getTipoLabel = (tipo: string) => {
    const labels = {
      examen: 'Examen de Vista',
      entrega: 'Entrega',
      ajuste: 'Ajuste',
      consulta: 'Consulta'
    };
    return labels[tipo as keyof typeof labels];
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Citas Programadas</h2>
          <p className="text-gray-500 mt-1">Gestiona las citas de los clientes</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-5 h-5" />
          Nueva Cita
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por fecha</label>
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
        />
        {fechaFiltro && (
          <button
            onClick={() => setFechaFiltro('')}
            className="ml-3 text-sm text-indigo-600 hover:text-indigo-800"
          >
            Limpiar filtro
          </button>
        )}
      </div>

      {/* Appointments by Date */}
      <div className="space-y-6">
        {Object.entries(citasPorFecha).map(([fecha, citasDia]) => (
          <div key={fecha} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-gray-800">
                  {new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <span className="ml-auto text-sm text-gray-600">{citasDia.length} citas</span>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {citasDia.sort((a, b) => a.hora.localeCompare(b.hora)).map((cita) => (
                <div key={cita.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-lg flex-shrink-0">
                      <Clock className="w-8 h-8 text-indigo-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-gray-800">{cita.hora}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(cita.tipo)}`}>
                              {getTipoLabel(cita.tipo)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{cita.cliente}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{cita.telefono}</span>
                        </div>
                      </div>

                      {cita.notas && (
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                          {cita.notas}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(citasPorFecha).length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay citas programadas para esta fecha</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Nueva Cita</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <input
                  type="text"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                  <input
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cita</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="examen">Examen de Vista</option>
                  <option value="entrega">Entrega</option>
                  <option value="ajuste">Ajuste</option>
                  <option value="consulta">Consulta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  rows={3}
                  placeholder="Información adicional sobre la cita..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
