import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { MiJuegosService } from '../../mis-servicios/mi-juegos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public listaDeJuegos: Array<any>;

  constructor(public servicioJuego:JuegoServiceService,
    public juegoService: MiJuegosService) {
    this.miServicioJuego = this.servicioJuego;
    
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
 
 
  public listadoParaCompartir: Array<any>;
   miServicioJuego:JuegoServiceService
  
  ngOnInit() {
    
  }

  llamaService(){
    console.log("llamaService");
    this.listadoParaCompartir= this.miServicioJuego.listar();
  }

  llamaServicePromesa(){
    console.log("llamaServicePromesa");
    this.miServicioJuego.listarPromesa().then((listado) => {
        this.listadoParaCompartir = listado;
    });
  }
}
