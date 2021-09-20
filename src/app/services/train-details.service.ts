import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JourneyModel } from '../models/journey.model';

@Injectable({
  providedIn: 'root'
})
export class TrainDetailsService {

  constructor(private httpClient: HttpClient) { }

  getTrainDetails(): Observable<any> {
    const url = `/trainDetails`;
    return this.httpClient.get<any>(url);
  }

  sendBookingDetails(journey: JourneyModel): Observable<any> {
    const url = '/mongo/create/reservation';
    return this.httpClient.post(url, {Journey: journey})
  }

  getCurrentBookings(): Observable<any> {
    const url = '/mongo/currentBookings';
    return this.httpClient.get(url);
  }

  createJourneys(): Observable<any> {
    const url = '/mongo/create/initialiseJourneys';
    return this.httpClient.post(url, {});
  }
}
