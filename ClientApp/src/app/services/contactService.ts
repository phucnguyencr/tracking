import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import md5Hex from 'md5-hex';
import { BaseService } from './baseService';
import { AppConfig } from '../config/config';
import { Helpers } from '../helpers/helpers';
import { convertDateObjToString } from '../utils/convertDateToString';

@Injectable()

export class ContactService extends BaseService {

  private pathContactAPI = this.config.setting['contactAPI'];
  private pathContactActivityAPI = this.config.setting['contactActivityAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  getContact (searchCondition, byStatus): Observable<any> {
    const fromDate = byStatus ? "" : convertDateObjToString(searchCondition.fromDate);
    const toDate = byStatus ? "" : convertDateObjToString(searchCondition.toDate);
    const searchInfo = { fieldName: byStatus ? "Status" : "CreatedDate", fieldFromValue: fromDate, fieldToValue: toDate };
    return this.http.post(`${this.pathContactActivityAPI}/search`, searchInfo, super.header(true)).pipe(
    catchError(super.handleError));
  }

  createUsers (userData): Observable<any> {
    userData.password = md5Hex(userData.userName);
    return this.http.post(this.pathContactAPI, userData, super.header(true)).pipe(
    catchError(super.handleError));
  }

  updateUsers (userData, id: string): Observable<any> {
    return this.http.put(`${this.pathContactAPI}/${id}`, userData, super.header(true)).pipe(
    catchError(super.handleError));
  }

  resetUsers (userData): Observable<any> {
    const resetData = { password: userData.password };
    return this.http.patch(`${this.pathContactAPI}/${userData.id}`, resetData, super.header(true)).pipe(
    catchError(super.handleError));
  }
}
