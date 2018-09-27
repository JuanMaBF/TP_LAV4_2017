import { Component, OnInit } from '@angular/core';
import { MiJuegosService } from '../../mis-servicios/mi-juegos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

  public listaDeJuegos: Array<any>;

  constructor(public juegoService: MiJuegosService) {
    
  }
 
  public listarResultados(): void {
    this.juegoService
      .traerTodos()
      .then(res => { this.listaDeJuegos = res })
      .catch(err => console.log(err));
  }

  public listarFiltrado(filtro: string): void {
    this.juegoService
      .traerFiltradoPorJuego(filtro)
      .then(res => { this.listaDeJuegos = res })
      .catch(err => console.log(err));
  }

}
