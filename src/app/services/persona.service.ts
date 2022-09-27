import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { PeticionPersona, RespuestaPersona } from '../interfaces/persona';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  header: HttpHeaders = new HttpHeaders()

  constructor(private http: HttpClient, private inicioSesion: InicioSesionService) { 
  }

  obtenerPersona(): Observable<RespuestaPersona> {
    return this.http.get<RespuestaPersona>(Rutas.BASE + Rutas.PERSONA)
  }

  editarPersona(id: number, data: PeticionPersona): Observable<RespuestaPersona> {
    this.header = this.inicioSesion.armarHeader(this.header)
    return this.http.put<RespuestaPersona>(Rutas.BASE + Rutas.PERSONA + '/' + id, data, {
      headers: this.header
    })
  }
}
