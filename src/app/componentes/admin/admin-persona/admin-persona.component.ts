import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PersonaBasica, PeticionPersona, RespuestaPersona } from 'src/app/interfaces/persona';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-admin-persona',
  templateUrl: './admin-persona.component.html',
  styleUrls: ['./admin-persona.component.css']
})
export class AdminPersonaComponent implements OnInit {

  @Input() persona?: PersonaBasica
  editar: boolean = false
  form: PeticionPersona = {
    nombre: '',
    apellido: '',
    id: this.persona?.id || null
  }

  constructor(private service: PersonaService, private inicioSesionService: InicioSesionService) { }

  ngOnInit(): void {
  }

  editarPersona() {
    if (this.persona != null) {
      this.form = {
        nombre: this.persona.nombre,
        apellido: this.persona.apellido,
        id: this.persona.id
      }
      this.editar = true
    }
  }

  enviar() {
    if (this.form.id != null) {
      this.service.editarPersona(this.form.id, this.form).subscribe({
        next: (data: RespuestaPersona) => {
          this.persona = data
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.inicioSesionService.relogear()
          }
        },
        complete: () => this.editar = false
      })
    }
  }

}
