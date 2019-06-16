import { Injectable, Inject } from '@angular/core';

@Injectable()

export class AppConfig {

    private _config: { [key: string]: string };

    constructor(@Inject('BASE_URL') baseUrl: string) {
        const hostname = `${baseUrl }tracking`;
        this._config = {
            passwordDefault: 'c006a4baf80789e96dd6e7627b904e4c', // Vosa@123$$$
            authAPI: `${hostname}/authencation`,
            scheduleAPI: `${hostname }/schedule`,
            userAPI: `${hostname }/users`,
            contactAPI: `${hostname }/contact`,
            contactActivityAPI: `${hostname }/ContactActivity`,
            aboutAPI: `${hostname }/about`,
            flowAPI: `${hostname }/flow`,
            shipAPI: `${hostname }/shipment`,
        };

    }

    get setting(): { [key: string]: string } {
        return this._config;
    }

    get(key: any) {
        return this._config[key];
    }
}
