import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'juego-simon',
  templateUrl: './juego-simon.component.html',
  styleUrls: ['./juego-simon.component.css']
})
export class JuegoSimonComponent {

  public gameStarted: boolean = false;
  private secuencia: Array<string> = new Array<string>();
  private level: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public constructor() {
    this.secuencia = ['r', 'r', 'am', 'az', 'v', 'v', 'am', 'az', 'az', 'r', 'r', 'r', 'am', 'az']
    this.level.subscribe( val => {
      for(let i=0; i<val; i++) {
        setTimeout(() => {
          this.showColor(this.secuencia[i]);
        }, 500);
      }
    });
  }

  public startGame(): void {
    this.gameStarted = true;
    this.level.next(3);
  }

  private showColor(color: string) {
    alert(color);
  }

  public endGame(): void {
    this.gameStarted = false;
  }

}
