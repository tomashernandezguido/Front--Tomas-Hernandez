import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InicioSesionService } from './inicio-sesion.service';
import { Observable } from 'rxjs';
import { PeticionTecnologia, RespuestaTecnologia } from '../interfaces/tecnologia';
import { Rutas } from '../enum/rutas';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {

  header: HttpHeaders = new HttpHeaders()
  constructor(private http: HttpClient, private inicioSesion: InicioSesionService) { 
    this.header = this.inicioSesion.armarHeader(new HttpHeaders()) 
  }

  crearTecnologia(data: FormData): Observable<RespuestaTecnologia> {
    return this.http.post<RespuestaTecnologia>(Rutas.BASE + Rutas.TECNOLOGIA, data, {
      headers: this.header
    })
  }

  editarTecnologia(id: number, data: FormData): Observable<RespuestaTecnologia> {
    return this.http.put<RespuestaTecnologia>(Rutas.BASE + Rutas.TECNOLOGIA + '/' + id, data, {
      headers: this.header
    })
  }

  borrarTecnologia(id: number): Observable<void> {
    return this.http.delete<void>(Rutas.BASE + Rutas.TECNOLOGIA + '/' + id, {
      headers: this.header
    })
  }

}
