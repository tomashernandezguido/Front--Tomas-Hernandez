import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeticionTrabajo, RespuestaTrabajo } from 'src/app/interfaces/trabajo';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';
import { TrabajoService } from 'src/app/services/trabajo.service';

@Component({
  selector: 'app-admin-trabajo',
  templateUrl: './admin-trabajo.component.html',
  styleUrls: ['./admin-trabajo.component.css']
})
export class AdminTrabajoComponent implements OnInit {

  @Input() trabajos?: RespuestaTrabajo[]
  @Input() personaId?: number
  form: FormGroup
  formOpen: boolean = false
  edicion: boolean = false


  constructor(private servicio: TrabajoService, private fb: FormBuilder, private inicioSesionServicio: InicioSesionService) { 
    this.form = this.fb.group<PeticionTrabajo>({
      fechaFinalizacion: null,
      fechaInicio: new Date(),
      id: null, 
      descripcion: '',
      nombreEmpresa: '',
      presente: null,
      rol: '',
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

  abrirFormularioEdicion(trabajo: RespuestaTrabajo) {
    this.formOpen = true
    this.edicion = true
    this.form.patchValue({
      idPersona: this.personaId,
      fechaFinalizacion: trabajo.fechaFinalizacion === '2100-01-01' ? null : trabajo.fechaFinalizacion,
      fechaInicio: trabajo.fechaInicio,
      id: trabajo.id,
      descripcion: trabajo.descripcionTrabajo,
      nombreEmpresa: trabajo.nombreEmpresa,
      rol: trabajo.rol,
      presente: trabajo.fechaFinalizacion === '2100-01-01'
    })
    this.disableFechaFinalizacion()
  }

  crearTrabajo() {
    this.servicio.crearTrabajo(this.form.value).subscribe({
      next: (data: RespuestaTrabajo) => {
        this.trabajos?.push(data)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionServicio.relogear()
        }
      },
      complete: () => {
        this.formOpen = false
      }
    })
  }

  editarTrabajo() {
    this.servicio.editarTrabajo(this.form.value.id, this.form.value).subscribe({
      next: (data: RespuestaTrabajo) => {
        this.trabajos = this.trabajos?.filter(trabajo => trabajo.id !== this.form.value.id)
        this.trabajos?.push(data)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionServicio.relogear()
        }
      },
      complete: () => {
        this.formOpen = false
        this.edicion = false
      }
    })
  }

  borrarTrabajo(id: number) {
    this.servicio.borrarTrabajo(id).subscribe({
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionServicio.relogear()
        }
      },
      complete: () => {
        this.trabajos = this.trabajos?.filter(trabajo => trabajo.id !== id)
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
