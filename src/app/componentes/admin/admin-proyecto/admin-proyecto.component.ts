import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeticionProyecto, RespuestaProyecto } from 'src/app/interfaces/proyecto';
import { RespuestaTecnologia } from 'src/app/interfaces/tecnologia';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-admin-proyecto',
  templateUrl: './admin-proyecto.component.html',
  styleUrls: ['./admin-proyecto.component.css']
})
export class AdminProyectoComponent implements OnInit {

  @Input() proyectos?: RespuestaProyecto[]
  @Input() personaId?: number
  @Input() tecnologias?: RespuestaTecnologia[]
  formOpen: boolean = false
  edicion: boolean = false
  form: FormGroup
  idTecnologias: number[] = []

  constructor(private servicio: ProyectoService, private fb: FormBuilder, private inicioSesionService: InicioSesionService) { 
    this.form = this.fb.group<PeticionProyecto>({
      id: null, 
      descripcion: '',
      idTecnologias: this.idTecnologias,
      nombre: '',
      sitio: '',
      idPersona: this.personaId,
      archivo: null
    })
  }

  ngOnInit(): void {
  }

  actualizarTecnologiasId(id: number) {
    if (this.idTecnologias.includes(id)) {
      this.idTecnologias = this.idTecnologias.filter(tecnologiaId => tecnologiaId !== id)
    } else {
      this.idTecnologias.push(id)
    }
  }

  obtenerImagen(imagen: any) {
    return 'data:image/jpeg;base64,' + imagen
  }

  obtenerTecnologias(tecnologias: RespuestaTecnologia[]) {
    return tecnologias.map(tecnologia => tecnologia.nombre).join(', ')
  }

  subirArchivo(event: any) {
    const archivo: any = (event.target).files[0]
    this.form.patchValue({
      archivo: archivo
    })
  }

  abrirFormularioCreacion() {
    this.idTecnologias = []
    this.form.reset()
    this.form.patchValue({
      idPersona: this.personaId
    })
    this.formOpen = true
    this.edicion = false
  }

  abrirFormularioEdicion(proyecto: RespuestaProyecto) {
    this.form.patchValue({
      id: proyecto.id,
      idTecnologias: proyecto.tecnologias.map(tecnologia => tecnologia.id),
      nombre: proyecto.nombre,
      sitio: proyecto.sitio,
      idPersona: this.personaId,
      descripcion: proyecto.descripcion
    })
    this.idTecnologias = proyecto.tecnologias.map(tecnologia => tecnologia.id)
    this.edicion = true
    this.formOpen = true
  }

  crearProyecto() {
    let formData = new FormData()
    this.form.patchValue({
      idTecnologias: this.idTecnologias 
    })
    formData.append('archivo', this.form.get('archivo')?.value)
    formData.append('idTecnologias', this.form.get('idTecnologias')?.value)
    formData.append('nombre', this.form.get('nombre')?.value)
    formData.append('sitio', this.form.get('sitio')?.value)
    formData.append('descripcion', this.form.get('descripcion')?.value)
    formData.append('idPersona', this.form.get('idPersona')?.value)
    this.servicio.crearProyecto(formData).subscribe({
      next: (data: RespuestaProyecto) => {
        this.proyectos?.push(data)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionService.relogear()
        }
      }
    })
    this.formOpen = false
  }

  editarProyecto() {
    let formData = new FormData()
    this.form.patchValue({
      idTecnologias: this.idTecnologias 
    })
    formData.append('archivo', this.form.get('archivo')?.value)
    formData.append('idTecnologias', this.form.get('idTecnologias')?.value)
    formData.append('nombre', this.form.get('nombre')?.value)
    formData.append('sitio', this.form.get('sitio')?.value)
    formData.append('descripcion', this.form.get('descripcion')?.value)
    formData.append('idPersona', this.form.get('idPersona')?.value)
    this.servicio.editarProyecto(this.form.value.id, formData).subscribe({
      next: (data: RespuestaProyecto) => {
        this.proyectos = this.proyectos?.filter(proyecto => proyecto.id === this.form.value.id)
        this.proyectos?.push(data)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionService.relogear()
        }
      }
    })
  }

  borrarProyecto(id: number) {
    this.servicio.borrarProyecto(id).subscribe({
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionService.relogear()
        }
      },
      complete: () => {
        this.proyectos = this.proyectos?.filter(proyecto => proyecto.id !== id)
      }
    })
  }

  aplicarEstilos(id: number) {
    if (this.idTecnologias.includes(id)) {
      return {
        backgroundColor: '#5E8C61'
      }
    } else {
      return {
        backgroundColor: 'white'
      }
    }
  }

}
