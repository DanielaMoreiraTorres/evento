import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarEvento } from "../../feature/eventosSlice";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "sonner";

const ModalRegistro = ({ mostrar, handleCerrar }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        descripcion: "",
        lugar: "",
        fecha: "",
        precio: "",
    });

    const handleCambio = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleGuardar = (e) => {
        e.preventDefault();
        dispatch(agregarEvento(form))
        .unwrap()
        .then(() => {
            toast.success("Evento creado exitosamente!");
            handleCerrar();
        })
        .catch(() => {
            toast.error("Hubo un error al intentar crear el evento.");
        });
    };

    return (
        <Modal show={mostrar} onHide={handleCerrar}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleGuardar}>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" name="fecha" value={form.fecha} onChange={handleCambio} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Lugar</Form.Label>
                        <Form.Control type="text" name="lugar" value={form.lugar} onChange={handleCambio} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" name="descripcion" value={form.descripcion} onChange={handleCambio} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control type="number" name="precio" value={form.precio} onChange={handleCambio} required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                    <Button variant="secondary" className="ms-2" onClick={handleCerrar}>
                        Cancelar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalRegistro;
