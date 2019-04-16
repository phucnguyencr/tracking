import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './baseService';
import { AppConfig } from '../config/config';
import { Helpers } from '../helpers/helpers';
import { convertDateObjToString } from '../utils/convertDateToString';

@Injectable()

export class ShipmentService extends BaseService {

  private pathShipAPI = this.config.setting['shipAPI'];
  constructor(private http: HttpClient, private config: AppConfig, helper: Helpers) { super(helper); }

  getContact (fromDate, toDate, billNo, searchBy): Observable<any> {
    let byField = 'Status';
    switch(searchBy) {
      case 1:
        byField = 'BillOfLading';
        fromDate = billNo;
        break;
      case 2:
        byField = 'ActDepartureDate';
        break;
      case 3:
        byField = 'EstArrivalDate';
        break;
      default:
        break;
    }
    const searchInfo = { fieldName: byField, fieldFromValue: fromDate, fieldToValue: toDate };
    return this.http.post(`${this.pathShipAPI}/search`, searchInfo, super.header(true)).pipe(
    catchError(super.handleError));
  }
  
  createInfo (contactData): Observable<any> {
    contactData.actDepartureDate = convertDateObjToString(contactData.actDepartureDate);
    contactData.bookedDate = convertDateObjToString(contactData.bookedDate);
    contactData.estArrivalDate = convertDateObjToString(contactData.estArrivalDate);
    contactData.estDischargeDate = convertDateObjToString(contactData.estDischargeDate);
    return this.http.post(`${this.pathShipAPI}/create`, contactData, super.header(true)).pipe(
    catchError(super.handleError));
  }

  getInfo (): Observable<any> {
    return this.http.get(`${this.pathShipAPI}`, super.header(true)).pipe(
    catchError(super.handleError));
  }

  updateInfo (contactData, id): Observable<any> {
    contactData.actDepartureDate = convertDateObjToString(contactData.actDepartureDate);
    contactData.bookedDate = convertDateObjToString(contactData.bookedDate);
    contactData.estArrivalDate = convertDateObjToString(contactData.estArrivalDate);
    contactData.estDischargeDate = convertDateObjToString(contactData.estDischargeDate);
    return this.http.put(`${this.pathShipAPI}/update/${id}`, contactData, super.header(true)).pipe(
    catchError(super.handleError));
  }

  removeInfo (id): Observable<any> {
    return this.http.delete(`${this.pathShipAPI}/remove/${id}`, super.header(true)).pipe(
    catchError(super.handleError));
  }

  closeInfo (id): Observable<any> {
    return this.http.put(`${this.pathShipAPI}/close/${id}`, null, super.header(true)).pipe(
    catchError(super.handleError));
  }
}
