import { Component, Input, Output, EventEmitter } from '@angular/core';
import { pregunta } from '../tema/tema.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pregunta',
  template: `
    <label for="exampleInputEmail1">{{preg.consigna}}</label>
    <input 
        [(ngModel)]="respuesta"
        type="text" 
        class="form-control" 
        aria-describedby="emailHelp" 
        placeholder="{{preg.consigna}}">

    
    <button (click)="aumentarContador()">Haceme click wachim</button>
  `,
  styles: []
})
export class PregunatComponent  {
    @Input() preg: pregunta;
    @Output() change = new EventEmitter<number>();
    public respuesta: string;
    public contador = 0;

    public aumentarContador(): void {
        this.contador++;
        this.change.emit(this.contador);
    }

}
