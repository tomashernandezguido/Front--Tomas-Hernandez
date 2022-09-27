import { Component, OnInit } from '@angular/core';
import { PeticionLogin, Token } from 'src/app/interfaces/login';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(private servicio: InicioSesionService, private router: Router) { }

  ngOnInit(): void {
  }

  form: PeticionLogin = {
    usuario: '',
    password: ''
  }

  logear() {
    this.servicio.login(this.form).subscribe({
      next: (data: Token) => {
        this.setToken(data)
      },
      complete: () => {
        this.router.navigate(['admin'])
      }
    })
  }

  setToken(token: Token) {
    localStorage.setItem('token', 'Bearer ' + token.token)
  }

}
