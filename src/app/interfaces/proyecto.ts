import { RespuestaTecnologia } from "./tecnologia"

export interface RespuestaProyecto {
    id: number
    nombre: string
    descripcion: string
    sitio: string
    imagen: any
    tecnologias: RespuestaTecnologia[]
}

export interface PeticionProyecto {
    id: number | null
    nombre: string
    descripcion: string
    sitio: string
    archivo: any
    idPersona?: number
    idTecnologias: number[]
}