import { Component, OnInit } from '@angular/core';
import { RespuestaPersona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  persona?: RespuestaPersona

  constructor(private servicio: PersonaService) { }

  ngOnInit(): void {
    this.obtenerPersona()
  }

  obtenerPersona() {
    this.servicio.obtenerPersona().subscribe({
      next: (data: RespuestaPersona) => {
        this.persona = data
      }
    })
  }

}
