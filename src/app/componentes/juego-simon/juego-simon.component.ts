import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'juego-simon',
  templateUrl: './juego-simon.component.html',
  styleUrls: ['./juego-simon.component.css']
})
export class JuegoSimonComponent {

  public gameStarted: boolean = false;

  private sequence: Array<string> = new Array<string>();
  private level: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private currentLevelIndex: number = 0;

  public constructor() {
    this.sequence = ['r', 'r', 'am', 'az', 'v', 'v', 'am', 'az', 'az', 'r', 'r', 'r', 'am', 'az']
    this.level.subscribe( val => {
      this.currentLevelIndex = 0;
      for(let i=0; i<=val; i++) {
        //setTimeout(() => {
          this.showColor(this.sequence[i]);
        //}, 500);
      }
    });
  }

  public startGame(): void {
    this.gameStarted = true;
    this.level.next(1);
  }

  public clickColor(color: string) {
    if(color == this.sequence[this.currentLevelIndex]) {
      this.currentLevelIndex++;
      if (this.currentLevelIndex == this.level.value + 1) {
        this.level.next(this.currentLevelIndex);
      } 
    } else {
      this.endGame();
    }
  }

  private showColor(color: string) {
    alert(color);
  }

  private endGame(): void {
    alert('perdiste. Puntaje: ' + this.level.value);
    this.gameStarted = false;
    this.currentLevelIndex = 0;
    this.level.next(-1);
  }

}
