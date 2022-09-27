import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { PeticionLogin, Token } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  constructor(private http: HttpClient, private router: Router) { }

  login(data: PeticionLogin): Observable<Token> {
    return this.http.post<Token>(Rutas.BASE + Rutas.INICIO_SESION, data)
  }

  armarHeader(header: HttpHeaders) {
    const token = localStorage.getItem('token');
    if (token != null && token.includes('Bearer ')) {
      if (!header.has('Authorization')) {
        header = header.append('Authorization', token)
      } else {
        header = header.set('Authorization', token)
      }
    } else {
      this.borrarToken();
    }
    return header
  }

  private borrarToken() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  relogear() {
    this.borrarToken()
  }

}
