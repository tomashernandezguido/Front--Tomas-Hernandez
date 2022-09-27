import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonaBasica } from 'src/app/interfaces/persona';
import { PeticionSobreMi, RespuestaSobreMi } from 'src/app/interfaces/sobreMi';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';
import { SobreMiService } from 'src/app/services/sobre-mi.service';

@Component({
  selector: 'app-admin-sobre-mi',
  templateUrl: './admin-sobre-mi.component.html',
  styleUrls: ['./admin-sobre-mi.component.css']
})
export class AdminSobreMiComponent implements OnInit {

  @Input() sobreMi?: RespuestaSobreMi
  @Input() persona?: PersonaBasica

  form: FormGroup 
  id?: number
  editar: boolean = false

  constructor(private service: SobreMiService, private fb: FormBuilder, private inicioSesionServicio: InicioSesionService) { 
    this.form = fb.group<PeticionSobreMi>({
      id: null,
      profesion: '',
      sobreMi: '',
      idPersona: this.persona?.id,
      archivo: null
    })
  }

  ngOnInit(): void {
  }

  subirArchivo(event: any) {
    this.form.patchValue({
      archivo: event.target.files[0]
    })
  }

  editarSobreMi(sobreMi: RespuestaSobreMi) { 
    this.form.patchValue({
      id: sobreMi.id,
      profesion: sobreMi.profesion,
      sobreMi: sobreMi.sobreMi,
      idPersona: this.persona?.id
    })
    this.editar = true
  }

  enviarDatos() {
    let formData = new FormData()
    formData.append('idPersona', this.form?.value.idPersona)
    formData.append('profesion', this.form?.value.profesion)
    formData.append('sobreMi', this.form?.value.sobreMi)
    formData.append('archivo', this.form?.value.archivo)
    this.service.editarSobreMi(this.form.value.id, formData).subscribe({
      next: (data: RespuestaSobreMi) => {
        this.sobreMi = data
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.inicioSesionServicio.relogear()
        }
      },
      complete: () => {
        this.editar = false
      }
    })
  }
 

  obtenerImagen(imagen: any) {
    return 'data:image/jpeg;base64,' + imagen
  }

}
