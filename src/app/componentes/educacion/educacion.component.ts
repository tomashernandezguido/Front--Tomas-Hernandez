import { Component, Input, OnInit } from '@angular/core';
import { RespuestaEducacion } from 'src/app/interfaces/educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  @Input() institutos?: RespuestaEducacion[]

  constructor() { }

  ngOnInit(): void {
  }

  obtenerFecha(fecha: string) {
    if (fecha === '2100-01-01') return 'Actualidad'
    let date = new Date(fecha)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }

}
