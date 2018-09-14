import { Component, Input } from '@angular/core';
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

    {{respuesta}}
    <button (click)="aumentarContador()">Haceme click wachim</button>
  `,
  styles: []
})
export class PregunatComponent  {
    @Input() preg: pregunta;
    @Input() contador: BehaviorSubject<number>;
    public respuesta: string;

    public aumentarContador(): void {
        this.contador.next(this.contador.value+1);
    }

}
