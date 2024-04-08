export interface User {
  accessToken:  string;
  refreshToken: string;
  user:         UserClass;
}

export interface UserClass {
  username: string;
  personal: number;
  client:   null;
}
export interface AuthResponseError {
body: {
  error: string;
};
}
export type refreshResponse = {
access: string;
};



export interface AccessTokenResponse {
statusCode: number;
access: string;
error?: string;
}

export interface Productos {
  ID_Producto:  number;
  ID_Categoria: number;
  Nombre:       string;
  Precio:       number;
  Cantidad:     number;
}

export interface Clientes {
  nombre:        string;
  apellidos:     string;
  telefono:      string;
  correo:        string;
  ciudad:        string;
  id_factura:    number;
  total_factura: number;
}

export interface ClientesPost {
  nombre:        string;
  apellidos:     string;
  telefono:      string;
  correo:        string;
  ciudad:        string;

}


export interface ProveedorListPost {
  Nombre:         string;
  Dirección:      string;
  Teléfono:        number;
  Ciudad:          string;
  Acciones:        string;
}

export interface Proveedor {
  id_proveedor: string;
  nombre:       string;
  direccion:    string;
  telefono:     number;
  ciudad:       string;
}

export interface Proveedordelet {
  id_proveedor: string;
  nombre:       string;
  direccion:    string;
  telefono:     number;
  ciudad:       string;
}

export interface personal {  
  rol:           number; 
  nombre:        string;
  apellidos:     string;
  telefono:      string;
  correo:        string;
          
  
}

export interface personalPost {  
  id_personal:   number,
  rol:           number;
  nombre:        string;
  apellidos:     string;
  telefono:      string;
  correo:        string;
  
}
export interface personaldelet {  
  id_personal:   number,
  rol:           number;
  nombre:        string;
  apellidos:     string;
  telefono:      string;
  correo:        string;
  
}

export interface personalPut {  
  rol:           number;
  nombre:        string;
  apellidos:     string;
  telefono:      string;
  correo:        string;
  
}

export interface personalDelete {  
  rol:           number;
  nombre:        string;
  apellidos:     string;
  telefono:      string;
  correo:        string;
  
}
