import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface NuevaOrdenProps {
  onClose: () => void;
}

interface Producto {
  id: string;
  tipo: 'montura' | 'luna' | 'accesorio';
  nombre: string;
  precio: number;
}

interface ProductoSeleccionado {
  producto: Producto;
  cantidad: number;
  medicion?: MedicionLuna;
}

interface MedicionLuna {
  esfera_od: string;
  cilindro_od: string;
  eje_od: string;
  esfera_oi: string;
  cilindro_oi: string;
  eje_oi: string;
  distancia_pupilar: string;
  material: string;
  tratamientos: string[];
}

const productosDisponibles: Producto[] = [
  { id: '1', tipo: 'montura', nombre: 'Ray-Ban Classic', precio: 150 },
  { id: '2', tipo: 'montura', nombre: 'Oakley Sport', precio: 180 },
  { id: '3', tipo: 'montura', nombre: 'Vogue Elegant', precio: 120 },
  { id: '4', tipo: 'luna', nombre: 'Lunas Monofocales', precio: 80 },
  { id: '5', tipo: 'luna', nombre: 'Lunas Progresivas', precio: 200 },
  { id: '6', tipo: 'luna', nombre: 'Lunas Fotocromáticas', precio: 150 },
  { id: '7', tipo: 'accesorio', nombre: 'Estuche Premium', precio: 15 },
  { id: '8', tipo: 'accesorio', nombre: 'Cordón para gafas', precio: 8 },
  { id: '9', tipo: 'accesorio', nombre: 'Kit de limpieza', precio: 12 },
];

const clientes = ['María González', 'Carlos Rodríguez', 'Ana Martínez', 'Pedro Sánchez'];

export function NuevaOrden({ onClose }: NuevaOrdenProps) {
  const [cliente, setCliente] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [productosSeleccionados, setProductosSeleccionados] = useState<ProductoSeleccionado[]>([]);
  const [productoActual, setProductoActual] = useState('');
  const [mostrarMedicion, setMostrarMedicion] = useState(false);
  const [medicion, setMedicion] = useState<MedicionLuna>({
    esfera_od: '',
    cilindro_od: '',
    eje_od: '',
    esfera_oi: '',
    cilindro_oi: '',
    eje_oi: '',
    distancia_pupilar: '',
    material: 'plastico',
    tratamientos: []
  });

  const agregarProducto = () => {
    if (!productoActual) return;

    const producto = productosDisponibles.find(p => p.id === productoActual);
    if (!producto) return;

    if (producto.tipo === 'luna') {
      setMostrarMedicion(true);
    } else {
      setProductosSeleccionados([
        ...productosSeleccionados,
        { producto, cantidad: 1 }
      ]);
      setProductoActual('');
    }
  };

  const guardarLunaConMedicion = () => {
    const producto = productosDisponibles.find(p => p.id === productoActual);
    if (!producto) return;

    setProductosSeleccionados([
      ...productosSeleccionados,
      { producto, cantidad: 1, medicion: { ...medicion } }
    ]);
    setProductoActual('');
    setMostrarMedicion(false);
    setMedicion({
      esfera_od: '',
      cilindro_od: '',
      eje_od: '',
      esfera_oi: '',
      cilindro_oi: '',
      eje_oi: '',
      distancia_pupilar: '',
      material: 'plastico',
      tratamientos: []
    });
  };

  const eliminarProducto = (index: number) => {
    setProductosSeleccionados(productosSeleccionados.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
  };

  const handleTratamientoChange = (tratamiento: string) => {
    if (medicion.tratamientos.includes(tratamiento)) {
      setMedicion({
        ...medicion,
        tratamientos: medicion.tratamientos.filter(t => t !== tratamiento)
      });
    } else {
      setMedicion({
        ...medicion,
        tratamientos: [...medicion.tratamientos, tratamiento]
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a Órdenes
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Nueva Orden de Trabajo</h2>
        <p className="text-gray-500 mt-1">Completa la información de la orden</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Información General</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <select
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Seleccionar cliente</option>
                  {clientes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Entrega</label>
                <input
                  type="date"
                  value={fechaEntrega}
                  onChange={(e) => setFechaEntrega(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Agregar Productos</h3>
            <div className="flex gap-3 mb-4">
              <select
                value={productoActual}
                onChange={(e) => setProductoActual(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="">Seleccionar producto</option>
                {productosDisponibles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} - €{p.precio} ({p.tipo})
                  </option>
                ))}
              </select>
              <button
                onClick={agregarProducto}
                disabled={!productoActual}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                Agregar
              </button>
            </div>

            {/* Productos seleccionados */}
            <div className="space-y-2">
              {productosSeleccionados.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.producto.nombre}</p>
                    <p className="text-sm text-gray-500">
                      {item.producto.tipo === 'luna' && item.medicion && '(Con medición)'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-800 font-medium">€{item.producto.precio.toFixed(2)}</span>
                    <button
                      onClick={() => eliminarProducto(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario de Medición */}
          {mostrarMedicion && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Medición de Lentes</h3>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Ojo Derecho (OD)</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Esfera</label>
                      <input
                        type="text"
                        value={medicion.esfera_od}
                        onChange={(e) => setMedicion({ ...medicion, esfera_od: e.target.value })}
                        placeholder="+2.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Cilindro</label>
                      <input
                        type="text"
                        value={medicion.cilindro_od}
                        onChange={(e) => setMedicion({ ...medicion, cilindro_od: e.target.value })}
                        placeholder="-0.50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Eje</label>
                      <input
                        type="text"
                        value={medicion.eje_od}
                        onChange={(e) => setMedicion({ ...medicion, eje_od: e.target.value })}
                        placeholder="90"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Ojo Izquierdo (OI)</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Esfera</label>
                      <input
                        type="text"
                        value={medicion.esfera_oi}
                        onChange={(e) => setMedicion({ ...medicion, esfera_oi: e.target.value })}
                        placeholder="+2.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Cilindro</label>
                      <input
                        type="text"
                        value={medicion.cilindro_oi}
                        onChange={(e) => setMedicion({ ...medicion, cilindro_oi: e.target.value })}
                        placeholder="-0.50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Eje</label>
                      <input
                        type="text"
                        value={medicion.eje_oi}
                        onChange={(e) => setMedicion({ ...medicion, eje_oi: e.target.value })}
                        placeholder="90"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Distancia Pupilar (mm)</label>
                <input
                  type="text"
                  value={medicion.distancia_pupilar}
                  onChange={(e) => setMedicion({ ...medicion, distancia_pupilar: e.target.value })}
                  placeholder="63"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Material de Luna</label>
                <div className="grid grid-cols-3 gap-3">
                  {['plastico', 'policarbonato', 'cristal'].map((mat) => (
                    <label key={mat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="material"
                        value={mat}
                        checked={medicion.material === mat}
                        onChange={(e) => setMedicion({ ...medicion, material: e.target.value })}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tratamientos</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Antireflejante', 'UV Protection', 'Blue Light', 'Transitions'].map((trat) => (
                    <label key={trat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={medicion.tratamientos.includes(trat)}
                        onChange={() => handleTratamientoChange(trat)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">{trat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setMostrarMedicion(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={guardarLunaConMedicion}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Guardar Medición
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="font-bold text-gray-800 mb-4">Resumen</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Productos:</span>
                <span className="font-medium">{productosSeleccionados.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">€{calcularTotal().toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-indigo-600 text-lg">€{calcularTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              disabled={!cliente || !fechaEntrega || productosSeleccionados.length === 0}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              Crear Orden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
