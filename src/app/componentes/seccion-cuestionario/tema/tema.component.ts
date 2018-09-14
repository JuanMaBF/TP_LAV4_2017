import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tema',
  template: `
    <div class="card">
      <div class="card-header">
        <h3>{{elTema}}</h3>
      </div>
      <div class="card-body">
        <div *ngFor="let cues of cuestionarios">
          <cuestionario 
            [cues]="cues"
            [contador]="$contador"></cuestionario>
        </div>
      </div>
    </div>
    {{contador}}
  `,
  styles: []
})
export class TemaComponent {
  @Input() elTema: String;
  public cuestionarios = new Array<cuestionario>();
  public contador: number = 0;
  public $contador = new BehaviorSubject<number>(0);

  constructor() {

    this.$contador.subscribe(n => {
      this.contador = n;
    });    

    let cuestionario1 = new cuestionario("Cuestionario 1");
    let cuestionario2 = new cuestionario("Cuestionario 2");
    cuestionario1.addPregunta("Quien es el mejor?");
    cuestionario1.addPregunta("Quien es el campeon mundial del mundo?");
    cuestionario2.addPregunta("Cual es la raiz cuadrada de pi?");
    cuestionario2.addPregunta("Pablito clavo un clavito?");
    this.cuestionarios.push(cuestionario1, cuestionario2);
  }

}

export class cuestionario {
  public nombre: string;
  public preguntas = new Array<pregunta>();

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  public addPregunta(consigna: string): void {
    this.preguntas.push(new pregunta(consigna));
  }

}

export class pregunta {
  public consigna;
  public respuesta: string;

  constructor(consigna: string) {
    this.consigna = consigna;
  }
}
