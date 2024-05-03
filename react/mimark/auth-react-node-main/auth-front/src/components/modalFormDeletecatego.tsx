import React, { useState } from 'react';
import { useCategoriaById } from '../api/categor';

const DeleteModalCategoria = ({ handleDelete, id }) => {
  const [categoria, setCategoria] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    handleDelete(useCategoriaById);
    
    
    setCategoria(''); // Limpiar el campos
    alert("eliminado")
  };

  return (
    <div className="modal fade" id={id}  aria-labelledby={`${id}-label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}-label`}>Eliminar Categoria</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Nombre categoria</label>
                <input type="text" className="form-control" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-danger">Eliminar</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModalCategoria;
