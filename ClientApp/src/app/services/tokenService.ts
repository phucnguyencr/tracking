import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import md5Hex from 'md5-hex';

import { AppConfig } from '../config/config';
import { BaseService } from './baseService';
import { Helpers } from '../admin/helpers/helpers';

@Injectable()

export class TokenService extends BaseService {

  private pathAPI = this.config.setting['authAPI'];

  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  auth(data: any): any {
    const hashedPassword = md5Hex(data.password);
    const authValues = { UserName: data.userName, Password: hashedPassword };
    const body = authValues;
    return this.getToken(body);
  }

  private getToken (body: any): Observable<any> {
    return this.http.post(this.pathAPI, body, super.header())
    .pipe(
        catchError(super.handleError)
    );
  }
}
