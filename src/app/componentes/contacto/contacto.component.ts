import { Component, Input, OnInit } from '@angular/core';
import { RespuestaContacto } from 'src/app/interfaces/contacto';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  @Input() contactos?: RespuestaContacto[]

  constructor() { }

  ngOnInit(): void {
  }

}
