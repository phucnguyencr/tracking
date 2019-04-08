import { Injectable } from '@angular/core';

@Injectable()

export class AppConfig {

    private _config: { [key: string]: string };

    constructor() {
        const hostName = location.origin;
        this._config = {
            passwordDefault: 'c006a4baf80789e96dd6e7627b904e4c', // Vosa@123$$$
            authAPI: `${hostName}/tracking/authencation`,
            scheduleAPI: `${hostName}/tracking/schedule`,
            userAPI: `${hostName}/tracking/users`,
            contactAPI: `${hostName}/tracking/contact`,
            contactActivityAPI: `${hostName}/tracking/ContactActivity`
        };

    }

    get setting(): { [key: string]: string } {
        return this._config;
    }

    get(key: any) {
        return this._config[key];
    }
}
