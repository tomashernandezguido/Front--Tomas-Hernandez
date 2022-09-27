export interface RespuestaTrabajo {
    id: number
    fechaInicio: string
    fechaFinalizacion: string
    nombreEmpresa: string
    rol: string
    descripcionTrabajo: string
}

export interface PeticionTrabajo {
    id: number | null
    fechaInicio: Date
    fechaFinalizacion: Date | null
    presente: boolean | null
    nombreEmpresa: string
    rol: string
    descripcion: string
    idPersona?: number
}