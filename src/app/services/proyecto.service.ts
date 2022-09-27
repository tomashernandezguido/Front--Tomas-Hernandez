import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { PeticionProyecto, RespuestaProyecto } from '../interfaces/proyecto';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  header: HttpHeaders 
  constructor(private http: HttpClient, private inicioSesionServicio: InicioSesionService) {
    this.header = inicioSesionServicio.armarHeader(new HttpHeaders())
  }

  crearProyecto(data: FormData): Observable<RespuestaProyecto> {
    return this.http.post<RespuestaProyecto>(Rutas.BASE + Rutas.PROYECTO, data, {
      headers: this.header
    })
  }

  editarProyecto(id: number, data: FormData): Observable<RespuestaProyecto> {
    return this.http.put<RespuestaProyecto>(Rutas.BASE + Rutas.PROYECTO + '/' + id, data, {
      headers: this.header
    })
  }

  borrarProyecto(id: number): Observable<void> {
    return this.http.delete<void>(Rutas.BASE + Rutas.PROYECTO + '/' + id, {
      headers: this.header
    })
  }

}
