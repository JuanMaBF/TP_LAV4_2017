import { Injectable } from '@angular/core';
import { MiHttpService } from '../servicios/mi-http/mi-http.service';
import { CustomHttpService } from './custom-http.service';
import { TraerFiltradoService } from './traer-filtrado.service';

@Injectable()
export class MiJuegosService {

    constructor(private filtradoService: TraerFiltradoService) {
    }

    public traerTodos() {
        return this.filtradoService
            .traerTodos('http://lvh.me/ApiRest/index.php/traerTodos')
    }

    public traerFiltradoPorJuego(juego: string) {
        return this.filtradoService
            .traerFiltrado('http://lvh.me/ApiRest/index.php/traerTodos', 'juego', juego);
    }

}
