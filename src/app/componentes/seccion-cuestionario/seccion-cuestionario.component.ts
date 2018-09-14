import { Component } from '@angular/core';

@Component({
  selector: 'secccion-cuestionario',
  template: `
    <div class="row">
      <div class="col col-6">
        <tema [elTema]="tema" ></tema>
      </div>
    </div>
  `,
  styles: []
})
export class SeccionCuestionarioComponent  {
  
  public tema = "Matematicas";

}
