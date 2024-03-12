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
  id_cliente: number;
  nombre:     string;
  apellidos:  string;
  telefono:   string;
  correo:     string;
  ciudad:     string;
}
