import { Component, Input, OnInit } from '@angular/core';
import { RespuestaProyecto } from 'src/app/interfaces/proyecto';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  @Input() proyectos?: RespuestaProyecto[]

  constructor() { }

  ngOnInit(): void {
  }

  obtenerImagen(imagen: any) {
    return 'data:image/jpeg;base64,' + imagen
  }

}
