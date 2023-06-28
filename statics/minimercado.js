document.addEventListener('DOMContentLoaded', function() {
    const productosLista = document.getElementById('productos-lista');
    const carritoLista = document.getElementById('carrito-lista');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
  
    // Array de productos (puedes personalizarlo según tus necesidades)
    const productos = [
      { id: 1, nombre: 'Producto 1', precio: 10 },
      { id: 2, nombre: 'Producto 2', precio: 15 },
      { id: 3, nombre: 'Producto 3', precio: 20 },
      // ... más productos
    ];
  
    // Mostrar los productos en la lista
    function mostrarProductos() {
      productosLista.innerHTML = '';
      productos.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        const btn = document.createElement('button');
        btn.textContent = 'Agregar al Carrito';
        btn.addEventListener('click', () => agregarAlCarrito(producto));
        li.appendChild(btn);
        productosLista.appendChild(li);
      });
    }
  
    // Agregar un producto al carrito
    function agregarAlCarrito(producto) {
      const li = document.createElement('li');
      li.textContent = `${producto.nombre} - $${producto.precio}`;
      carritoLista.appendChild(li);
    }
  
    // Vaciar el carrito
    function vaciarCarrito() {
      carritoLista.innerHTML = '';
    }
  
    // Evento para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  
    // Mostrar los productos al cargar la página
    mostrarProductos();
  });
  