import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalConfirmacion = ({ mostrar, onConfirmar, onCancelar, evento }) => {
    const [eventoAEliminar, setEventoAEliminar] = useState(evento);

    useEffect(() => {
        setEventoAEliminar(evento);
    }, [evento]);

    return (
        <Modal show={mostrar} onHide={onCancelar}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Está seguro de que desea eliminar el evento {eventoAEliminar?.descripcion}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancelar}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={() => onConfirmar(eventoAEliminar)}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirmacion;
