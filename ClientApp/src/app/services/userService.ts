import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import md5Hex from 'md5-hex';
import { BaseService } from './baseService';
import { AppConfig } from '../config/config';
import { Helpers } from '../helpers/helpers';

@Injectable()

export class UserService extends BaseService {

  private pathAPI = this.config.setting['userAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  getUsers (): Observable<any> {
    return this.http.get(this.pathAPI, super.header(true)).pipe(
    catchError(super.handleError));
  }

  createUsers (userData): Observable<any> {
    userData.password = md5Hex(userData.userName);
    return this.http.post(this.pathAPI, userData, super.header(true)).pipe(
    catchError(super.handleError));
  }

  updateUsers (userData, id: string): Observable<any> {
    return this.http.put(`${this.pathAPI}/${id}`, userData, super.header(true)).pipe(
    catchError(super.handleError));
  }

  resetUsers (userData): Observable<any> {
    const resetData = { password: userData.password };
    return this.http.patch(`${this.pathAPI}/${userData.id}`, resetData, super.header(true)).pipe(
    catchError(super.handleError));
  }
}
