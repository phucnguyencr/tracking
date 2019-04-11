import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './baseService';
import { AppConfig } from '../config/config';
import { Helpers } from '../helpers/helpers';

@Injectable()

export class FlowService extends BaseService {

  private pathAPI = this.config.setting['flowAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  getFlows (): Observable<any> {
    return this.http.get(this.pathAPI, super.header(true)).pipe(
    catchError(super.handleError));
  }

  createFlow (flowData): Observable<any> {
    return this.http.post(this.pathAPI, flowData, super.header(true)).pipe(
    catchError(super.handleError));
  }

  updateFlow (flowData, id: string): Observable<any> {
    return this.http.put(`${this.pathAPI}/${id}`, flowData, super.header(true)).pipe(
    catchError(super.handleError));
  }
}
