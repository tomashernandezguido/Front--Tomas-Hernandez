export interface RespuestaEducacion {
    id: number
    instituto: string
    titulo: string
    fechaInicio: string
    fechaFinalizacion: string
}

export interface PeticionEducacion {
    id: number | null
    instituto: string
    titulo: string
    fechaInicio: Date | null
    fechaFinalizacion: Date | null
    presente: boolean | null
    idPersona?: number
}