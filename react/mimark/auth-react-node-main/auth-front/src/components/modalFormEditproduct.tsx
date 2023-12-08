// import { useState,useEffect } from "react";

// interface producto {
//     id: number;
//     producto: string;
//     cantidad: string;
//     price: string;
// }


// export const ModalFormEditProducts = (producto:string, cantidad:number, ) => {

//     const [product, setProducto] = useState(producto);
//     const [cantidad, setCantidad] = useState(cantidad);
//     const [price, setPrice] = useState(price);
//     const [errorResponse, setErrorResponse] = useState("");

    

//     async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
//         e.preventDefault();
//         const response = await fetch("http://localhost:3000/api/createProduct", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ producto, cantidad, price }),
//         }).then((res) => res.json()).then((data) => {
//             console.log(data);
//             if (data.statuscode === 200) {
//                 alert(data.body.message);
//                 setProducto("");
//                 setCantidad("");
//                 setPrice("");
//             }
//             else {
//                 alert(data.body.error);
//             }
//         });
//     }

//     useEffect(() => {
//         handleSubmit;
//     }, []);


//     return (
//         <>
//             {/* modal formulario de registro de empleado en bootstrap */}
//             <div className="modal fade" id="product-edit" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered">
//                     <div className="modal-content">

//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">Registrar un producto</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>

//                         <div className="modal-body">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-3">
//                                     <label htmlFor="recipient-name" className="col-form-label">Producto:</label>
//                                     <input type="text" className="form-control" id="recipient-name" onChange={(e) => setProducto(e.target.value)} value={producto} />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="recipient-name" className="col-form-label">Cantidad:</label>
//                                     <input type="number" className="form-control" id="recipient-name" onChange={(e) => setCantidad(e.target.value)} value={cantidad} />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="recipient-name" className="col-form-label">Precio:</label>
//                                     <input type="number" className="form-control" id="recipient-name" onChange={(e) => setPrice(e.target.value)} value={price} />
//                                 </div>
//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
//                                     <button type="submit" className="btn btn-primary">Registrar</button>
//                                 </div>
//                             </form>
//                         </div>

//                     </div>
//                 </div>
//             </div>
            
//         </>
//     )
// }
