import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { CookieXSRFStrategy } from '@angular/http';

@Injectable()

export class Helpers  {

    private authenticationChanged = new Subject<boolean>();

    constructor() {}

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return (!(token === undefined || token === null ||
            token === 'null' || token === 'undefined' || token === ''));
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
        try {
            if(isRemoved) {
                Cookie.delete('id_token');
            } else {
                Cookie.set('id_token', value.token);
            }
            this.authenticationChanged.next(this.isAuthenticated());
        } catch (err) {
            console.log(err);
        }
    }
}