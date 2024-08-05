import { useState } from 'react';

type DeleteModalCorreoProps = {
  handleDelete: (correo: string) => void;
  id: string;
};

const DeleteModalCorreo = ({ handleDelete, id }: DeleteModalCorreoProps) => {
  const [correo, setCorreo] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    handleDelete(correo);
    
    
    setCorreo(''); // Limpiar el campos
    alert("eliminado")
  };

  return (
    <div className="modal fade" id={id}  aria-labelledby={`${id}-label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}-label`}>Eliminar Registro</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo:</label>
                <input type="text" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
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

export default DeleteModalCorreo;
