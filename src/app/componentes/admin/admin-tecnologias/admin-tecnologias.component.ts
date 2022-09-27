import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeticionTecnologia, RespuestaTecnologia } from 'src/app/interfaces/tecnologia';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';
import { TecnologiaService } from 'src/app/services/tecnologia.service';

@Component({
  selector: 'app-admin-tecnologias',
  templateUrl: './admin-tecnologias.component.html',
  styleUrls: ['./admin-tecnologias.component.css']
})
export class AdminTecnologiasComponent implements OnInit {

  @Input() tecnologias?: RespuestaTecnologia[]
  @Input() personaId?: number
  formOpen: boolean = false
  edicion: boolean = false
  form: FormGroup 

  constructor(private servicio: TecnologiaService, private fb: FormBuilder, private inicioSesionServicio: InicioSesionService) { 
    this.form = this.fb.group<PeticionTecnologia>({
      id: null,
      archivo: null, 
      nombre: '',
      nivel: 0,
      idPersona: this.personaId
    })
  }

  ngOnInit(): void {
  }

  subirArchivo(event: any) {
    this.form.patchValue({
      archivo: event.target.files[0]
    })
  }

  abrirCreacion() {
    this.form.reset()
    this.formOpen = true
    this.edicion = false
    this.form.patchValue({
      idPersona: this.personaId
    })
  }

  abrirEdicion(tecnologia: RespuestaTecnologia) {
    this.edicion = true
    this.formOpen = true
    this.form.patchValue({
      idPersona: this.personaId,
      nombre: tecnologia.nombre,
      nivel: tecnologia.nivel,
      id: tecnologia.id
    })
  }

  crearTecnologia() {
    let formData = new FormData()
    formData.append('idPersona', this.form.value.idPersona)
    formData.append('nombre', this.form.value.nombre)
    formData.append('nivel', this.form.value.nivel)
    formData.append('archivo', this.form.value.archivo)
    this.servicio.crearTecnologia(formData).subscribe({
      next: (data: RespuestaTecnologia) => {
        this.tecnologias?.push(data)
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

  editarTecnologia() {
    let formData = new FormData()
    formData.append('idPersona', this.form.value.idPersona)
    formData.append('nombre', this.form.value.nombre)
    formData.append('nivel', this.form.value.nivel)
    formData.append('archivo', this.form.value.archivo)
    this.servicio.editarTecnologia(this.form.value.id, formData).subscribe({
      next: (data: RespuestaTecnologia) => {
        this.tecnologias = this.tecnologias?.filter(tecnologia => tecnologia.id !== this.form.value.id)
        this.tecnologias?.push(data)
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

  borrarTecnologia(id: number) {
    this.servicio.borrarTecnologia(id).subscribe({
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionServicio.relogear()
        }
      },
      complete: () => {
        this.tecnologias = this.tecnologias?.filter(tecnologia => tecnologia.id !== id)
      }
    })
  }

  obtenerImagen(imagen: any) {
    return 'data:image/jpeg;base64,' + imagen
  }

}
