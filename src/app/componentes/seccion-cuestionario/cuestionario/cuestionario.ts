import { Component, Input, OnInit } from '@angular/core';
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
                            [contador]="contador"></pregunta>
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
    @Input() contador: BehaviorSubject<number>;
    public preguntas: Array<pregunta>;

    ngOnInit(): void {
        this.preguntas = this.cues.preguntas;
    }

}
