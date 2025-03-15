import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEventos, eliminarEvento } from "../feature/eventosSlice";
import Tabla from "./table/table";
import { Button, Container, ListGroup } from "react-bootstrap";
import ModalRegistro from "./modal/ModalRegistro";
import { FaPlus } from "react-icons/fa";
import ModalEdicion from "./modal/ModalEdicion";
import ModalConfirmacion from "./modal/ModalConfirmacion";
import { toast } from "sonner";

const columns = [
  {
    name: "ID",
    selector: "id",
    center: "true"
  },
  {
    name: "Fecha",
    selector: "fecha",
    center: "true"
  },
  {
    name: "Lugar",
    selector: "lugar",
    center: "true"
  },
  {
    name: "Precio",
    selector: "precio",
    center: "true"
  },
  {
    selector: "accion",
    center: "true"
  }
];

const EventosTabla = () => {
  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.eventos.eventos);
  const status = useSelector((state) => state.eventos.status);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(obtenerEventos());
    }
  }, [status, dispatch]);

  const handleEliminar = (evento) => {
    setEventoSeleccionado(evento);
    setMostrarModalConfirmacion(true);
  };

  const handleEditar = (evento) => {
    setEventoSeleccionado(evento);
    setMostrarModalEditar(true);
  };

  const handleCerrarModal = () => {
    setEventoSeleccionado(null);
    setMostrarModalEditar(false);
  };

  const handleCancelarEliminacion = () => {
    setEventoSeleccionado(null);
    setMostrarModalConfirmacion(false);
  };

  const handleConfirmarEliminacion = () => {
    dispatch(eliminarEvento(eventoSeleccionado?.id))
      .unwrap()
      .then(() => {
        toast.success("Evento eliminado exitosamente!");
        setEventoSeleccionado(null);
        setMostrarModalConfirmacion(false);
      })
      .catch(() => {
        toast.error("Hubo un error al intentar eliminar el evento.");
      });
  }

  return (
    <div style={{ padding: "10px" }}>
      {status === "loading" && <p>Cargando eventos...</p>}
      {status === "failed" && <p>Error al cargar eventos</p>}

      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => setMostrarModalAgregar(true)}>
          <FaPlus />
          {" "} Agregar Evento
        </Button>
      </div>

      <Tabla
        eventos={eventos} handleEditar={handleEditar} handleEliminar={handleEliminar}
      />

      <ModalRegistro mostrar={mostrarModalAgregar} handleCerrar={() => setMostrarModalAgregar(false)} />

      {eventoSeleccionado && (
        <>
          <ModalEdicion
            mostrar={mostrarModalEditar}
            evento={eventoSeleccionado}
            handleCerrar={handleCerrarModal}
          />

          <ModalConfirmacion
            mostrar={mostrarModalConfirmacion}
            onConfirmar={handleConfirmarEliminacion}
            onCancelar={handleCancelarEliminacion}
            evento={eventoSeleccionado}
          />
        </>
      )}
    </div>
  );
};

export default EventosTabla;
