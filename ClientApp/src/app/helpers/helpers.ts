import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import * as jwt_decode from 'jwt-decode';

@Injectable()

export class Helpers  {

    private authenticationChanged = new Subject<boolean>();

    constructor() {}

    public getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
        if (decoded.exp === undefined) return null;
        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (token === undefined || token === null || token === 'null' || token === 'undefined' || token === '') {
            return false;
        }
        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return (date.valueOf() > new Date().valueOf());
    }

    public isAuthenticationChanged(): any {
        return this.authenticationChanged.asObservable();
    }

    public getToken(): any {
        return Cookie.get('id_token');
    }

    public setToken(data: any): void {
        this.setStorageToken(data, false);
    }

    public failToken(): void {
        this.setStorageToken(undefined);
    }

    public logout(): void {
        this.setStorageToken(undefined, true);
    }

    private setStorageToken(value: any, isRemoved: boolean = false): void {
        if(isRemoved) {
            Cookie.delete('id_token');
        } else {
            Cookie.set('id_token', value.token);
        }
        this.authenticationChanged.next(this.isAuthenticated());
    }
}