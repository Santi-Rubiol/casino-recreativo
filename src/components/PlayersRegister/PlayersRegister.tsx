import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  guardarJugadoresStorage,
  leerJugadoresStorage,
} from '../../data/registroJugadores'
import type { Jugador } from '../../types/Types'
import './PlayersRegister.css'

const SortableRow = ({
  jugador,
  index,
  onDelete,
}: {
  jugador: Jugador
  index: number
  onDelete: (id: string) => void
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: jugador.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'fila-arrastrando' : ''}
    >
      <td
        {...attributes}
        {...listeners}
      >
        {index + 1}
      </td>
      <td
        {...attributes}
        {...listeners}
      >
        {jugador.nombre}
      </td>
      <td>
        <button
          className="btn-eliminar"
          onPointerDownCapture={(e) => e.stopPropagation()}
          onClick={() => onDelete(jugador.id)}
        >
          ✖
        </button>
      </td>
    </tr>
  )
}

type PlayersRegisterProps = {
  onConfirm: (jugadores: Jugador[]) => void
}

const PlayersRegister = ({ onConfirm }: PlayersRegisterProps) => {
  const [nombre, setNombre] = useState('')
  const [jugadores, setJugadores] = useState<Jugador[]>([])

  const sensores = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    const datosGuardados = leerJugadoresStorage()
    setJugadores(datosGuardados)
  }, [])

  useEffect(() => {
    guardarJugadoresStorage(jugadores)
  }, [jugadores])

  const agregarJugador = () => {
    if (!nombre.trim()) return
    const nuevo = {
      id: Date.now().toString(),
      nombre,
      posicion: jugadores.length + 1,
    }

    setJugadores((prev) => [...prev, nuevo])
    setNombre('')
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = jugadores.findIndex((j) => j.id === active.id)
    const newIndex = jugadores.findIndex((j) => j.id === over.id)

    const nuevosOrdenados = arrayMove(jugadores, oldIndex, newIndex)

    // Reasignar posición según el nuevo orden
    const actualizados = nuevosOrdenados.map((jugador, index) => ({
      ...jugador,
      posicion: index + 1,
    }))

    setJugadores(actualizados)
  }

  const handleEliminarJugador = (id: string) => {
    setJugadores((prev) => prev.filter((j) => j.id !== id))
  }

  return (
    <div className="registro-jugadores">
      <h2>Registro de Jugadores</h2>
      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button onClick={agregarJugador}>Agregar</button>
        <button onClick={() => setJugadores([])}>Resetear</button>
      </div>

      <DndContext
        sensors={sensores}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={jugadores.map((j) => j.id)}
          strategy={verticalListSortingStrategy}
        >
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {jugadores.map((jugador, index) => (
                <SortableRow
                  key={jugador.id}
                  jugador={jugador}
                  index={index}
                  onDelete={handleEliminarJugador}
                />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>

      <button
        className="btn-confirmar"
        onClick={() => onConfirm(jugadores)}
      >
        Confirmar jugadores
      </button>
    </div>
  )
}

export default PlayersRegister
