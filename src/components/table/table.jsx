import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { FaTrashAlt, FaEdit } from "react-icons/fa";


const Tabla = ({ eventos, handleEditar, handleEliminar }) => {
    const [paginaActual, setPaginaActual] = useState(0);
    const eventosPorPagina = 5;

    const eventosMostrados = eventos.slice(
        paginaActual * eventosPorPagina,
        (paginaActual + 1) * eventosPorPagina
    );

    const cambioDePagina = (data) => {
        setPaginaActual(data.selected);
    };

    const formatearFecha = (fecha) => {
        const fechaFormateada = new Date(fecha);
        if (isNaN(fechaFormateada)) {
            return "Fecha inválida";
        }
        return fechaFormateada.toLocaleDateString();
    };

    return (
        <div>
            <Table striped bordered hover responsive className="mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Lugar</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {eventosMostrados.length > 0 ? (
                        eventosMostrados.map((evento) => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{formatearFecha(evento.fecha)}</td>
                                <td>{evento.lugar}</td>
                                <td>{evento.descripcion}</td>
                                <td>${evento.precio}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleEditar(evento)}
                                    >
                                        <FaEdit />
                                    </Button>{" "}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleEliminar(evento)}
                                    >
                                        <FaTrashAlt />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No hay eventos registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Paginación */}
            <ReactPaginate
                previousLabel={"← Anterior"}
                nextLabel={"Siguiente →"}
                pageCount={Math.ceil(eventos.length / eventosPorPagina)}
                onPageChange={cambioDePagina}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default Tabla;
