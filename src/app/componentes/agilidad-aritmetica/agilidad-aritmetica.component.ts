import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import {Subscription} from "rxjs";
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent {

  private repetidor: any;
  public tiempo: number;
  public juegoIniciado: boolean = false;

  public primerNumero: number;
  public operador: string;
  private operatorsList = ['+', '-', '*', '/'];
  public segundoNumero: number;
  public resultado: number;
  public respuesta: number;

  constructor(public modal: Modal) {
    this.setRepetidor();
  }

  private setRepetidor() {
    this.repetidor = setInterval(()=>{ 
      this.tiempo--;
      if(this.tiempo == 0 ) {
        this.finalizarJuego();
      }
    }, 1000);
  }

  public iniciarJuego(): void {
    this.juegoIniciado = true;
    this.repetidor();
    
    this.primerNumero = Math.round(Math.random()*10) + 1;
    this.operador = this.operatorsList[Math.floor(Math.random() * 4)];
    this.segundoNumero = Math.round(Math.random()*10) + 1;

    if(this.operador == '+') {
      this.resultado = this.primerNumero + this.segundoNumero;
    } else if(this.operador == '-') {
      this.resultado = this.primerNumero - this.segundoNumero;
    } else if(this.operador == '*') {
      this.resultado = this.primerNumero * this.segundoNumero;
    } else if(this.operador == '/') {
      this.resultado = this.primerNumero / this.segundoNumero;
    } 

  }

  public finalizarJuego() {
    clearInterval(this.repetidor);   
    this.juegoIniciado = false;
    this.tiempo = 5;
    this.primerNumero = null;
    this.operador = null;
    this.segundoNumero = null;    

    this.modal.alert()
      .title(this.respuesta == this.resultado ? "Ganaste!" : "Perdites :(")
      .body("El resultado es: " + this.respuesta)
      .open();

  }  

}
