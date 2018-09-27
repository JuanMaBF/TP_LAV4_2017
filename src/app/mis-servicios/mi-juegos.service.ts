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
            .traerTodos('https://apitplav.000webhostapp.com/traerTodos')
    }

    public traerFiltradoPorJuego(juego: string): Promise<any> {
        return this.filtradoService
            .traerFiltrado('https://apitplav.000webhostapp.com/traerTodos', 'juego', juego);
    }

    public setJuegos(juegos: any): Promise<any> {
        return this.httpService
            .post('https://apitplav.000webhostapp.com/guardarJuego', juegos);
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
                this.setJuegos(res);
            })
            .catch(err => console.log('c rompio'));
    }

}
