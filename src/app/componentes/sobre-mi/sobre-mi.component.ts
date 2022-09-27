import { Component, Input, OnInit } from '@angular/core';
import { RespuestaSobreMi } from 'src/app/interfaces/sobreMi';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() sobreMi?: RespuestaSobreMi 

  get imagen() {
    if (this.sobreMi?.imagen) {
      return 'data:image/jpeg;base64,' + this.sobreMi?.imagen
    }
    return null
  }

}
