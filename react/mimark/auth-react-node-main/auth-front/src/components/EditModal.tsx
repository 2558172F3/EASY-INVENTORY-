import { useState, useEffect } from "react";
import { useEditPersonal } from "../api/pers";

interface persona {
    personal: {
        _id:  string;
        Rol: number;
        Nombre: string;
        Apellidos: string;
        Telefono: string;
        Correo: string;
    };
    refetch?: Function;
}

export const EditModal = (arg: persona) => {
    const [Rol, setRol] = useState(arg.personal.Rol);
    const [Nombre, setNombre] = useState(arg.personal.Nombre);
    const [Apellidos, setApellidos] = useState(arg.personal.Apellidos);
    const [Telefono, setTelefono] = useState(arg.personal.Telefono);
    const [Correo, setCorreo] = useState(arg.personal.Correo);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const perso: persona = {
            personal: {
                _id: arg.personal._id,
                Rol,
                Nombre,
                Apellidos,
                Telefono,
                Correo,
            },
        };
        const response = await useEditPersonal(arg.personal._id, perso);
        console.log(response, "===================== status code response");

        if (response) {
            if (arg.refetch) {
                arg.refetch();
            }
            alert("Registro actualizado con éxito");
        } else {
            // Manejar el caso de error
        }
    };

    useEffect(() => {
        handleSubmit;
    }, []);

    return (
        <>
            {/* modal formulario de registro de empleado en bootstrap */}
            <div className="modal fade" id={`persons-edit-${arg.personal._id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Actualizar registro</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="rol" className="col-form-label">Rol:</label>
                                    <input type="text" className="form-control" id={`rol-${arg.personal._id}`} onChange={(e) => setRol(Number(e.target.value))} value={Rol} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                                    <input type="text" className="form-control" id={`nombre-${arg.personal._id}`} onChange={(e) => setNombre(e.target.value)} value={Nombre} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellidos" className="col-form-label">Cantidad:</label>
                                    <input type="text" className="form-control" id={`apellidos-${arg.personal._id}`} onChange={(e) => setApellidos(e.target.value)} value={Apellidos} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="col-form-label">Telefono:</label>
                                    <input type="text" className="form-control" id={`telefono-${arg.personal._id}`} onChange={(e) => setTelefono(e.target.value)} value={Telefono} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="col-form-label">Correo:</label>
                                    <input type="text" className="form-control" id={`correo-${arg.personal._id}`} onChange={(e) => setCorreo(e.target.value)} value={Correo} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Actualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};