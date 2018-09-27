import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { TraerFiltradoService } from './traer-filtrado.service';

@Injectable()
export class MiJuegosService {

    constructor(private filtradoService: TraerFiltradoService,
        public httpService: CustomHttpService) {
    }

    public traerTodos(): Promise<any> {
        return this.filtradoService
            .traerTodos('http://lvh.me/ApiRest/index.php/traerTodos')
    }

    public traerFiltradoPorJuego(juego: string): Promise<any> {
        return this.filtradoService
            .traerFiltrado('http://lvh.me/ApiRest/index.php/traerTodos', 'juego', juego);
    }

    public setJuegos(juegos: any): Promise<any> {
        return this.httpService
            .post('http://lvh.me/ApiRest/index.php/guardarJuego', juegos);
    }

    public sumarResultado(juego: string, jugador: string, resultado: string): void {
        this.traerTodos()
            .then(res => {
                let juegoNuevo = {
                    juego: juego,
                    jugador: jugador,
                    resultado: resultado
                };
                res.push(juegoNuevo);
                console.log(res);
                this.setJuegos(res);
            })
            .catch(err => console.log('c rompio'));
    }

}
