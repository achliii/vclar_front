import { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin, Edit2, X, Briefcase } from 'lucide-react';

interface Trabajador {
  id: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaNacimiento?: string;
  telefono: string;
  email?: string;
  direccion?: string;
  rol: 'administrador' | 'vendedor';
  fechaContratacion: string;
  fechaTerminoContrato?: string;
}

const mockTrabajadores: Trabajador[] = [
  {
    id: '1',
    nombres: 'Admin',
    apellidos: 'Principal',
    tipoDocumento: 'DNI',
    numeroDocumento: '11111111A',
    fechaNacimiento: '1980-01-10',
    telefono: '+34 600 111 222',
    email: 'admin@optica.com',
    direccion: 'Calle Principal 1, Madrid',
    rol: 'administrador',
    fechaContratacion: '2020-01-15'
  },
  {
    id: '2',
    nombres: 'Juan',
    apellidos: 'Vendedor',
    tipoDocumento: 'DNI',
    numeroDocumento: '22222222B',
    fechaNacimiento: '1992-05-20',
    telefono: '+34 600 333 444',
    email: 'vendedor@optica.com',
    direccion: 'Avenida Central 23, Madrid',
    rol: 'vendedor',
    fechaContratacion: '2022-06-20'
  },
  {
    id: '3',
    nombres: 'Laura',
    apellidos: 'Pérez',
    tipoDocumento: 'DNI',
    numeroDocumento: '33333333C',
    telefono: '+34 600 555 666',
    email: 'laura.perez@optica.com',
    direccion: 'Calle Nueva 45, Madrid',
    rol: 'vendedor',
    fechaContratacion: '2023-03-10',
    fechaTerminoContrato: '2026-12-31'
  }
];

export function Trabajadores() {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>(mockTrabajadores);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    fechaNacimiento: '',
    telefono: '',
    email: '',
    direccion: '',
    rol: 'vendedor' as 'administrador' | 'vendedor',
    fechaContratacion: '',
    fechaTerminoContrato: ''
  });

  const filteredTrabajadores = trabajadores.filter(trabajador =>
    trabajador.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trabajador.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trabajador.numeroDocumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trabajador.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trabajador.telefono.includes(searchTerm) ||
    trabajador.rol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrabajador: Trabajador = {
      id: Date.now().toString(),
      ...formData,
      fechaContratacion: new Date().toISOString().split('T')[0]
    };
    setTrabajadores([...trabajadores, newTrabajador]);
    setFormData({
      nombres: '',
      apellidos: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      fechaNacimiento: '',
      telefono: '',
      email: '',
      direccion: '',
      rol: 'vendedor',
      fechaContratacion: '',
      fechaTerminoContrato: ''
    });
    setShowModal(false);
  };

  const getRolBadge = (rol: string) => {
    return rol === 'administrador' ? (
      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
        Administrador
      </span>
    ) : (
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
        Vendedor
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Trabajadores</h2>
          <p className="text-gray-500 mt-1">Gestiona el personal de la óptica</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-5 h-5" />
          Nuevo Trabajador
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, email, teléfono o rol..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trabajador</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contratación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTrabajadores.map((trabajador) => (
              <tr key={trabajador.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{trabajador.nombres} {trabajador.apellidos}</p>
                      {trabajador.fechaNacimiento && (
                        <p className="text-xs text-gray-500">Nacimiento: {new Date(trabajador.fechaNacimiento).toLocaleDateString('es-ES')}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-800 font-medium">{trabajador.tipoDocumento}</p>
                  <p className="text-sm text-gray-600">{trabajador.numeroDocumento}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {trabajador.telefono}
                    </div>
                    {trabajador.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {trabajador.email}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getRolBadge(trabajador.rol)}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    {new Date(trabajador.fechaContratacion).toLocaleDateString('es-ES')}
                  </p>
                  {trabajador.fechaTerminoContrato && (
                    <p className="text-xs text-gray-500">
                      Término: {new Date(trabajador.fechaTerminoContrato).toLocaleDateString('es-ES')}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <Edit2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Nuevo Trabajador</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombres *</label>
                  <input
                    type="text"
                    value={formData.nombres}
                    onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos *</label>
                  <input
                    type="text"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento *</label>
                  <select
                    value={formData.tipoDocumento}
                    onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="DNI">DNI</option>
                    <option value="NIE">NIE</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Documento *</label>
                  <input
                    type="text"
                    value={formData.numeroDocumento}
                    onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                <input
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <textarea
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol *</label>
                <select
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value as 'administrador' | 'vendedor' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="vendedor">Vendedor</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Contratación *</label>
                  <input
                    type="date"
                    value={formData.fechaContratacion}
                    onChange={(e) => setFormData({ ...formData, fechaContratacion: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Término de Contrato</label>
                  <input
                    type="date"
                    value={formData.fechaTerminoContrato}
                    onChange={(e) => setFormData({ ...formData, fechaTerminoContrato: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
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
