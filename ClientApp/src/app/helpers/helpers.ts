import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class Helpers  {

    private authenticationChanged = new Subject<boolean>();

    constructor() {}

    public isAuthenticated(): boolean {
        return (!(window.localStorage['token'] === undefined ||
            window.localStorage['token'] === null ||
            window.localStorage['token'] === 'null' ||
            window.localStorage['token'] === 'undefined' ||
            window.localStorage['token'] === ''));
    }

    public isAuthenticationChanged(): any {
        return this.authenticationChanged.asObservable();
    }

    public getToken(): any {
        if ( window.localStorage['token'] === undefined ||
            window.localStorage['token'] === null ||
            window.localStorage['token'] === 'null' ||
            window.localStorage['token'] === 'undefined' ||
            window.localStorage['token'] === '') {
            return '';
        }
        return window.localStorage['token'];
    }

    public setToken(data: any): void {
        this.setStorageToken(data);
    }

    public failToken(): void {
        this.setStorageToken(undefined);
    }

    public logout(): void {
        this.setStorageToken(undefined);
    }

    private setStorageToken(value: any): void {
        window.localStorage['token'] = value;
        this.authenticationChanged.next(this.isAuthenticated());
    }
}
