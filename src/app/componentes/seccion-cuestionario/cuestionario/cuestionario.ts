import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { cuestionario, pregunta } from '../tema/tema.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cuestionario',
  template: `
    <div class="card" id="form-card">
        <div class="card-header">
            <h3>{{cues.nombre}}</h3>
        </div>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <div *ngFor="let preg of preguntas">
                        <pregunta 
                            [preg]="preg"
                            (change)="emitEvent()"></pregunta>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  `,
  styles: [`
    #form-card {
        margin-top: 15px;
    }
  `]
})
export class CuestionarioComponent implements OnInit {
    @Input() cues: cuestionario;
    @Output() change = new EventEmitter<number>();
    public preguntas: Array<pregunta>;

    ngOnInit(): void {
        this.preguntas = this.cues.preguntas;
    }

    public emitEvent() {
        this.change.emit();
    }    

}
