import { Component, Input, OnInit } from '@angular/core';
import { RespuestaTecnologia } from 'src/app/interfaces/tecnologia';

@Component({
  selector: 'app-tecnologia',
  templateUrl: './tecnologia.component.html',
  styleUrls: ['./tecnologia.component.css']
})
export class TecnologiaComponent implements OnInit {

  @Input() tecnologias?: RespuestaTecnologia[]

  constructor() { }

  ngOnInit(): void {
  }

  imagen(imagen: any) {
    return 'data:image/jpeg;base64,' + imagen
  }

}
