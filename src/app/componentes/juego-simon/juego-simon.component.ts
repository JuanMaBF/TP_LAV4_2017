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
  private showingSequence: boolean = false;
  private currentLevelIndex: number = 0;

  public current: number;

  private audios: Array<any> = new Array<any>(); 

  public constructor() {
    this.level.subscribe( val => {
      this.currentLevelIndex = 0;
      this.showingSequence = true;
      for(let i=0; i<=val; i++) {
        this.current = i;
        //this.showColor(this.sequence[i]);
      }
      this.showingSequence = false;
    });

    this.audios['r'] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    this.audios['am'] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    this.audios['az'] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    this.audios['v'] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
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
    if(!this.showingSequence){
      if(color == this.sequence[this.currentLevelIndex]) {
        this.audios[color].play();
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
  }

  private showColor(color: string) {
    setTimeout(() => {
      //this.audios[color].play();
      //this.current = color
    }, 1000);
  }



  private endGame(): void {
    alert('perdiste. Puntaje: ' + this.level.value);
    this.gameStarted = false;
    this.currentLevelIndex = 0;
    this.level.next(-1);
  }

}
