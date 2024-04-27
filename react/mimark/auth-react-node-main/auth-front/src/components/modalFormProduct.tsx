import { useState,useEffect } from "react";
import { useCreateProduct } from "../api/products"

interface product {
    
    producto:{
        _id: string;
        ID_categoria:number;
        Nombre: string;
        Cantidad: number;
        Precio: number;
    }
}

interface reload {
    refetch?: Function;
}

export const ModalFormProducts = (arg:reload) => {
    const [Nombre, setProducto] = useState("");
    const [ID_categoria, setID_categoria] = useState("");
    const [Cantidad, setCantidad] = useState("");
    const [Precio, setPrice] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const producto :product ={
            producto:{
                _id:"0",
                ID_categoria:parseInt(ID_categoria) ,
                Nombre,
                Cantidad:parseInt(Cantidad),
                Precio:parseInt(Cantidad)
            }
        }
        const response = await useCreateProduct(producto)
        console.log(response,"===================== status code response");

        if (response===200) {
            alert("Producto se creó de manera exitosa")
            if (arg.refetch) {
                arg.refetch()
            }
        }
    }

    useEffect(() => {
        handleSubmit;
    }, []);


    return (
        <>
            {/* modal formulario de registro de empleado en bootstrap */}
            <div className="modal fade" id="product" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Registrar un producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Producto:</label>
                                    <input type="text" className="form-control"  onChange={(e) => setProducto(e.target.value)} value={Nombre} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Categoria:</label>
                                    <input type="number" className="form-control"  onChange={(e) => setID_categoria(e.target.value)} value={ID_categoria} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Cantidad:</label>
                                    <input type="number" className="form-control"  onChange={(e) => setCantidad(e.target.value)} value={Cantidad} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Precio:</label>
                                    <input type="number" className="form-control"  onChange={(e) => setPrice(e.target.value)} value={Precio} />
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
