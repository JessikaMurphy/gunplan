import { Injectable } from '@angular/core';
import {Paint} from './paint';
import { MessageService } from './message.service';
import { Http, Response,RequestOptions, Request, Headers, RequestMethod } from "@angular/http";

import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

import {forkJoin} from 'rxjs';

/* const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; */
let requestOptions = new RequestOptions({ headers:null, withCredentials: 
  true });

@Injectable({
  providedIn: 'root'
})
export class PaintService {

  
  //private paintsUrl = 'api/paints';
  private paintsUrl = 'http://localhost:8083/rest/paint/';
  observablePaints: Observable<Paint[]>;
  private databaseUrl = 'http://localhost:5000/api/user/me/mypaints';
  constructor(
    private http: HttpClient,
    private messageService: MessageService

  ) { }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems(): Observable<Paint[]> {
    return this.http.get<Paint[]>(this.paintsUrl)
    .pipe(
      tap(paints => this.log('fetched paints')),
      catchError(this.handleError('getPaints', []))
    );

  }
  addPaint(formattedPaintString: string){
    return this.http.put<any>('http://localhost:5000/api/user/me/add',
    formattedPaintString,)
    .pipe(map(
      response=> {
        if(response && (response.success==true))
          console.log(response.message);
          
      }))
  }
  removePaint(formattedPaintString: string){
    let req = new HttpRequest('DELETE', 'http://localhost:5000/api/user/me/remove');
    let newReq = req.clone({body: formattedPaintString});
    console.log(formattedPaintString);
    return this.http.request(newReq);
  }
  getPaints(): Observable<Paint[]> {
    return this.http.get<any>(this.databaseUrl)
    .pipe(map(
      response=> {
        if(response && (response.success==true))
          
          return response.paintList as Paint[];
          
      }))
  }
  searchPaints(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty paint array.
      return this.restItemsServiceGetRestItems();
    }
    
   return this.http.get<Paint[]>(`${this.paintsUrl}/search/${term}`)
   
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
