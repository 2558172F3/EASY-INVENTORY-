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

export interface FacturaVenta {
  ID_Factura:   number;
  fecha_compra: Date;
  vendedor:     string;
  apellidos:    string;
  cliente:      string;
  ciudad:       string;
  telefono:     string;
  correo:       string;
  productos:    Producto[];
}

export interface Producto {
  id_producto: number;
  cantidad:    number;
  Nombre:      string;
  Precio:      number;
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

export interface Proveedor {
  id_proveedor: number;
  nombre:       string;
  direccion:    string;
  telefono:     number;
  ciudad:       string;
}



export interface ProveedorListPost {
  Nombre:         number;
  Dirección:      string;
  Teléfono:        number;
  Ciudad:          string;
  Acciones:        string;
}

export interface Proveedor {
  id_proveedor: number;
  nombre:       string;
  direccion:    string;
  telefono:     number;
  ciudad:       string;
}

export interface Proveedordelet {
  id_proveedor: number;
  nombre:       string;
  direccion:    string;
  telefono:     number;
  ciudad:       string;
}

export interface Personal {  
  id_personal:   number;
  rol:           number; 
  nombre:        string;
  apellidos:     string;
  telefono:      string;
  correo:        string;
          
  
}
export interface personal {  
  rol:           number; 
  nombre:        string;
  apellidos:     string;
  telefono:      string;
  correo:        string;
          
  
}

export interface Rol {  
  id_rol     :   number;            
  nombre     :   string;         
  
}

export interface Rol2 {  
  id_rol     :   number;            
  nombre     :   string;
  
          
  
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
