import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation } from '../browse-reservations/Reservation';
import { Observable, of, } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ReservationsService {

  constructor(private http: HttpClient) { }

  fetchReservations() : Observable<Reservation[]> {
    let backendUrl = 'http://localhost/roomReservationHW/backend/getReservations.php';  // URL to web api 
    return this.http.get<Reservation[]>(backendUrl)
        .pipe(catchError(this.handleError<Reservation[]>('fetchReservations', [])));
  }

  fetchReservationsId() : Observable<string[]> {
    let backendUrl = 'http://localhost/roomReservationHW/backend/getReservationsID.php';  // URL to web api 
    return this.http.get<string[]>(backendUrl)
        .pipe(catchError(this.handleError<string[]>('fetchReservationsId', [])));
  }

  fetchReservationsAndRoomIds(): Observable<any>{
    let backendUrl = 'http://localhost/roomReservationHW/backend/getReservationsAndRoomIds.php';  // URL to web api 
    return this.http.get<string[]>(backendUrl)
        .pipe(catchError(this.handleError<string[]>('fetchReservationsAndRoomIds', [])));
  }

  postNewReservation(roomID: number, checkin: Date, checkout: Date){
    let backendUrl = 'http://localhost/roomReservationHW/backend/postReservationDate.php'+
    "Check-in=" + checkin + 
    "?Check-out=" + checkout + 
    "?Room-id" + roomID;  // URL to web api 

    /*return this.http.post<string[]>(backendUrl)
        .pipe(catchError(this.handleError<string[]>('fetchReservationsId', [])));*/
  }

  addRequest(reservation: Reservation): Observable<any>{
    console.log(reservation);
    let backendUrl = 'http://localhost/roomReservationHW/backend/postReservationDate2.php';
    return this.http.post<any>(backendUrl, reservation);
  }

  deleteRequest(reservationId: number): Observable<any> {
    let backendUrl = 'http://localhost/roomReservationHW/backend/deleteReservation2.php';
    return this.http.post(backendUrl, reservationId);
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
   }
  };
}
