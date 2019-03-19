import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from './baseService';
import { AppConfig } from '../config/config';
import { Helpers } from '../helpers/helpers';

@Injectable()

export class ScheduleService extends BaseService {

  private pathAPI = this.config.setting['scheduleAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  uploadFile (formData: any): Observable<any> {
    return this.http.post(this.pathAPI, formData, super.header(false)).pipe(
    catchError(super.handleError));
  }

  downloadFile (): Observable<any> {
    const header = super.header(false);
    return this.http.get(this.pathAPI, { ...header, responseType: 'arraybuffer' });
  }
}
