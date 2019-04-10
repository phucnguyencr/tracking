import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from './baseService';
import { AppConfig } from '../config/config';
import { Helpers } from '../helpers/helpers';

@Injectable()

export class AboutService extends BaseService {

  private pathAPI = this.config.setting['aboutAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  getInfo (): Observable<any> {
    return this.http.get(this.pathAPI, super.header(true)).pipe(
    catchError(super.handleError));
  }

  updateInfo (formData: any): Observable<any> {
    return this.http.put(this.pathAPI,  formData, super.header(true)).pipe(
    catchError(super.handleError));
  }
}
