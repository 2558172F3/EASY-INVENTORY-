import React from 'react';
import { useParams } from 'react-router-dom';





const ClienteInfo: React.FC = () => {
      const {id} = useParams <{id:string}> ()
      if(!id){
        return <div>cargando ...</div>
      }
     
        
        
      
  return (
    <h3>estamos en el id : {id}</h3>
    // <Container>
    //   <h2>{cliente.nombre} {cliente.apellidos}</h2>
    //   <p><strong>Teléfono:</strong> {cliente.telefono}</p>
    //   <p><strong>Correo:</strong> {cliente.correo}</p>
    //   <p><strong>Ciudad:</strong> {cliente.ciudad}</p>
    //   <Button variant="primary" onClick={() => onEdit(cliente.id_cliente)}>Editar</Button>
    //   <Button variant="danger" onClick={() => onDelete(cliente.id_cliente)}>Eliminar</Button>
    // </Container>
  );
};

export default ClienteInfo;
