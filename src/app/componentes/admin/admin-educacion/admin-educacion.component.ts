import { Component, Input, OnInit } from '@angular/core';
import { PeticionEducacion, RespuestaEducacion } from 'src/app/interfaces/educacion';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EducacionService } from 'src/app/services/educacion.service';
import { __values } from 'tslib';
import { HttpErrorResponse } from '@angular/common/http';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';

@Component({
  selector: 'app-admin-educacion',
  templateUrl: './admin-educacion.component.html',
  styleUrls: ['./admin-educacion.component.css']
})
export class AdminEducacionComponent implements OnInit {

  @Input() institutos?: RespuestaEducacion[]
  @Input() personaId?: number
  form: FormGroup
  formOpen: boolean = false
  edicion: boolean = false

  constructor(private servicio: EducacionService, private fb: FormBuilder, private inicioSesionService: InicioSesionService) { 
    this.form = this.fb.group<PeticionEducacion>({
      id: null,
      instituto: '',
      titulo: '',
      fechaFinalizacion: null,
      fechaInicio: null,
      presente: null,
      idPersona: this.personaId
    })
  }

  ngOnInit(): void {
  }



  obtenerFecha(fecha: string) {
    if (fecha === '2100-01-01') return 'Actualidad'
    return fecha
  }

  abrirFormularioCreacion() {
    this.form.reset()
    this.formOpen = true
    this.edicion = false
    this.form.patchValue({
      idPersona: this.personaId
    })
    this.disableFechaFinalizacion()
  }

  abrirFormularioEdicion(educacion: RespuestaEducacion) {
    this.formOpen = true
    this.edicion = true
    this.form.patchValue({
      id: educacion.id,
      instituto: educacion.instituto,
      titulo: educacion.titulo,
      fechaFinalizacion: educacion.fechaFinalizacion === '2100-01-01' ? null : educacion.fechaFinalizacion,
      fechaInicio: educacion.fechaInicio,
      presente: educacion.fechaFinalizacion === '2100-01-01',
      idPersona: this.personaId
    })
    this.disableFechaFinalizacion()
  }

  crearEducacion() {
    this.servicio.crearInstituto(this.form.value).subscribe({
      next: (data: RespuestaEducacion) => {
        this.institutos?.push(data)
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

  editarEducacion() {
    this.servicio.editarInstituto(this.form.value.id, this.form.value).subscribe({
      next: (data: RespuestaEducacion) => {
        this.institutos = this.institutos?.filter(instituto => instituto.id !== this.form.value.id)
        this.institutos?.push(data)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionService.relogear()
        }
      },
      complete: () => {
        this.formOpen = false
        this.edicion = false
      }
    })
  }

  borrarEducacion(id: number) {
    this.servicio.borrarInstituto(id).subscribe({
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionService.relogear()
        }
      },
      complete: () => {
        this.institutos = this.institutos?.filter(instituto => instituto.id !== id)
      }
    })
  }

  disableFechaFinalizacion() {
    if (this.form.value.presente) {
      this.form.controls['fechaFinalizacion'].disable()
    } else {
      this.form.controls['fechaFinalizacion'].enable()
    }
  }

}
