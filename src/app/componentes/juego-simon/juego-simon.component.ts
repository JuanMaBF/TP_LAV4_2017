import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'juego-simon',
  templateUrl: './juego-simon.component.html',
  styleUrls: ['./juego-simon.component.css']
})
export class JuegoSimonComponent {

  public gameStarted: boolean = false;

  private colorCodes: Array<string> = ['r', 'az', 'am', 'v'];
  private sequence: Array<string>;
  private level: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private currentLevelIndex: number = 0;

  public constructor() {
    this.level.subscribe( val => {
      this.currentLevelIndex = 0;
      for(let i=0; i<=val; i++) {
        setTimeout(() => {
          this.showColor(this.sequence[i]);
        }, 500);
      }
    });
  }

  public startGame(): void {
    this.sequence = new Array<string>();
    this.createSequence();
    this.gameStarted = true;
    this.level.next(1);
  }

  private createSequence(): void {
    for(let i=0; i<14; i++) {
      let index = Math.floor(Math.random() * Math.floor(3));
      this.sequence.push(this.colorCodes[index]);
    }
  }

  public clickColor(color: string) {
    if(color == this.sequence[this.currentLevelIndex]) {
      this.currentLevelIndex++;
      if (this.currentLevelIndex == this.level.value + 1 && this.level.value + 1 != 14) {
        this.level.next(this.currentLevelIndex);
      } else if (this.level.value == 14) {
        alert('GANASTE');
        this.endGame();
      }
    } else {
      this.endGame();
    }
  }

  private showColor(color: string) {
    console.log(color);
  }

  private endGame(): void {
    alert('perdiste. Puntaje: ' + this.level.value);
    this.gameStarted = false;
    this.currentLevelIndex = 0;
    this.level.next(-1);
  }

}
