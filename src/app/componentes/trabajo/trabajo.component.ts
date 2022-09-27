import { Component, Input, OnInit } from '@angular/core';
import { RespuestaTrabajo } from 'src/app/interfaces/trabajo';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.css']
})
export class TrabajoComponent implements OnInit {

  @Input() trabajos?: RespuestaTrabajo[]

  constructor() { }

  ngOnInit(): void {
  }

  obtenerFecha(fecha: string) {
    if (fecha === '2100-01-01') return 'Actualidad'
    let date: Date = new Date(fecha)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }

}
