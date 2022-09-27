import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { PeticionTrabajo, RespuestaTrabajo } from '../interfaces/trabajo';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  header: HttpHeaders
  constructor(private http: HttpClient, private inicioSesionServicio: InicioSesionService) { 
    this.header = inicioSesionServicio.armarHeader(new HttpHeaders())
  }

  crearTrabajo(data: PeticionTrabajo): Observable<RespuestaTrabajo> {
    return this.http.post<RespuestaTrabajo>(Rutas.BASE + Rutas.TRABAJO, data, {
      headers: this.header
    })
  }

  editarTrabajo(id: number, data: PeticionTrabajo): Observable<RespuestaTrabajo> {
    return this.http.put<RespuestaTrabajo>(Rutas.BASE + Rutas.TRABAJO + '/' + id, data, {
      headers: this.header
    })
  }

  borrarTrabajo(id: number): Observable<void> {
    return this.http.delete<void>(Rutas.BASE + Rutas.TRABAJO + '/' + id, {
      headers: this.header
    })
  }
  
}
