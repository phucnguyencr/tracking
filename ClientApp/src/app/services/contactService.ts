import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './baseService';
import { AppConfig } from '../config/config';
import { Helpers } from '../helpers/helpers';

@Injectable()

export class ContactService extends BaseService {

  private pathContactAPI = this.config.setting['contactAPI'];
  private pathContactActivityAPI = this.config.setting['contactActivityAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  getContact (fromDate, toDate, byStatus): Observable<any> {
    const searchInfo = { fieldName: byStatus ? "Status" : "CreatedDate", fieldFromValue: fromDate, fieldToValue: toDate };
    return this.http.post(`${this.pathContactActivityAPI}/search`, searchInfo, super.header(true)).pipe(
    catchError(super.handleError));
  }

  getInfo (): Observable<any> {
    return this.http.get(`${this.pathContactAPI}`, super.header(true)).pipe(
    catchError(super.handleError));
  }

  updateInfo (contactData): Observable<any> {
    return this.http.put(`${this.pathContactAPI}`, contactData, super.header(true)).pipe(
    catchError(super.handleError));
  }

  markRead (id): Observable<any> {
    return this.http.put(`${this.pathContactActivityAPI}/mark/${id}`, null, super.header(true)).pipe(
    catchError(super.handleError));
  }
}
