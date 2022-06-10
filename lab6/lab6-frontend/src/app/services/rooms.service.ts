import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../browse-rooms/Room';
import { Observable, of, } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FilterOption } from '../browse-rooms/FilterOptions';

@Injectable({
  providedIn: 'root'
})

export class RoomsService {

  constructor(private http: HttpClient) { }

  fetchPageRooms(capacity="%", type="%", hotel="%", price=">", priceValue=0, page=1) : Observable<Room[]> {
    let backendUrl = 'http://localhost/roomReservationHW/backend/viewPage2.php' + 
    '?Capacity=' + capacity +
    '&Type=' + type +
    '&Hotel=' + hotel +
    '&Price=' + price +
    '&Price-value=' + priceValue +
    '&page=' + page;  // URL to web api 
    return this.http.get<Room[]>(backendUrl)
        .pipe(catchError(this.handleError<Room[]>('fetchPageRooms', []))
    );
  }

  fetchRooms(capacity="%", type="%", hotel="%", price=">", priceValue=0, page=1) : Observable<number[]> {
    let backendUrl = 'http://localhost/roomReservationHW/backend/getRoomsId.php';
    return this.http.get<number[]>(backendUrl)
        .pipe(catchError(this.handleError<number[]>('fetchRooms', []))
    );
  }

  fetchFilterOptions() : Observable<FilterOption> {
    let backendUrl = 'http://localhost/roomReservationHW/backend/getFilterOptions.php';  // URL to web api 
    return this.http.get<FilterOption>(backendUrl)
        .pipe(catchError(this.handleError<FilterOption>('fetchFilterOptions', {"Capacity": [], "Type": [], "Hotel" : [], "Price" : []})));
  }

  fetchMaxPage(capacity="%", type="%", hotel="%", price=">", priceValue=0, page=1) {
    let backendUrl = 'http://localhost/roomReservationHW/backend/getMaxPage.php' +
    '?Capacity=' + capacity +
    '&Type=' + type +
    '&Hotel=' + hotel +
    '&Price=' + price +
    '&Price-value=' + priceValue +
    '&page=' + page;  // URL to web api   // URL to web api 
    return this.http.get<number>(backendUrl)
        .pipe(catchError(this.handleError<number>('fetchMaxPage', 0)));
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
  };
} 

}
