import { Component } from "@angular/core";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { MiJuegosService } from "../../mis-servicios/mi-juegos.service";

@Component({
    selector: 'juego-ppt',
    templateUrl: 'juego-ppt.component.html',
    styles: [`
        
        .card-header {
            text-align: center;
        }

        .oponent-window,
        .player-window {
        font-size: 15rem;
        text-align: center;
        }
        .main-content { background: none;}
    `]
}) export class JuegoPPTComponent {

    public elecMaquina;
    public elecUsuario;

    constructor(public modal: Modal,
      public juegoService: MiJuegosService) {
        
      }

    public turno(elUsr: string): void {

        this.elecMaquina = ["Piedra", "Papel", "Tijera"][Math.floor(Math.random() * 3)];
        this.elecUsuario = elUsr;
        let resultado = elUsr + this.elecMaquina;

        let final;
        let mensaje;

        if(["PiedraPiedra", "PapelPapel", "TijeraTijera"].indexOf(resultado) > -1) {
            final = "Empate";
            mensaje = "Empate";
        } else if(["PiedraTijera", "TijeraPapel", "PapelPiedra"].indexOf(resultado) > -1) {
            final = "Ganó";
            mensaje = "Ganaste!";
        } else if(["TijeraPiedra", "PapelTijera", "PiedraPapel"].indexOf(resultado) > -1) {
          final = "Perdió";
          mensaje = "Perdiste :(";
        }

        this.modal.prompt()
          .size('lg')
          .showClose(false)
          .title(mensaje)
          .placeholder('Ingresá tu nombre')
          .body('Ingresá tu nombre')
          .open().result
          .then(nombre => {
            this.juegoService.sumarResultado("PPT", nombre, final);
          });

        
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