import { useQuery } from '@tanstack/react-query';
import { useGetfactura } from '../api/facturalist.tsx';
import PortalLayout from '../layout/PortalLayout';
import { FacturaVenta, Producto } from '../types/types.ts';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

const CustomerPage = () => {
  const { data: factura } = useQuery({
    queryKey: ['factura'],
    queryFn: useGetfactura,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30,
  });

  const [sortedFactura, setSortedFactura] = useState<FacturaVenta[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedColumn, setSortedColumn] = useState<keyof FacturaVenta | null>(null);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'all'>('all');

  useEffect(() => {
    if (factura) {
      setSortedFactura(factura);
    }
  }, [factura]);

  if (!factura) {
    return <div>Cargando...</div>;
  }

  const sortData = (key: keyof FacturaVenta) => {
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

  const filtroVendedor = () => sortData('vendedor');
  const filtroCliente = () => sortData('cliente');
  const filtroFecha = () => sortData('fecha_compra');
  const filtroCiudad = () => sortData('ciudad');

  const renderSortArrow = (column: keyof FacturaVenta) => {
    if (sortedColumn === column) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return ' ↕'; // Flecha para indicar que la columna es ordenable
  };

  const filterByTimeRange = (facturas: FacturaVenta[]) => {
    const now = new Date();
    console.log(facturas,"facturas aqui____________ÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑ");
    
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
    return acc + fact.productos.reduce((accProd, product) => accProd + product.Precio, 0);
  }, 0);

  const exportToExcel = () => {
    const worksheetData = filteredFactura.map((fact) => ({
      ID_Factura: fact.ID_Factura,
      Vendedor: fact.vendedor,
      Apellidos: fact.apellidos,
      Cliente: fact.cliente,
      Fecha_Compra: fact.fecha_compra ? new Date(fact.fecha_compra).toLocaleDateString() : '',
      Ciudad: fact.ciudad,
      Telefono: fact.telefono,
      Correo: fact.correo,
      Productos: fact.productos.map((product) => `${product.Nombre} (${product.Precio})`).join(', '),
      Total: fact.productos.reduce((acc, product) => acc + product.Precio, 0),
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
              <th>ID_Factura</th>
              <th onClick={filtroVendedor} style={{ cursor: 'pointer' }}>
                Vendedor {renderSortArrow('vendedor')}
              </th>
              <th>apellidos</th>
              <th onClick={filtroCliente} style={{ cursor: 'pointer' }}>
                cliente {renderSortArrow('cliente')}
              </th>
              <th onClick={filtroFecha} style={{ cursor: 'pointer' }}>
                fecha_compra {renderSortArrow('fecha_compra')}
              </th>
              <th onClick={filtroCiudad} style={{ cursor: 'pointer' }}>
                ciudad {renderSortArrow('ciudad')}
              </th>
              <th>telefono</th>
              <th>correo</th>
              <th>productos</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredFactura.map((fact) => (
              <tr key={fact.ID_Factura}>
                <td>{fact.ID_Factura}</td>
                <td>{fact.vendedor}</td>
                <td>{fact.apellidos}</td>
                <td>{fact.cliente}</td>
                <td>{fact.fecha_compra ? new Date(fact.fecha_compra).toLocaleDateString() : ''}</td>
                <td>{fact.ciudad}</td>
                <td>{fact.telefono}</td>
                <td>{fact.correo}</td>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th className='px-5'>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fact.productos.map((product: Producto) => (
                        <tr key={product.id_producto}>
                          <td>{product.Nombre}</td>
                          <td className='px-5'>{product.Precio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{fact.productos.reduce((acc, product) => acc + product.Precio, 0)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={9} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
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