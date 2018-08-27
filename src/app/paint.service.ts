import { Injectable } from '@angular/core';
import {Paint} from './paint';
import { MessageService } from './message.service';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';





const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaintService {

  paints: Observable<Paint>;
  private paintsUrl = 'api/paints';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService

  ) { }

  
  
  getPaints(): Observable<Paint[]> {
    return this.http.get<Paint[]>(this.paintsUrl)
    .pipe(
      tap(heroes => this.log('fetched paints')),
      catchError(this.handleError('getPaints', []))
    );
  }
  searchPaints(term: string): Observable<Paint[]> {
    if (!term.trim()) {
      // if not search term, return empty paint array.
      return of([]);
    }

    this.paints.subscribe
   return this.http.get<Paint[]>(`${this.paintsUrl}/?name=${term}`)
    
    .pipe(
      tap(_ => this.log(`found paints matching "${term}"`)),
      catchError(this.handleError<Paint[]>('searchPaints', []))
    );
  }
  private log(message: string) {
    this.messageService.add(`PaintService: ${message}`);
  }
   /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  


}
