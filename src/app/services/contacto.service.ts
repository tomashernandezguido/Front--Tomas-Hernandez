import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { PeticionContacto, RespuestaContacto } from '../interfaces/contacto';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  header: HttpHeaders
  constructor(private http: HttpClient, private inicioService: InicioSesionService) { 
    this.header = inicioService.armarHeader(new HttpHeaders())
  }

  crearContacto(data: PeticionContacto):Observable<RespuestaContacto> {
    return this.http.post<RespuestaContacto>(Rutas.BASE + Rutas.CONTACTO, data, {
      headers: this.header
    })
  }

  editarContacto(id: number, data: PeticionContacto): Observable<RespuestaContacto> {
    return this.http.put<RespuestaContacto>(Rutas.BASE + Rutas.CONTACTO + '/' + id, data, {
      headers: this.header
    })
  }

  borrarContacto(id: number): Observable<void> {
    return this.http.delete<void>(Rutas.BASE + Rutas.CONTACTO + '/' + id, {
      headers: this.header
    })
  }

}
