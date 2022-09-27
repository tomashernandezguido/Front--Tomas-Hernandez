import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { PeticionSobreMi, RespuestaSobreMi } from '../interfaces/sobreMi';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class SobreMiService {

  constructor(private http: HttpClient, private service: InicioSesionService) { }

  header: HttpHeaders = new HttpHeaders()

  editarSobreMi(id: number, data: FormData): Observable<RespuestaSobreMi> {
    this.header = this.service.armarHeader(this.header)
    return this.http.put<RespuestaSobreMi>(Rutas.BASE + Rutas.SOBRE_MI + '/' + id, data, {
      headers: this.header
    })
  }
}
