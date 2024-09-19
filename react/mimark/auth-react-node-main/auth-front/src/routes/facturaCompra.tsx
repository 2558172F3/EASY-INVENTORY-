import PortalLayout from '../layout/PortalLayout';
import { FacturaCompra, ProductoCompra, ProveedorCompra } from '../types/types.ts';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import { usefacturaCompra } from '../hoocks/infoPage.tsx';

const CustomerPage = () => {
  const { proveedorCompra, refetch: refetchProveedor } = usefacturaCompra();
  const [sortedFactura, setSortedFactura] = useState<(FacturaCompra & { proveedor: string })[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedColumn, setSortedColumn] = useState<keyof FacturaCompra | null>(null);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'all'>('all');

  useEffect(() => {
    const factura = proveedorCompra
      ?.filter((proveedor) => proveedor.facturas.length > 0)
      .map((proveedor) => proveedor.facturas.map((factura) => ({ ...factura, proveedor: proveedor.nombre })))
      .flat();
    if (factura) {
      setSortedFactura(factura);
    }
  }, [proveedorCompra]);

  const sortData = (key: keyof FacturaCompra) => {
    const sorted = [...sortedFactura].sort((a, b) => {
      if (a[key] < b[key]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedFactura(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortedColumn(key);
  };

  const filtroFecha = () => sortData('fecha_compra');

  const renderSortArrow = (column: keyof FacturaCompra) => {
    if (sortedColumn === column) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return ' ↕'; // Flecha para indicar que la columna es ordenable
  };

  const filterByTimeRange = (facturas: (FacturaCompra & { proveedor: string })[]) => {
    const now = new Date();
    return facturas.filter((fact) => {
      const fechaCompra = new Date(fact.fecha_compra);
      switch (timeRange) {
        case 'day':
          return fechaCompra.toDateString() === now.toDateString();
        case 'week':
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          return fechaCompra >= oneWeekAgo && fechaCompra <= now;
        case 'month':
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return fechaCompra >= oneMonthAgo && fechaCompra <= now;
        case 'all':
        default:
          return true;
      }
    });
  };

  const filteredFactura = filterByTimeRange(sortedFactura);

  const totalFacturas = filteredFactura.reduce((acc, fact) => {
    return acc + fact.productos.reduce((accProd, product) => accProd + product.precio, 0);
  }, 0);

  const exportToExcel = () => {
    const worksheetData = filteredFactura.map((fact) => ({
      Proveedor: fact.proveedor,
      ID_Compra: fact.id_compra,
      Fecha_Compra: fact.fecha_compra ? new Date(fact.fecha_compra).toLocaleDateString() : '',
      Productos: fact.productos.map((product) => `${product.nombre_producto} (${product.precio})`).join(', '),
      Total: fact.productos.reduce((acc, product) => acc + product.precio, 0),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Facturas');
    XLSX.writeFile(workbook, 'Reporte_Facturas.xlsx');
  };

  return (
    <PortalLayout>
      <div className="container">
        <div className="filter-container">
          <label htmlFor="timeRange">Mostrar datos de:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'month' | 'all')}
          >
            <option value="all">Todos</option>
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
          </select>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>ID_Compra</th>
              <th onClick={filtroFecha} style={{ cursor: 'pointer' }}>
                Fecha de Compra {renderSortArrow('fecha_compra')}
              </th>
              <th>Productos</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredFactura.map((fact) => (
              <tr key={fact.id_compra}>
                <td>{fact.proveedor}</td>
                <td>{fact.id_compra}</td>
                <td>{fact.fecha_compra ? new Date(fact.fecha_compra).toLocaleDateString() : ''}</td>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th className='px-5'>Cantidad</th>
                        <th className='px-5'>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fact.productos.map((product: ProductoCompra) => (
                        <tr key={product.ID_Producto}>
                          <td>{product.nombre_producto}</td>
                          <td className='px-5'>{product.cantidad}</td>
                          <td className='px-5'>{product.precio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{fact.productos.reduce((acc, product) => acc + product.precio, 0)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
              <td style={{ fontWeight: 'bold' }}>{totalFacturas}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={exportToExcel}>Exportar a Excel</button>
        <Link to="/new-factura">Crear Factura</Link>
      </div>
    </PortalLayout>
  );
};

export default CustomerPage;