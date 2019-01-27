import { Injectable } from '@angular/core';

@Injectable()

export class AppConfig {

    private _config: { [key: string]: string };

    constructor() {
        this._config = {
            authAPI: 'https://localhost:44351/tracking/authencation',
        };

    }

    get setting(): { [key: string]: string } {
        return this._config;
    }

    get(key: any) {
        return this._config[key];
    }
}
