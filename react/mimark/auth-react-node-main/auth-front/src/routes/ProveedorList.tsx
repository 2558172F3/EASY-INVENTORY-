import { useState, useEffect } from 'react';
import { useProveedor } from '../hoocks/infoPage';
import PortalLayout from '../layout/PortalLayout';
import * as XLSX from 'xlsx';
import { Proveedor } from '../types/types';

const ProveedorList = () => {
  const { proveedor } = useProveedor();
  const [proveedoresOrdenados, setProveedoresOrdenados] = useState<Proveedor[]>([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  console.log(proveedor);
  
  useEffect(() => {
    if (proveedor) {
      setProveedoresOrdenados([...proveedor]);
    }
  }, [proveedor]);

  const ordenarPorNombre = () => {
    const nuevoOrden = !ordenAscendente;
    const proveedoresOrdenadosNuevos = [...proveedoresOrdenados].sort((a, b) => {
      return nuevoOrden
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre);
    });
    setProveedoresOrdenados(proveedoresOrdenadosNuevos);
    setOrdenAscendente(nuevoOrden);
  };

  const exportarAExcel = () => {
    const ws = XLSX.utils.json_to_sheet(proveedoresOrdenados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Proveedores");
    XLSX.writeFile(wb, "proveedores.xlsx");
  };

  return (
    <PortalLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Proveedores</h1>
          <div>
            <button className="btn btn-primary me-2">Agregar Proveedor</button>
            <button className="btn btn-success" onClick={exportarAExcel}>Exportar a Excel</button>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th onClick={ordenarPorNombre} style={{ cursor: 'pointer' }}>
                Nombre {ordenAscendente ? '▲' : '▼'}
              </th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {proveedoresOrdenados.map((prov) => (
              <tr key={prov.id_proveedor}>
                <td>{prov.nombre}</td>
                <td>{prov.direccion}</td>
                <td>{prov.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
};

export default ProveedorList;