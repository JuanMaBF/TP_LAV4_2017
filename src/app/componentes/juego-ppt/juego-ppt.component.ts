import { Component } from "@angular/core";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'juego-ppt',
    template: `
            <div class="container">
            <div class="header row">
            <div class="col-xs-11 h1"> Piedra, papel, tijera, lagarto, spock</div>
            <a class="btn btn-info col-xs-1" href="#">?</a>
            </div>
        
            <div class="main-content row">
        
            <!-- Player window -->
            <div class="player-window panel panel-info col-xs-5">
                <h3 class="panel-heading">Player</h3>
                <div class="panel-body" id="js-player-img"><i class="far fa-hand-right"></i>
                </div>
            </div>
        
            <!-- Versus window -->
            <div class="versus-window col-xs-2 h1 text-center">
                VS
            </div>
        
            <!-- Oponent window -->
            <div class="oponent-window panel panel-info col-xs-5">
                <h3 class="panel-heading">Oponente</h3>
                <div class="panel-body" id="js-oponent-img"><i class="far fa-hand-left"></i>
                </div>
            </div>
            </div>
        
            <div id="js-infobox" class="info-box text-center jumbotron col-xs-12">
            <span id="js-infobox-details">Selecciona una opción y...</span>
            <div id="js-infobox-main" class="h2"> ...Dale a jugar!</div>
        
        
            <div class="player-menu btn-group">
                <button class="btn btn-default btn-lg" value="Piedra" (click)="turno('Piedra')"><i class="far fa-hand-rock"></i>
                </button>
        
                <button class="btn btn-default btn-lg" value="Papel" (click)="turno('Papel')"><i class="far fa-hand-paper"></i>
                </button>
        
                <button class="btn btn-default btn-lg" value="Tijera" (click)="turno('Tijera')">
                <i class="far fa-hand-scissors"></i>
                </button>
        
            </div>
        
            </div>
        
        </div>
    `,
    styles: [`
        .container {
        width: 660px
        }    
        .oponent-window,
        .player-window {
        font-size: 15rem;
        text-align: center;
        }
        .main-content { background: none;}
    `]
}) export class JuegoPPTComponent {

    public turno(elecUsuario: string): void {

        let elecMaquina = ["Piedra", "Papel", "Tijera"][Math.floor(Math.random() * 3)];
        let resultado = elecUsuario + elecMaquina;

        if(["PiedraPiedra", "PapelPapel", "TijeraTijera"].indexOf(resultado) > -1) {
            //Empate
        } else if(["PiedraTijera", "TijeraPapel", "PapelPiedra"].indexOf(resultado) > -1) {
            //Gana usuario
        } else if(["TijeraPiedra", "PapelTijera", "PiedraPapel"].indexOf(resultado) > -1) {
            //Gana maquina
        }

        
        /*// Difinir la variable miTurno como value del botón 
        miTurno = miTurno.value;
      
        // Hacer un random para definir la variable suTurno
        var suTurno = ["Piedra", "Papel", "Tijera", "Lagarto", "Spock"][Math.floor(Math.random() * 5)];
        var bothTurno = miTurno + suTurno;
      
        // ******** Posible resultados ******** //
      
        // Empate
        if (
          bothTurno == "PiedraPiedra" ||
          bothTurno == "TijeraTijera" ||
          bothTurno == "LagartoLagarto" ||
          bothTurno == "SpockSpock" ||
          bothTurno == "PapelPapel") {
      
          var playerImg = document.querySelector("#js-player-img");
          playerImg.classList.add("bg-warning");
          playerImg.classList.remove("bg-success");
          playerImg.classList.remove("bg-danger");
          
          var oponenImg = document.querySelector("#js-oponent-img");
          oponenImg.classList.add("bg-warning");
          oponenImg.classList.remove("bg-success");
          oponenImg.classList.remove("bg-danger");
      
      
          result = "Empate";
          resultWhy = "parece que estabais pensando lo mismo...";
        }
      
        // Has Perdido!
        else if (
          bothTurno == "PiedraPapel" ||
          bothTurno == "PiedraSpock" ||
          bothTurno == "PapelTijera" ||
          bothTurno == "PapelLagarto" ||
          bothTurno == "TijeraPiedra" ||
          bothTurno == "TijeraSpock" ||
          bothTurno == "LagartoTijera" ||
          bothTurno == "LagartoPiedra" ||
          bothTurno == "SpockLagarto" ||
          bothTurno == "SpockPapel") {
      
          var playerImg = document.querySelector("#js-player-img");
          playerImg.classList.add("bg-danger");
          playerImg.classList.remove("bg-success");
          playerImg.classList.remove("bg-warning");
          
          var oponentImg = document.querySelector("#js-oponent-img");
          oponentImg.classList.remove("bg-danger");
          oponentImg.classList.add("bg-success");
          oponentImg.classList.remove("bg-warning");
      
          result = "Has Perdido!";
        }
      
        // Has Ganado!
        else if (
          bothTurno == "PiedraTijera" ||
          bothTurno == "PiedraLagarto" ||
          bothTurno == "PapelSpock" ||
          bothTurno == "PapelPiedra" ||
          bothTurno == "TijeraLagarto" ||
          bothTurno == "TijeraPapel" ||
          bothTurno == "LagartoSpock" ||
          bothTurno == "LagartoPapel" ||
          bothTurno == "SpockTijera" ||
          bothTurno == "SpockPiedra") {
      
          var playerImg = document.querySelector("#js-player-img");
          playerImg.classList.add("bg-success");
          playerImg.classList.remove("bg-warning");
          playerImg.classList.remove("bg-danger");
          
          var oponentImg = document.querySelector("#js-oponent-img");
          oponentImg.classList.remove("bg-success");
          oponentImg.classList.remove("bg-warning");
          oponentImg.classList.add("bg-danger");
      
          result = "Has Ganado";
        } else(result = "Whaaatt!!!")
      
      
        if (
          bothTurno == "PiedraPapel" ||
          bothTurno == "PapelPiedra") {
      
          var resultWhy = "El papel envuelve a la piedra";
        } else if (
          bothTurno == "PapelTijera" ||
          bothTurno == "TijeraPapel") {
      
          var resultWhy = "La tijera corta el papel";
        } else if (
          bothTurno == "PiedraTijera" ||
          bothTurno == "TijeraPiedra") {
      
          var resultWhy = "La piedra rompe las tijeras";
        }
      
        else if (
          bothTurno == "SpockTijera" ||
          bothTurno == "TijeraSpock") {
      
          var resultWhy = "Spock rompe con las tijeras";
        }
      
        else if (
          bothTurno == "SpockPapel" ||
          bothTurno == "PapelSpock") {
      
          var resultWhy = "El papel desaprueba a Spock";
        }
      
        else if (
          bothTurno == "SpockPiedra" ||
          bothTurno == "PiedraSpock") {
      
          var resultWhy = "Spock vaporiza la piedra";
        }
      
        else if (
          bothTurno == "SpockLagarto" ||
          bothTurno == "LagartoSpock") {
      
          var resultWhy = "El lagarto envenena a Spock";
        } else(resultWhy = "Falta explicación para" + bothTurno)
      
        
        if (
          miTurno == "Piedra") {
      
          var miTurno = "<i class='far fa-hand-rock-o'></i>";
        } else if (
          miTurno == "Papel") {
      
          var miTurno = "<i class='far fa-hand-paper-o'></i>";
        } else if (
          miTurno == "Tijera") {
      
          var miTurno = "<i class='far fa-hand-scissors-o'></i>";
        } else if (
          miTurno == "Spock") {
      
          var miTurno = "<i class='far fa-hand-spock-o'></i>";
        } else if (
          miTurno == "Lagarto") {
      
          var miTurno = "<i class='far fa-hand-lizard-o'></i>";
        }
      
        
        if (
          suTurno == "Piedra") {
      
          var suTurno = "<i class='far fa-hand-rock-o'></i>";
        } else if (
          suTurno == "Papel") {
      
          var suTurno = "<i class='far fa-hand-paper-o'></i>";
        } else if (
          suTurno == "Tijera") {
      
          var suTurno = "<i class='far fa-hand-scissors-o'></i>";
        } else if (
          suTurno == "Spock") {
      
          var suTurno = "<i class='far fa-hand-spock-o'></i>";
        } else if (
          suTurno == "Lagarto") {
      
          var suTurno = "<i class='far fa-hand-lizard-o'></i>";
        }
      
        document.getElementById("js-player-img").innerHTML = miTurno;
        document.getElementById("js-oponent-img").innerHTML = suTurno;
        document.getElementById("js-infobox-main").innerHTML = result;
        document.getElementById("js-infobox-details").innerHTML = resultWhy;*/
      
      }

}