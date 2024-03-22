import { useState,useEffect } from "react";
// import { API_URL } from "../auth/authConstants";
import {useEditProduct} from "../api/products"

interface product {
    
    producto:{
        _id: string;
        ID_categoria:number;
        Nombre: string;
        Cantidad: number;
        Precio: number;
    }
    refetch?: Function;
  
}


export const ModalFormEditProducts = (arg :product) => {
    const [Nombre, setProducto] = useState(arg.producto.Nombre);
    const [Cantidad, setCantidad] = useState(arg.producto.Cantidad);
    const [Precio, setPrice] = useState(arg.producto.Precio);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const producto :product ={
            producto:{
                _id:arg.producto._id,
                ID_categoria : arg.producto.ID_categoria,
                Nombre,
                Cantidad,
                Precio
            }
        }
        const response = await useEditProduct(arg.producto._id,producto)
        console.log(response,"===================== status code response");
        
        if (response==200) {
            if (arg.refetch) {
                arg.refetch()
            }
            alert("producto modificado")
            
            
        } else {
            
        }
    }

    useEffect(() => {
        handleSubmit;
    }
    , []);

    return (
        <>
            {/* modal formulario de registro de empleado en bootstrap */}
            <div className="modal fade" id={`product-edit-${arg.producto._id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Registrar un producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="producto" className="col-form-label">Producto:</label>
                                    <input type="text" className="form-control" id={`producto-${arg.producto._id}`} onChange={(e) => setProducto(e.target.value)} value={Nombre} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cantidad" className="col-form-label">Cantidad:</label>
                                    <input type="number" className="form-control" id={`cantidad-${arg.producto._id}`} onChange={(e) => setCantidad(Number(e.target.value))} value={Cantidad} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precio" className="col-form-label">Precio:</label>
                                    <input type="number" className="form-control" id={`precio-${arg.producto._id}`} onChange={(e) => setPrice(Number(e.target.value))} value={Precio} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Registrar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    )
}
