import React from 'react';
//import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import {useQuery} from '@tanstack/react-query'
// import { personal, personalPost } from '../types/types';
// import { usePersonalById } from '../api/pers';
// import apiPersonal from '../apiPers';

// interface Personal {
  
//   id_personal: number;
//   rol: number;
//   nombre: string;
//   apellidos: string;
//   telefono: string;
//   correo: string;
  
// }



const PersonalInfo: React.FC = () => {
      const {id} = useParams <{id:string}> ()
      if(!id){
        return <div>Cargando ...</div>
      }
     
        
        
      return (
       // <Container>
          <h3>Estamos en el id: {id}</h3>
          //* Uncomment the following JSX code if you intend to use it *//
          //* <h2>{cliente.nombre} {cliente.apellidos}</h2>
         // <p><strong>Teléfono:</strong> {cliente.telefono}</p>
         // <p><strong>Correo:</strong> {cliente.correo}</p>
          //<p><strong>Ciudad:</strong> {cliente.ciudad}</p>
          //<Button variant="primary" onClick={() => onEdit(cliente.id_cliente)}>Editar</Button>
         // <Button variant="danger" onClick={() => onDelete(cliente.id_cliente)}>Eliminar</Button> */}
        //</Container>
      );
    };
    

export default PersonalInfo;
