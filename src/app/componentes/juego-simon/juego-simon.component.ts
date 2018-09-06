import { Component } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'juego-simon',
  templateUrl: './juego-simon.component.html',
  styleUrls: ['./juego-simon.component.css']
})
export class JuegoSimonComponent {

  public gameStarted: boolean = false;
  public modalMessage: string;

  private colorCodes: Array<string> = ['r', 'bl', 'yl', 'gr'];
  private sequence: Array<string>;
  private level: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private showingSequence: boolean = false;
  private currentLevelIndex: number = 0;
  private audios: Array<any> = new Array<any>(); 

  public constructor() {
    this.level.subscribe( val => {
      this.currentLevelIndex = 0;
      this.showingSequence = true;
      for(let i=0; i<=val; i++) {
        setTimeout(() => {
          this.showColor(this.sequence[i]);
        }, i * 1000);
      }
      this.showingSequence = false;
    });

    this.audios['r'] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    this.audios['yl'] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    this.audios['bl'] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    this.audios['gr'] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  }

  public startGame(): void {
    this.sequence = new Array<string>();
    this.createSequence();
    this.gameStarted = true;
    this.level.next(1);
  }

  private createSequence(): void {
    for(let i=0; i<7; i++) {
      let index = Math.floor(Math.random() * Math.floor(3));
      this.sequence.push(this.colorCodes[index]);
    }
  }

  public clickColor(color: string) {
    if(!this.showingSequence){
      if(color == this.sequence[this.currentLevelIndex]) {
        this.showColor(color);
        this.currentLevelIndex++;
        if (this.currentLevelIndex == this.level.value + 1 && this.currentLevelIndex != 7) {
          setTimeout( () => {
            this.level.next(this.currentLevelIndex);
          }, 1000);
        } else if (this.level.value == 6 && this.currentLevelIndex == 7) {
          this.endGame(true);
        }
      } else {
        this.endGame(false);
      }
    }
  }

  private showColor(color: string) {
    $('#card-'+color).addClass('active');
    this.audios[color].play();
    setTimeout( () => {
      $('#card-'+color).removeClass('active')
    } , 500);
  }



  private endGame(win: boolean): void {
    this.modalMessage = (win ? "GANASTE. " : "") + "Puntaje: " + this.level.value; 
    $("#endGameModal").modal();
    this.gameStarted = false;
    this.currentLevelIndex = 0;
    this.level.next(-1);
  }

}
