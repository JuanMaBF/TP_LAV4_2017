import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-de-paises',
  templateUrl: './listado-de-paises.component.html',
  styleUrls: ['./listado-de-paises.component.css']
})
export class ListadoDePaisesComponent implements OnInit {
  public listadoDePaises: Array<any>;
  constructor() {
    //this.miServicioDePaises=servicioPaises;
   }

  ngOnInit() {
    /*this.miServicioDePaises.listar()
    .then(datos=>{
      console.info("listado de paises",datos);
      this.listadoDePaises=datos;
    });*/
  }

}
