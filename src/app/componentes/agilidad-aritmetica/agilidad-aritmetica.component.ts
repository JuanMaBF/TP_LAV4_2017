import { Component } from '@angular/core';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { MiJuegosService } from '../../mis-servicios/mi-juegos.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent {

  private repetidor: any;
  public tiempo: number = 5;
  public juegoIniciado: boolean = false;

  public primerNumero: number;
  public operador: string;
  private operatorsList = ['+', '-', '*', '/'];
  public segundoNumero: number;
  public resultado: number;
  public respuesta: number;

  constructor(public modal: Modal,
    public juegoService: MiJuegosService) { 
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
    this.setRepetidor();
  }

  public finalizarJuego() {

    let resultado = this.respuesta == this.resultado;

    this.modal.alert()
      .title(resultado ? "Ganaste!" : "Perdites :(")
      .body("El resultado es: " + this.respuesta)
      .open();

    this.juegoService.sumarResultado("Agilidad", "Pepiro", resultado ? "Ganó" : "Perdió");

    clearInterval(this.repetidor);   
    this.juegoIniciado = false;
    this.tiempo = 5;
    this.primerNumero = null;
    this.operador = null;
    this.segundoNumero = null;    
    this.respuesta = null;

  }  

}
