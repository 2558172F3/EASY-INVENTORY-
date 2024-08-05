import { useState, useEffect } from "react";
import { useEditRol } from "../api/rol";


interface rol {
    rol: {
        _id: string;        
        nombre: string;
    };
}

export const EditModalRol = (arg: rol) => {
    const [Nombre, setNombre] = useState(arg.rol.nombre);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await useEditRol(arg.rol._id,arg);
            console.log(response, "===================== status code response");

            if (response) {
                alert("Rol modificado");
            } else {
                // Manejar el caso de error
            }
        } catch (error) {
            console.error('Error al editar el rol:', error);
        }
    };

    useEffect(() => {
        // No necesitas llamar handleSubmit aquí
    }, []);

    return (
        <>
            {/* modal formulario de registro de empleado en bootstrap */}
            <div className="modal fade" id={`persons-edit-${arg.rol._id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Actualizar rol</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>                               
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                                    <input type="text" className="form-control" id={`nombre-${arg.rol._id}`} onChange={(e) => setNombre(e.target.value)} value={Nombre} />
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
    );
};
