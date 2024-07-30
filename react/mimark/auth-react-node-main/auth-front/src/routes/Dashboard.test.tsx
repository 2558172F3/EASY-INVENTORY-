import { render, screen } from '@testing-library/react';
import Dashboard from '../routes/Dashboard';

test('renders loading message when products are not available', () => {
  render(<Dashboard />);
  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});

test('renders product table when products are available', () => {
  const mockProducts = [
    { ID_Producto: 1, Nombre: 'Product 1', Cantidad: 10, Precio: 100, Nombre_Categoria: 'Category 1' },
    { ID_Producto: 2, Nombre: 'Product 2', Cantidad: 5, Precio: 50, Nombre_Categoria: 'Category 2' },
  ];
  jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(() => ({
      data: mockProducts,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    })),
  }));

  render(<Dashboard />);
  const productTable = screen.getByRole('table');
  expect(productTable).toBeInTheDocument();
  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
});

// Add more test cases as needed