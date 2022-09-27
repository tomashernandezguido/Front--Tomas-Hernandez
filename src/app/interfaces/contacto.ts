export interface RespuestaContacto {
    id: number
    descripcion: string
    contacto: string
}

export interface PeticionContacto {
    id: number | null
    descripcion: string
    contacto: string
    idPersona?: number
}