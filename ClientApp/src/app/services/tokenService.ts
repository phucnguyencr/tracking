import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import md5Hex from 'md5-hex';
import * as jwt_decode from 'jwt-decode';
import { AppConfig } from '../config/config';
import { BaseService } from './baseService';
import { Helpers } from '../helpers/helpers';

@Injectable()

export class TokenService extends BaseService {

  private pathAPI = this.config.setting['authAPI'];

  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  auth(data: any): any {
    const hashedPassword = md5Hex(data.password);
    const authValues = { UserName: data.userName, Password: hashedPassword };
    return this.getToken(authValues);
  }

  changePassword(data: any): any {
    const hashedOldPass = md5Hex(data.oldPassword);
    const hashedPassword = md5Hex(data.password);
    const userName = super.tokenInfo().username;
    const authValues = { UserName: userName, Password: hashedPassword, OldPassword: hashedOldPass };
    return this.http.put(this.pathAPI, authValues, super.header(true))
    .pipe(
        catchError(super.handleError)
    );
  }

  private getToken (body: any): Observable<any> {
    return this.http.post(this.pathAPI, body, super.header(true))
    .pipe(
        catchError(super.handleError)
    );
  }
}
