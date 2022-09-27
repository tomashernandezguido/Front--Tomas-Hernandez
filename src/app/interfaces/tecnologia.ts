export interface RespuestaTecnologia {
    id: number
    nombre: string
    nivel: number
    imagen: any
}

export interface PeticionTecnologia {
    id: number | null
    nombre: string
    nivel: number
    idPersona?: number
    archivo: any
}