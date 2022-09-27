import { Component, Input, OnInit } from '@angular/core';
import { PeticionContacto, RespuestaContacto } from 'src/app/interfaces/contacto';
import { ContactoService } from 'src/app/services/contacto.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';

@Component({
  selector: 'app-admin-contactos',
  templateUrl: './admin-contactos.component.html',
  styleUrls: ['./admin-contactos.component.css']
})
export class AdminContactosComponent implements OnInit {

  @Input() contactos?: RespuestaContacto[]
  @Input() personaId?: number
  form: FormGroup
  formOpen: boolean = false
  edicion: boolean = false


  constructor(private servicio: ContactoService, private fb: FormBuilder, private inicioSesionService: InicioSesionService) { 
    this.form = this.fb.group<PeticionContacto>({
      id: null,
      descripcion: '',
      contacto: '', 
      idPersona: this.personaId
    })
  }

  ngOnInit(): void {
  }

  abrirFormularioCreacion() {
    this.formOpen = true
    this.edicion = false
    this.form.reset()
    this.form.patchValue({
      idPersona: this.personaId
    }) 
  }

  abrirFormularioEdicion(contacto: RespuestaContacto) {
    this.formOpen = true
    this.edicion = true
    this.form.patchValue({
      id: contacto.id,
      descripcion: contacto.descripcion,
      contacto: contacto.contacto,
      idPersona: this.personaId
    })
  }

  crearContacto() {
    this.servicio.crearContacto(this.form.value).subscribe({
      next: (data: RespuestaContacto) => {
        this.contactos?.push(data)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionService.relogear()
        }
      },
      complete: () => {
        this.formOpen = false
      }
    })
  }

  editarContacto() {
    this.servicio.editarContacto(this.form.value.id, this.form.value).subscribe({
      next: (data: RespuestaContacto) => {
        this.contactos = this.contactos?.filter(contacto => contacto.id !== this.form.value.id)
        this.contactos?.push(data)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionService.relogear()
        }
      },
      complete: () => {
        this.formOpen = false
      }
    })
  }

  borrarContacto(id: number) {
    this.servicio.borrarContacto(id).subscribe({
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionService.relogear()
        }
      },
      complete: () => {
        this.contactos = this.contactos?.filter(contacto => contacto.id !== id)
      }
    })
  }

}
