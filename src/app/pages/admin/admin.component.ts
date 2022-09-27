import { Component, OnInit } from '@angular/core';
import { PersonaBasica, RespuestaPersona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  persona?: RespuestaPersona
  personaBasica?: PersonaBasica

  constructor(private service: PersonaService) { }

  ngOnInit(): void {
    this.obtenerPersona()
  }

  obtenerPersona() {
    this.service.obtenerPersona().subscribe({
      next: (data: RespuestaPersona) => {
        this.persona = data
      },
      complete: () => {
        if (this.persona != null) {
          this.personaBasica = {
            id: this.persona.id,
            nombre: this.persona.nombre,
            apellido: this.persona.apellido
          }
        }
      }
    })
  }

}
