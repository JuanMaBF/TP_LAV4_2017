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
                <!-- https://fortawesome.github.io/Font-Awesome/icons/ -->
                <button class="btn btn-default btn-lg" value="Piedra" onclick="turno(this)">
                    <i class="far fa-hand-rock"></i>
                </button>
        
                <button class="btn btn-default btn-lg" value="Papel" onclick="turno(this)"><i class="far fa-hand-paper"></i>
                </button>
        
                <button class="btn btn-default btn-lg" value="Tijera" onclick="turno(this)">
                <i class="far fa-hand-scissors"></i>
                </button>
        
                <button class="btn btn-default btn-lg" value="Lagarto" onclick="turno(this)">
                <i class="far fa-hand-lizard"></i>
                </button>
        
                <button class="btn btn-default btn-lg" value="Spock" onclick="turno(this)">
                <i class="far fa-hand-spock"></i>
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

}