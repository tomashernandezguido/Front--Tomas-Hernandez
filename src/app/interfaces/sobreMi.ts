export interface RespuestaSobreMi {
    id: number
    profesion: string
    imagen: any
    sobreMi: string
}

export interface PeticionSobreMi {
    id: number | null
    profesion: string
    sobreMi: string
    idPersona?: number
    archivo: any
}