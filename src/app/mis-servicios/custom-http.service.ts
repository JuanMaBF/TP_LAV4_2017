import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomHttpService {

    constructor(private http: Http) {
    }

    public get(url: string): Promise<any> {
        return this.http
            .get(url)
            .toPromise()
            .then(resp => resp.json())               
            .catch(err => err);
    }

    public post(url: string, data: any): Promise<any> {
        return this.http
            .post(url, data)
            .toPromise()
            .then(resp => {console.log(resp)})
            .catch(err => err);
    }
}
