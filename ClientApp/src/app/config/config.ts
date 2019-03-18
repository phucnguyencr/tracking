import { Injectable } from '@angular/core';

@Injectable()

export class AppConfig {

    private _config: { [key: string]: string };

    constructor() {
        this._config = {
            passwordDefault: 'c006a4baf80789e96dd6e7627b904e4c', // Vosa@123$$$
            authAPI: 'http://localhost:5000/tracking/authencation',
            scheduleAPI: 'http://localhost:5000/tracking/schedule',
        };

    }

    get setting(): { [key: string]: string } {
        return this._config;
    }

    get(key: any) {
        return this._config[key];
    }
}
