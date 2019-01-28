import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class Helpers  {

    private authenticationChanged = new Subject<boolean>();

    constructor() {}

    public isAuthenticated(): boolean {
        const token = window.localStorage['token'];
        return (!(token === undefined || token === null ||
            token === 'null' || token === 'undefined' || token === ''));
    }

    public isAuthenticationChanged(): any {
        return this.authenticationChanged.asObservable();
    }

    public getToken(): any {
        return window.localStorage['token'];
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
            window.localStorage.removeItem('token');
        } else {
            window.localStorage['token'] = value.token;
        }
        this.authenticationChanged.next(this.isAuthenticated());
    }
}
