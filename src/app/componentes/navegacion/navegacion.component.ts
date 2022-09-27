import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  constructor(private router: Router, private inicioSesionServicio: InicioSesionService) { }

  ngOnInit(): void {
  }

  irAlInicio() {
    this.router.navigate(['/'])
  }

  get token() {
    return localStorage.getItem('token') != null
  }

  deslogear() {
    this.inicioSesionServicio.relogear()
  }

}
