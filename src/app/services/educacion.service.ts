import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { PeticionEducacion, RespuestaEducacion } from '../interfaces/educacion';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  header: HttpHeaders
  constructor(private http: HttpClient, private inicioSesionServicio: InicioSesionService) { 
    this.header = inicioSesionServicio.armarHeader(new HttpHeaders())
  }

  crearInstituto(data: PeticionEducacion): Observable<RespuestaEducacion> {
    return this.http.post<RespuestaEducacion>(Rutas.BASE + Rutas.EDUCACION, data, {
      headers: this.header
    })
  }

  editarInstituto(id: number, data: PeticionEducacion): Observable<RespuestaEducacion> {
    return this.http.put<RespuestaEducacion>(Rutas.BASE + Rutas.EDUCACION + '/' + id, data, {
      headers: this.header
    })
  }

  borrarInstituto(id: number): Observable<void> {
    return this.http.delete<void>(Rutas.BASE + Rutas.EDUCACION + '/' + id, {
      headers: this.header
    })
  }

}
