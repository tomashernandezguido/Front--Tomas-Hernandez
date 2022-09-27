import { RespuestaContacto } from "./contacto"
import { RespuestaEducacion } from "./educacion"
import { RespuestaProyecto } from "./proyecto"
import { RespuestaSobreMi } from "./sobreMi"
import { RespuestaTecnologia } from "./tecnologia"
import { RespuestaTrabajo } from "./trabajo"

export interface RespuestaPersona {
    id: number
    nombre: string
    apellido: string
    sobreMi: RespuestaSobreMi
    tecnologias: RespuestaTecnologia[],
    institutos: RespuestaEducacion[],
    contactos: RespuestaContacto[],
    trabajos: RespuestaTrabajo[],
    proyectos: RespuestaProyecto[]
}

export interface PeticionPersona {
    id: number | null
    nombre: string
    apellido: string
}

export interface PersonaBasica {
    id: number
    nombre: string
    apellido: string
}
