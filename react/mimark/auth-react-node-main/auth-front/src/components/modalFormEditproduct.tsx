import { useState,useEffect } from "react";
// import { API_URL } from "../auth/authConstants";

interface product {
    
    producto:{
        _id: string;
        producto: string;
        cantidad: number;
        price: number;
    }
  
}


export const ModalFormEditProducts = (arg :product) => {
    console.log(arg.producto._id, "arg.id");
    const [producto, setProducto] = useState(arg.producto.producto);
    const [cantidad, setCantidad] = useState(arg.producto.cantidad);
    const [price, setPrice] = useState(arg.producto.price);
    const [errorResponse, setErrorResponse] = useState("");

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     const response = await fetch(`${API_URL}/updateProduct`, {
    //         method: "put",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             id: arg.producto._id,
    //             producto: producto,
    //             cantidad: cantidad,
    //             price: price,
    //         }),
    //     }).then((res) => res.json()).then((data) => {
    //         console.log(data);
    //         if (data.statuscode === 200) {
    //             alert("Producto registrado correctamente");
    //         }
    //         else {
    //             setErrorResponse(data.body.error);
    //         }
    //     });
    // }

    // useEffect(() => {
    //     handleSubmit;
    // }
    // , []);

    return (
        <>
            {/* modal formulario de registro de empleado en bootstrap */}
            <div className="modal fade" id="product-edit" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Registrar un producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="producto" className="col-form-label">Producto:</label>
                                    <input type="text" className="form-control" id="producto" onChange={(e) => setProducto(e.target.value)} value={producto} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cantidad" className="col-form-label">Cantidad:</label>
                                    <input type="number" className="form-control" id="cantidad" onChange={(e) => setCantidad(Number(e.target.value))} value={cantidad} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precio" className="col-form-label">Precio:</label>
                                    <input type="number" className="form-control" id="precio" onChange={(e) => setPrice(Number(e.target.value))} value={price} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" className="btn btn-primary">Registrar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    )
}
