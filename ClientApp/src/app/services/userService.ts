import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { BaseService } from './baseService';
import { AppConfig } from '../config/config';
import { Helpers } from '../admin/helpers/helpers';

@Injectable()

export class UserService extends BaseService {

  private pathAPI = this.config.setting['PathAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  getUsers (): Observable<any> {
    return this.http.get(this.pathAPI + 'user', super.header()).pipe(
    catchError(super.handleError));
  }
}
