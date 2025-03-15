import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actualizarEvento } from "../../feature/eventosSlice";
import { toast } from "sonner";

const ModalEdicion = ({ mostrar, evento, handleCerrar }) => {
    const [eventoEditado, setEventoEditado] = useState(evento);
    const dispatch = useDispatch();

    useEffect(() => {
        setEventoEditado(evento);
    }, [evento]);

    const handleCambio = (e) => {
        const { name, value } = e.target;
        setEventoEditado((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGuardar = (e) => {
        e.preventDefault();
        dispatch(actualizarEvento(eventoEditado))
            .unwrap()
            .then(() => {
                toast.success("Evento actualizado exitosamente!");
                handleCerrar();
            })
            .catch(() => {
                toast.error("Hubo un error al intentar actualizar el evento.");
            });
    };

    return (
        <Modal show={mostrar} onHide={handleCerrar}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {eventoEditado && (
                    <Form onSubmit={handleGuardar}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha"
                                value={eventoEditado.fecha ? eventoEditado.fecha.slice(0, 10) : ""}
                                onChange={handleCambio}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Lugar</Form.Label>
                            <Form.Control
                                type="text"
                                name="lugar"
                                value={eventoEditado.lugar}
                                onChange={handleCambio}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                name="descripcion"
                                value={eventoEditado.descripcion}
                                onChange={handleCambio}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                value={eventoEditado.precio}
                                onChange={handleCambio}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                        <Button variant="secondary" className="ms-2" onClick={handleCerrar}>
                            Cancelar
                        </Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ModalEdicion;
