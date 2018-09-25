import { Injectable } from '@angular/core';
import { MiHttpService } from '../servicios/mi-http/mi-http.service';
import { CustomHttpService } from './custom-http.service';

@Injectable()
export class TraerFiltradoService {

    constructor(private httpService: CustomHttpService) {
    }

    public traerTodos(url: string) {
        return this.httpService
            .get(url);
    }

    public traerFiltrado(url: string, campo: string, filtro: string): Promise<any> {
        return this.httpService
            .get(url)
            .then(data => data.filter(obj => obj['campo'] == filtro))
            .catch(e => e);
    }
}
