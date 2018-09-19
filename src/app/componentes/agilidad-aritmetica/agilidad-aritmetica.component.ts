import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
//import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  public primerNumero: number;
  public operador: string;
  public segundoNumero: number;
  public juegoIniciado: boolean = false;
  private repetidor: any;
  public tiempo: number;

  constructor() {
    this.setRepetidor();
  }

  private setRepetidor() {
    this.repetidor = setInterval(()=>{ 
      this.tiempo--;
      if(this.tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.juegoIniciado = false;
        this.tiempo=5;
      }
    }, 1000);
  }

  public iniciarJuego(): void {
    this.juegoIniciado = true;
  }

  public verificar() {
    this.repetidor();
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);   
  }  


   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  
  private subscription: Subscription;
  ngOnInit() {
  }
   /*constructor() {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");  
  }*/
  NuevoJuego() {
    /*this.ocultarVerificar=false;
   this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=5;
      }
      }, 900);*/

  }

}
